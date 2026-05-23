import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, CheckCircle2, Clock, Map as MapIcon, XCircle, Trash2, ArrowUpCircle } from 'lucide-react';

// Fix Leaflet's default icon issue with React
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

// Custom icons based on status
const createCustomIcon = (status: string) => {
  let color = '#f59e0b'; // amber (PENDING)
  const upStatus = status.toUpperCase();
  if (upStatus === 'RESOLVED') color = '#10b981'; // emerald
  if (upStatus === 'WAITING_APPROVAL') color = '#a855f7'; // purple
  if (upStatus === 'VALID') color = '#3b82f6'; // blue
  
  const markerHtmlStyles = `
    background-color: ${color};
    width: 2.5rem;
    height: 2.5rem;
    display: block;
    left: -1.25rem;
    top: -1.25rem;
    position: relative;
    border-radius: 2.5rem 2.5rem 0;
    transform: rotate(45deg);
    border: 2px solid #FFFFFF;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  `;

  return L.divIcon({
    className: "custom-pin",
    iconAnchor: [0, 24],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}">
             <span style="display: block; width: 1rem; height: 1rem; background-color: white; border-radius: 50%; transform: rotate(-45deg); position: absolute; left: 0.65rem; top: 0.65rem;"></span>
           </span>`
  });
};

interface Report {
  id: string;
  category_id: number;
  description: string;
  location_detail: string;
  latitude: number;
  longitude: number;
  status: string;
  image_urls: string[];
  vote_count: number;
  comment_count: number;
  created_at: string;
}

interface User {
  id: string;
  role: string;
  name: string;
}

interface ReportMapProps {
  apiUrl: string;
}

const ReportMap: React.FC<ReportMapProps> = ({ apiUrl }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    // Load user
    const userRaw = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    if (userRaw && token) {
      setUser(JSON.parse(userRaw));
    }

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/categories`);
        const data = await res.json();
        setCategories(data.data || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    const fetchReports = async () => {
      try {
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        
        let endpoint = `${apiUrl}/api/public-reports?sort=recent`;
        
        // If user is admin/super_admin, fetch all reports
        if (userRaw) {
          try {
             const userObj = JSON.parse(userRaw);
             if (userObj.role === 'admin' || userObj.role === 'ADMIN' || userObj.role === 'super_admin' || userObj.role === 'SUPER_ADMIN') {
               endpoint = `${apiUrl}/api/admin/reports`;
             }
          } catch(e) {
            console.error(e);
          }
        }

        const res = await fetch(endpoint, { headers });
        const data = await res.json();
        setReports(data.data || []);
      } catch (err) {
        console.error("Failed to load reports", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchReports();
  }, [apiUrl]);

  const handleVote = async (e: React.MouseEvent, reportId: string) => {
    e.stopPropagation();
    const token = localStorage.getItem('access_token');
    if (!token) return alert('Silakan login terlebih dahulu untuk memberikan dukungan.');
    
    try {
      const res = await fetch(`${apiUrl}/api/reports/${reportId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ vote_type: 1 })
      });
      if (res.ok) {
        // Refresh local data optimistically
        setReports(prev => prev.map(r => {
          if (r.id === reportId) {
            return { ...r, vote_count: r.vote_count + 1 };
          }
          return r;
        }));
      } else {
        const err = await res.json();
        alert(err.error || 'Gagal memberikan dukungan');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan');
    }
  };

  const handleDelete = async (reportId: string) => {
    if (!confirm('Anda yakin ingin menghapus laporan ini?')) return;
    const token = localStorage.getItem('access_token');
    
    try {
      const res = await fetch(`${apiUrl}/api/reports/${reportId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setReports(prev => prev.filter(r => r.id !== reportId));
        alert('Laporan berhasil dihapus');
      } else {
        const err = await res.json();
        alert(err.error || 'Gagal menghapus laporan');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan');
    }
  };

  const handleResolve = async (reportId: string) => {
    if (!confirm('Tandai laporan ini sebagai Selesai?')) return;
    const token = localStorage.getItem('access_token');
    
    try {
      const res = await fetch(`${apiUrl}/api/reports/${reportId}/resolve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'WAITING_APPROVAL' } : r));
        alert('Laporan ditandai menunggu persetujuan.');
      } else {
        const err = await res.json();
        alert(err.error || 'Gagal menyelesaikan laporan');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan');
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-zen-surface dark:bg-zen-surface-dark rounded-3xl border border-zen-border dark:border-zen-border-dark">
        <div className="w-10 h-10 border-4 border-zen-border dark:border-zen-border-dark border-t-brand rounded-full animate-spin"></div>
      </div>
    );
  }

  // Determine default center
  const center: [number, number] = reports.length > 0 && reports[0].latitude && reports[0].longitude 
    ? [reports[0].latitude, reports[0].longitude] 
    : [-6.2000, 106.8166];

  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] rounded-3xl overflow-hidden border border-zen-border dark:border-zen-border-dark shadow-zen animate-[slideUp_0.6s_cubic-bezier(0.22,1,0.36,1)_both]">
      <MapContainer center={center} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url={isDark 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' 
            : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        
        {reports.map((report) => {
          if (!report.latitude || !report.longitude) return null;
          
          const catName = categories.find(c => c.id === report.category_id)?.name || 'Umum';
          const isAdmin = user?.role === 'admin' || user?.role === 'ADMIN' || user?.role === 'super_admin' || user?.role === 'SUPER_ADMIN';
          
          const statusColors: Record<string, string> = {
            'PENDING': 'text-amber-500 bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
            'VALID': 'text-blue-500 bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
            'WAITING_APPROVAL': 'text-purple-500 bg-purple-500/10 border-purple-200 dark:border-purple-500/20',
            'RESOLVED': 'text-emerald-500 bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20'
          };
          
          const statusClass = statusColors[report.status.toUpperCase()] || 'text-gray-500 bg-gray-500/10';
          let statusText = report.status;
          if (report.status === 'WAITING_APPROVAL') statusText = 'MENUNGGU';
          if (report.status === 'PENDING') statusText = 'DIPROSES';

          return (
            <Marker 
              key={report.id} 
              position={[report.latitude, report.longitude]}
              icon={createCustomIcon(report.status)}
            >
              <Popup className="zen-popup min-w-[260px] sm:min-w-[280px] max-w-[300px]">
                <div className="flex flex-col gap-3 font-sans text-zen-text dark:text-zen-text-dark w-[260px] sm:w-[280px]">
                  {report.image_urls && report.image_urls.length > 0 && (
                    <div className="w-full h-32 rounded-xl overflow-hidden relative">
                      <img src={`${apiUrl}${report.image_urls[0]}`} alt="Laporan" className="w-full h-full object-cover" />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold px-2 py-1 rounded-md bg-zen-surface dark:bg-zen-surface-dark border border-zen-border dark:border-zen-border-dark truncate max-w-[120px]">
                      {catName}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase border whitespace-nowrap ${statusClass}`}>
                      {statusText}
                    </span>
                  </div>
                  
                  <h4 className="m-0 text-sm font-extrabold leading-tight line-clamp-3">{report.description}</h4>
                  
                  <div className="flex flex-col gap-1 text-xs text-zen-muted dark:text-zen-muted-dark font-medium">
                    <div className="flex items-start gap-1.5">
                      <MapPin size={14} className="mt-0.5 shrink-0" />
                      <span className="line-clamp-2 leading-snug">{report.location_detail}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock size={14} className="shrink-0" />
                      <span>{new Date(report.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-2 pt-3 border-t border-zen-border dark:border-zen-border-dark">
                    <button 
                      onClick={(e) => handleVote(e, report.id)}
                      className="flex items-center gap-1.5 bg-transparent border-none text-zen-text dark:text-zen-text-dark cursor-pointer font-bold text-xs hover:text-brand"
                    >
                      <ArrowUpCircle size={16} /> {report.vote_count}
                    </button>
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      💬 {report.comment_count}
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="flex gap-2 mt-2 pt-2 border-t border-zen-border dark:border-zen-border-dark">
                      <button 
                        onClick={() => handleResolve(report.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-200 dark:border-emerald-500/20 transition-colors cursor-pointer"
                      >
                        <CheckCircle2 size={14} /> Resolve
                      </button>
                      {(user?.role === 'super_admin' || user?.role === 'SUPER_ADMIN') && (
                        <button 
                          onClick={() => handleDelete(report.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 rounded-lg text-xs font-bold border border-red-200 dark:border-red-500/20 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      )}
                    </div>
                  )}
                  
                  <a 
                    href={`/dashboard?open=${report.id}`}
                    onClick={(e) => {
                      if (isAdmin) {
                        e.preventDefault();
                        if (user?.role === 'super_admin' || user?.role === 'SUPER_ADMIN') {
                          window.location.href = `/superadmin/reports?open=${report.id}`;
                        } else {
                          window.location.href = `/admin/reports?open=${report.id}`;
                        }
                      }
                    }}
                    className="mt-1 block text-center py-2 bg-zen-surface dark:bg-zen-surface-dark hover:bg-brand hover:text-white dark:hover:bg-brand dark:hover:text-white border border-zen-border dark:border-zen-border-dark rounded-xl text-xs font-bold transition-colors no-underline text-zen-text dark:text-zen-text-dark"
                  >
                    Buka Detail Lengkap
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Global styles for leaflet popup overrides */}
      <style>{`
        .leaflet-popup-content-wrapper {
          background: var(--color-zen-bg) !important;
          color: var(--color-zen-text) !important;
          border-radius: 1.5rem !important;
          border: 1px solid var(--color-zen-border) !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
          padding: 0 !important;
        }
        .dark .leaflet-popup-content-wrapper {
          background: #111111 !important;
          color: #FAFAFA !important;
          border-color: #2D2D2D !important;
        }
        .leaflet-popup-content {
          margin: 14px !important;
        }
        .leaflet-popup-tip-container {
          display: none !important;
        }
        .leaflet-container {
          font-family: inherit !important;
          z-index: 10 !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
        }
        .leaflet-control-zoom a {
          background: var(--color-zen-surface) !important;
          color: var(--color-zen-text) !important;
          border-color: var(--color-zen-border) !important;
        }
        .dark .leaflet-control-zoom a {
          background: #1A1A1A !important;
          color: #FAFAFA !important;
          border-color: #2D2D2D !important;
        }
        .leaflet-control-zoom a:hover {
          background: var(--color-brand) !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default ReportMap;
