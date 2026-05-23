import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Clock, ArrowUpCircle, CheckCircle2, Trash2 } from 'lucide-react';

// Fix Leaflet's default icon issue with React
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

// ── Indonesia bounds ──────────────────────────────────────────────────────────
const INDONESIA_BOUNDS = L.latLngBounds(
  L.latLng(-11.5, 94.0),   // SW: south of Christmas Island & NW of Sabang
  L.latLng(7.0, 142.0)     // NE: northern Sulawesi & east of Papua
);
const INDONESIA_CENTER: [number, number] = [-2.5, 118.0]; // Tengah Indonesia
const INDONESIA_ZOOM = 5;

// Custom icons based on status
const createCustomIcon = (status: string) => {
  let color = '#f59e0b'; // amber (PENDING)
  const upStatus = status.toUpperCase();
  if (upStatus === 'RESOLVED') color = '#10b981';
  if (upStatus === 'WAITING_APPROVAL') color = '#a855f7';
  if (upStatus === 'VALID') color = '#3b82f6';

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
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  `;

  return L.divIcon({
    className: 'custom-pin',
    iconAnchor: [0, 24],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}">
             <span style="display:block;width:1rem;height:1rem;background:white;border-radius:50%;transform:rotate(-45deg);position:absolute;left:.65rem;top:.65rem;"></span>
           </span>`,
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

// ── Component: auto-fit bounds to visible markers ─────────────────────────────
function MapBoundsFitter({ reports }: { reports: Report[] }) {
  const map = useMap();
  const fitted = useRef(false);

  useEffect(() => {
    if (fitted.current || reports.length === 0) return;
    const validPoints = reports.filter(r => r.latitude && r.longitude);
    if (validPoints.length === 0) return;

    if (validPoints.length === 1) {
      map.setView([validPoints[0].latitude, validPoints[0].longitude], 13);
    } else {
      const bounds = L.latLngBounds(validPoints.map(r => [r.latitude, r.longitude]));
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
    }
    fitted.current = true;
  }, [reports, map]);

  return null;
}

const ReportMap: React.FC<ReportMapProps> = ({ apiUrl }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const userRaw = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    if (userRaw && token) {
      try { setUser(JSON.parse(userRaw)); } catch (_) {}
    }

    let cancelled = false;

    // Timeout: jika >12 detik belum selesai, tampilkan error
    const timeoutId = setTimeout(() => {
      if (!cancelled) {
        setLoading(false);
        setError('Waktu habis. Periksa koneksi internet Anda dan muat ulang halaman.');
      }
    }, 12000);

    const fetchAll = async () => {
      try {
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        let endpoint = `${apiUrl}/api/public-reports?sort=recent`;
        if (userRaw) {
          try {
            const userObj = JSON.parse(userRaw);
            const role = (userObj.role || '').toLowerCase();
            if (role === 'admin' || role === 'super_admin') {
              endpoint = `${apiUrl}/api/admin/reports`;
            }
          } catch (_) {}
        }

        const [catRes, reportRes] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(endpoint, { headers }),
        ]);

        if (cancelled) return;

        const [catData, reportData] = await Promise.all([
          catRes.json(),
          reportRes.json(),
        ]);

        setCategories(catData.data || []);
        setReports(reportData.data || []);
      } catch (err) {
        if (!cancelled) {
          setError('Gagal memuat data laporan. Periksa koneksi internet Anda.');
        }
      } finally {
        if (!cancelled) {
          clearTimeout(timeoutId);
          setLoading(false);
        }
      }
    };

    fetchAll();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
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
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ vote_type: 1 }),
      });
      if (res.ok) {
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, vote_count: r.vote_count + 1 } : r));
      } else {
        const err = await res.json();
        alert(err.error || 'Gagal memberikan dukungan');
      }
    } catch (_) {
      alert('Terjadi kesalahan jaringan');
    }
  };

  const handleDelete = async (reportId: string) => {
    if (!confirm('Anda yakin ingin menghapus laporan ini?')) return;
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch(`${apiUrl}/api/reports/${reportId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        setReports(prev => prev.filter(r => r.id !== reportId));
      } else {
        const err = await res.json();
        alert(err.error || 'Gagal menghapus laporan');
      }
    } catch (_) {
      alert('Terjadi kesalahan jaringan');
    }
  };

  const handleResolve = async (reportId: string) => {
    if (!confirm('Tandai laporan ini sebagai Selesai?')) return;
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch(`${apiUrl}/api/reports/${reportId}/resolve`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'WAITING_APPROVAL' } : r));
      } else {
        const err = await res.json();
        alert(err.error || 'Gagal menyelesaikan laporan');
      }
    } catch (_) {
      alert('Terjadi kesalahan jaringan');
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center gap-4 bg-stone-50 dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
        {/* Shimmer map skeleton */}
        <div className="relative w-full h-full min-h-[500px] rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200 dark:from-stone-800 dark:via-stone-900 dark:to-stone-800 animate-pulse" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-stone-800 shadow-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-blue-500 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            </div>
            <p className="text-sm font-bold text-stone-500 dark:text-stone-400">Memuat peta laporan…</p>
            <p className="text-xs text-stone-400 dark:text-stone-500">Menghubungkan ke server tile…</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center gap-4 bg-red-50 dark:bg-red-500/5 rounded-3xl border border-red-200 dark:border-red-500/20">
        <div className="p-4 bg-red-100 dark:bg-red-500/10 rounded-2xl">
          <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-red-600 dark:text-red-400">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors"
        >
          Muat Ulang
        </button>
      </div>
    );
  }

  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-lg">
      <MapContainer
        center={INDONESIA_CENTER}
        zoom={INDONESIA_ZOOM}
        minZoom={5}
        maxZoom={18}
        maxBounds={INDONESIA_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ width: '100%', height: '100%' }}
        preferCanvas={true}
        keepBuffer={4}
      >
        <TileLayer
          url={
            isDark
              ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
              : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          }
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
          crossOrigin={true}
        />

        {/* Auto-fit bounds to markers */}
        <MapBoundsFitter reports={reports} />

        {reports.map((report) => {
          if (!report.latitude || !report.longitude) return null;

          const catName = categories.find(c => c.id === report.category_id)?.name || 'Umum';
          const isAdmin = user
            ? ['admin', 'super_admin'].includes((user.role || '').toLowerCase())
            : false;

          const statusColors: Record<string, string> = {
            PENDING: 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20',
            VALID: 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/20',
            WAITING_APPROVAL: 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-500/10 dark:border-purple-500/20',
            RESOLVED: 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20',
          };
          const statusClass = statusColors[report.status.toUpperCase()] || 'text-stone-500 bg-stone-50';

          const statusLabels: Record<string, string> = {
            PENDING: 'DIPROSES',
            VALID: 'VALID',
            WAITING_APPROVAL: 'MENUNGGU',
            RESOLVED: 'SELESAI',
          };
          const statusText = statusLabels[report.status.toUpperCase()] || report.status;

          return (
            <Marker
              key={report.id}
              position={[report.latitude, report.longitude]}
              icon={createCustomIcon(report.status)}
            >
              <Popup className="zen-popup min-w-[260px] sm:min-w-[280px] max-w-[300px]">
                <div className="flex flex-col gap-3 font-sans text-stone-800 dark:text-stone-100 w-[260px] sm:w-[280px]">
                  {report.image_urls && report.image_urls.length > 0 && (
                    <div className="w-full h-32 rounded-xl overflow-hidden">
                      <img
                        src={`${apiUrl}${report.image_urls[0]}`}
                        alt="Laporan"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold px-2 py-1 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 truncate max-w-[120px]">
                      {catName}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase border whitespace-nowrap ${statusClass}`}>
                      {statusText}
                    </span>
                  </div>

                  <h4 className="m-0 text-sm font-extrabold leading-tight line-clamp-3">
                    {report.description}
                  </h4>

                  <div className="flex flex-col gap-1 text-xs text-stone-500 dark:text-stone-400 font-medium">
                    <div className="flex items-start gap-1.5">
                      <MapPin size={13} className="mt-0.5 shrink-0" />
                      <span className="line-clamp-2 leading-snug">{report.location_detail}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock size={13} className="shrink-0" />
                      <span>
                        {new Date(report.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                    <button
                      onClick={(e) => handleVote(e, report.id)}
                      className="flex items-center gap-1.5 bg-transparent border-none text-stone-600 dark:text-stone-300 cursor-pointer font-bold text-xs hover:text-blue-500 transition-colors"
                    >
                      <ArrowUpCircle size={15} /> {report.vote_count}
                    </button>
                    <div className="flex items-center gap-1.5 font-bold text-xs text-stone-500">
                      💬 {report.comment_count}
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="flex gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                      <button
                        onClick={() => handleResolve(report.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-200 dark:border-emerald-500/20 transition-colors cursor-pointer"
                      >
                        <CheckCircle2 size={13} /> Selesai
                      </button>
                      {['super_admin'].includes((user?.role || '').toLowerCase()) && (
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 rounded-lg text-xs font-bold border border-red-200 dark:border-red-500/20 transition-colors cursor-pointer"
                        >
                          <Trash2 size={13} /> Hapus
                        </button>
                      )}
                    </div>
                  )}

                  <a
                    href={`/dashboard?open=${report.id}`}
                    onClick={(e) => {
                      if (isAdmin) {
                        e.preventDefault();
                        const role = (user?.role || '').toLowerCase();
                        window.location.href =
                          role === 'super_admin'
                            ? `/superadmin/reports?open=${report.id}`
                            : `/admin/reports?open=${report.id}`;
                      }
                    }}
                    className="mt-1 block text-center py-2 bg-stone-100 dark:bg-stone-800 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-bold transition-colors no-underline text-stone-700 dark:text-stone-300"
                  >
                    Buka Detail Lengkap →
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Laporan count badge */}
      {reports.length > 0 && (
        <div className="absolute top-4 right-4 z-[1000] px-3 py-1.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl shadow-md text-xs font-bold text-stone-700 dark:text-stone-300">
          {reports.length} Laporan
        </div>
      )}

      {/* Popup Leaflet overrides */}
      <style>{`
        .leaflet-popup-content-wrapper {
          background: #fff !important;
          color: #1c1917 !important;
          border-radius: 1.25rem !important;
          border: 1px solid #e7e5e4 !important;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.12), 0 8px 10px -6px rgba(0,0,0,0.08) !important;
          padding: 0 !important;
        }
        .dark .leaflet-popup-content-wrapper {
          background: #111 !important;
          color: #fafaf9 !important;
          border-color: #292524 !important;
        }
        .leaflet-popup-content { margin: 14px !important; }
        .leaflet-popup-tip-container { display: none !important; }
        .leaflet-container { font-family: inherit !important; }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1) !important;
          border-radius: 0.75rem !important;
          overflow: hidden;
        }
        .leaflet-control-zoom a {
          background: #fff !important;
          color: #292524 !important;
          border-color: #e7e5e4 !important;
          font-weight: 800 !important;
        }
        .dark .leaflet-control-zoom a {
          background: #1a1a1a !important;
          color: #fafaf9 !important;
          border-color: #292524 !important;
        }
        .leaflet-control-zoom a:hover {
          background: #3b82f6 !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default ReportMap;
