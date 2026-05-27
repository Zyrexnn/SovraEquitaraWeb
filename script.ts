
    import { showToast } from '../../lib/toast';
    const root = document.getElementById("admin-root");
    const API_URL = root?.dataset.apiUrl || "http://localhost:3000";
    let reportsData = [];
    let categoriesData = [];
    let currentReportId = null;

    function updateTime() {
      const el = document.getElementById("live-time");
      if (el) el.innerText = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB";
    }

    async function loadData() {
      const token = localStorage.getItem("access_token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!token) return window.location.href = "/admin/login";
      if (user.role === "admin" || user.role === "ADMIN") return window.location.href = "/admin/dashboard";
      if (user.role !== "super_admin" && user.role !== "SUPER_ADMIN") return window.location.href = "/login";
      
      // Sidebar role-checking is now handled by the Sidebar component

      try {
        console.log("Fetching data from:", API_URL);
        console.log("Token present:", !!token);
        
        const [catRes, reportRes] = await Promise.all([
          fetch(`${API_URL}/api/categories`),
          fetch(`${API_URL}/api/admin/reports`, { 
            headers: { "Authorization": `Bearer ${token}` } 
          })
        ]);

        if (!catRes.ok) throw new Error("Gagal mengambil kategori");
        if (!reportRes.ok) {
          const errData = await reportRes.json();
          if (reportRes.status === 401) {
            console.warn("Session expired or invalid token:", errData.debug_error);
            showToast({ message: "Unauthorized: " + (errData.debug_error || "Token tidak valid"), type: 'error' });
            // localStorage.clear();
            // window.location.href = "/admin/login";
            return;
          }
          throw new Error(errData.error || "Gagal mengambil data laporan (Unauthorized/Forbidden)");
        }

        const catData = await catRes.json();
        const reportData = await reportRes.json();
        
        categoriesData = catData.data || [];
        reportsData = reportData.data || [];
        
        console.log("Data loaded successfully:", reportsData.length, "reports found.");
        
        renderCategories();
        renderStats();
        renderReports(reportsData);
        renderCharts();
      } catch (err) {
        console.error("Gagal memuat data admin:", err);
        showToast({ message: "Gagal memuat data: " + err.message, type: 'error' });
      }
    }

    let categoryChart = null;
    let trendChart = null;
    let locationChart = null;

    function renderCharts() {
      const isDark = document.documentElement.classList.contains('dark');
      const textColor = isDark ? '#a8a29e' : '#78716c';
      const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

      // 1. Category Chart
      const catCtx = document.getElementById('categoryChart') as HTMLCanvasElement;
      if (catCtx) {
        const categoryCounts = {};
        reportsData.forEach(r => {
          const catName = categoriesData.find(c => c.id === r.category_id)?.name || "Lainnya";
          categoryCounts[catName] = (categoryCounts[catName] || 0) + 1;
        });

        if (categoryChart) categoryChart.destroy();
        categoryChart = new Chart(catCtx, {
          type: 'doughnut',
          data: {
            labels: Object.keys(categoryCounts),
            datasets: [{
              data: Object.values(categoryCounts),
              backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
              hoverOffset: 20,
              borderRadius: 10,
              borderWidth: 0
            }]
          },
          options: {
            cutout: '75%',
            plugins: {
              legend: { position: 'bottom', labels: { color: textColor, usePointStyle: true, padding: 25, font: { family: 'Plus Jakarta Sans', weight: 'bold', size: 11 } } }
            }
          }
        });
      }

      // 2. Trend Chart (Last 7 Days)
      const trendCtx = document.getElementById('trendChart') as HTMLCanvasElement;
      if (trendCtx) {
        const last7Days = [...Array(7)].map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d.toISOString().split('T')[0];
        }).reverse();

        const dailyCounts = last7Days.map(date => 
          reportsData.filter(r => r.created_at.startsWith(date)).length
        );

        const ctx = trendCtx.getContext('2d');
        const gradient = ctx?.createLinearGradient(0, 0, 0, 400);
        if(gradient) {
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
        }

        if (trendChart) trendChart.destroy();
        trendChart = new Chart(trendCtx, {
          type: 'line',
          data: {
            labels: last7Days.map(d => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })),
            datasets: [{
              label: 'Laporan',
              data: dailyCounts,
              borderColor: '#6366F1',
              backgroundColor: gradient || 'rgba(99, 102, 241, 0.1)',
              fill: true,
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: '#fff',
              pointBorderColor: '#6366F1',
              pointBorderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: textColor, stepSize: 1, font: { weight: 'bold' } } },
              x: { grid: { display: false }, ticks: { color: textColor, font: { weight: 'bold' } } }
            },
            plugins: { legend: { display: false } }
          }
        });
      }

      // 3. Location Chart (Top 5)
      const locCtx = document.getElementById('locationChart') as HTMLCanvasElement;
      if (locCtx) {
        const locCounts = {};
        reportsData.forEach(r => {
          const loc = r.location_detail.split(',')[0].trim();
          locCounts[loc] = (locCounts[loc] || 0) + 1;
        });

        const topLocs = Object.entries(locCounts)
          .sort((a: any, b: any) => b[1] - a[1])
          .slice(0, 5);

        const ctx = locCtx.getContext('2d');
        const gradient = ctx?.createLinearGradient(0, 0, 300, 0);
        if(gradient) {
          gradient.addColorStop(0, '#8B5CF6');
          gradient.addColorStop(1, '#C4B5FD');
        }

        if (locationChart) locationChart.destroy();
        locationChart = new Chart(locCtx, {
          type: 'bar',
          data: {
            labels: topLocs.map(x => x[0]),
            datasets: [{
              data: topLocs.map(x => x[1]),
              backgroundColor: gradient || '#8B5CF6',
              borderRadius: 6,
              barThickness: 24
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: textColor, stepSize: 1, font: { weight: 'bold' } } },
              y: { grid: { display: false }, ticks: { color: textColor, font: { weight: 'bold' } } }
            },
            plugins: { legend: { display: false } }
          }
        });
      }
    }

    /* Leaderboard moved to dedicated page */

    function renderCategories() {
      const f = document.getElementById("category-filter");
      if (f) f.innerHTML = '<option value="">Semua Kategori</option>' + categoriesData.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    }

    function renderStats() {
      const set = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };
      set("stat-total", reportsData.length);
      set("stat-pending", reportsData.filter(r => r.status === "PENDING").length);
      set("stat-verified", reportsData.filter(r => r.status === "VALID").length);
      set("stat-resolved", reportsData.filter(r => r.status === "RESOLVED").length);
    }

    function renderReports(reports) {
      const tbody = document.getElementById("reports-tbody");
      if (!tbody) return;
      tbody.innerHTML = reports.map(r => {
        const reporterName = r.profile?.full_name || 'Warga';
        const reporterAvatarUrl = r.profile?.avatar_url;
        const reporterAvatar = reporterAvatarUrl 
          ? `<img src="${reporterAvatarUrl.startsWith('http') ? reporterAvatarUrl : API_URL + reporterAvatarUrl}" class="w-full h-full object-cover" />` 
          : `<div class="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold text-[8px]">${reporterName[0].toUpperCase()}</div>`;
        return `
        <tr onclick="window.openReportModal('${r.id}')" class="hover:bg-stone-50 dark:hover:bg-white/5 cursor-pointer transition-colors duration-200 group">
          <td class="px-6 lg:px-10 py-5">
            <div class="w-12 h-12 lg:w-14 lg:h-14 rounded-xl overflow-hidden bg-zen-surface dark:bg-zen-surface-dark border border-stone-200 dark:border-white/10 group-hover:scale-105 transition-transform duration-500 shrink-0">
              ${(r.image_urls && r.image_urls.length > 0) ? `<img src="${API_URL}${r.image_urls[0]}" class="w-full h-full object-cover"/>` : "<div class='w-full h-full flex items-center justify-center text-xl grayscale'>🖼️</div>"}
            </div>
          </td>
          <td class="px-4 lg:px-6 py-5 max-w-[200px] sm:max-w-[300px] lg:max-w-xs">
            <div class="flex items-center gap-2 mb-1.5">
              <div class="w-5 h-5 rounded-full overflow-hidden border border-zen-border dark:border-zen-border-dark shrink-0">
                ${reporterAvatar}
              </div>
              <span class="text-[11px] font-bold text-zen-text dark:text-zen-text-dark">${reporterName}</span>
            </div>
            <div class="font-bold text-zen-text dark:text-zen-text-dark truncate">${r.description}</div>
            <div class="text-[11px] font-bold text-stone-400 mt-1 uppercase tracking-wider truncate">${r.location_detail}</div>
          </td>
          <td class="px-4 lg:px-6 py-5">
            <span class="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
              ${r.status === 'PENDING' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-500/20' : ''}
              ${r.status === 'VALID' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 border-green-200 dark:border-green-500/20' : ''}
              ${r.status === 'RESOLVED' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-500/20' : ''}
            ">
              ${r.status}
            </span>
          </td>
          <td class="px-4 lg:px-6 py-5 text-right pr-6 lg:pr-10 font-black text-stone-400 text-xs whitespace-nowrap">
            ${new Date(r.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })}
          </td>
        </tr>
      `;}).join("");
    }

    window.closeModal = () => {
      const modal = document.getElementById("report-modal");
      const content = document.getElementById("modal-content");
      if (modal && content) {
        content.classList.add("scale-95", "opacity-0");
        setTimeout(() => modal.classList.add("hidden"), 300);
      }
    };

    window.openReportModal = (id) => {
      currentReportId = id;
      const r = reportsData.find(x => x.id === id);
      if(!r) return;
      
      const modal = document.getElementById("report-modal");
      const content = document.getElementById("modal-content");
      if (modal && content) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        setTimeout(() => content.classList.remove("scale-95", "opacity-0"), 10);
      }

      const set = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };
      const imgBox = document.getElementById("detail-img-box");
      if(imgBox) {
        if(r.image_urls && r.image_urls.length > 0) {
          if(r.image_urls.length === 1) {
            imgBox.innerHTML = `<img src="${API_URL}${r.image_urls[0]}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />`;
          } else if (r.image_urls.length === 2) {
            imgBox.innerHTML = `<div class="flex h-full w-full"><div class="w-1/2 border-r border-zen-border dark:border-zen-border-dark"><img src="${API_URL}${r.image_urls[0]}" class="w-full h-full object-cover" /></div><div class="w-1/2"><img src="${API_URL}${r.image_urls[1]}" class="w-full h-full object-cover" /></div></div>`;
          } else {
            imgBox.innerHTML = `<div class="flex h-full w-full"><div class="w-2/3 border-r border-zen-border dark:border-zen-border-dark"><img src="${API_URL}${r.image_urls[0]}" class="w-full h-full object-cover" /></div><div class="w-1/3 flex flex-col"><div class="h-1/2 border-b border-zen-border dark:border-zen-border-dark"><img src="${API_URL}${r.image_urls[1]}" class="w-full h-full object-cover" /></div><div class="h-1/2"><img src="${API_URL}${r.image_urls[2]}" class="w-full h-full object-cover" /></div></div></div>`;
          }
        } else {
           imgBox.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl grayscale">🖼️</div>`;
        }
      }
      
      const dateEl = document.getElementById("modal-date");
      if(dateEl) dateEl.innerText = `Dilaporkan pada: ${new Date(r.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB`;

      const reporterName = r.profile?.full_name || 'Warga';
      const reporterAvatarUrl = r.profile?.avatar_url;
      const reporterAvatar = reporterAvatarUrl 
        ? `<img src="${reporterAvatarUrl.startsWith('http') ? reporterAvatarUrl : API_URL + reporterAvatarUrl}" class="w-full h-full object-cover" />` 
        : `<div class="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">${reporterName[0].toUpperCase()}</div>`;
      
      const nameEl = document.getElementById('detail-reporter-name');
      const avatarEl = document.getElementById('detail-reporter-avatar');
      if (nameEl) nameEl.textContent = reporterName;
      if (avatarEl) avatarEl.innerHTML = reporterAvatar;

      set("detail-desc", r.description);
      set("detail-loc", r.location_detail);
      set("modal-vote-count", r.vote_count);
      
      const badge = document.getElementById("modal-status-badge");
      if(badge) {
        badge.innerText = r.status;
        badge.className = `inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
          r.status === 'PENDING' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-500/20' :
          r.status === 'VALID' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 border-green-200 dark:border-green-500/20' :
          'bg-blue-50 dark:bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-500/20'
        }`;
      }
      
      const gLink = document.getElementById("gmaps-link") as HTMLAnchorElement;
      if(gLink) gLink.href = `https://www.google.com/maps?q=${r.latitude},${r.longitude}`;

      const modalMapContainer = document.getElementById('admin-map');
      const viewMapBtn = document.getElementById('btn-toggle-map');
      const viewMapText = document.getElementById('btn-toggle-map-text');
      if (modalMapContainer && viewMapBtn && viewMapText) {
        modalMapContainer.classList.add('hidden');
        viewMapText.textContent = 'LIHAT PETA';

        viewMapBtn.onclick = () => {
          const isHidden = modalMapContainer.classList.toggle('hidden');
          viewMapText.textContent = isHidden ? 'LIHAT PETA' : 'TUTUP PETA';
          if (!isHidden) {
            setTimeout(() => {
              if ((window as any).mMap) (window as any).mMap.remove();
              const IDB = (window as any).L.latLngBounds(
                (window as any).L.latLng(-11.5, 94.0),
                (window as any).L.latLng(7.0, 142.0)
              );
              (window as any).mMap = (window as any).L.map('admin-map', {
                zoomControl: true,
                maxBounds: IDB,
                maxBoundsViscosity: 0.9,
                minZoom: 5
              }).setView([r.latitude, r.longitude], 15);
              const isDark = document.documentElement.classList.contains('dark');
              (window as any).L.tileLayer(
                isDark
                  ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                  : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                { subdomains: 'abcd', crossOrigin: true }
              ).addTo((window as any).mMap);
              (window as any).L.marker([r.latitude, r.longitude]).addTo((window as any).mMap);
            }, 150);
          }
        };
      }

      async function fetchAdminComments(reportId) {
        const list = document.getElementById('admin-comments-list');
        if (!list) return;
        list.innerHTML = '<div class="text-sm font-bold text-stone-400 text-center py-4">Memuat komentar...</div>';
        try {
          const res = await fetch(`${API_URL}/api/reports/${reportId}/comments`);
          const data = await res.json();
          const comments = data.data || [];
          if (comments.length === 0) {
            list.innerHTML = '<div class="text-sm font-bold text-stone-400 text-center py-4">Belum ada diskusi.</div>';
            return;
          }
          list.innerHTML = comments.map(c => {
            const initial = (c.user?.full_name || 'U')[0].toUpperCase();
            const avatarHtml = c.user?.avatar_url ? `<img src="${c.user.avatar_url.startsWith('http') ? c.user.avatar_url : API_URL + c.user.avatar_url}" class="w-full h-full object-cover" />` : initial;
            const isAdmin = c.user?.role === 'admin' || c.user?.role === 'super_admin';
            const badgeHtml = c.user?.role === 'super_admin' ? `<svg class="inline-block ml-1 w-3.5 h-3.5 text-amber-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.25 15L6 12.25l1.41-1.41L10.75 14.17l7.84-7.84L20 7.75 10.75 17z"/></svg>` : (c.user?.role === 'admin' ? `<svg class="inline-block ml-1 w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.25 15L6 12.25l1.41-1.41L10.75 14.17l7.84-7.84L20 7.75 10.75 17z"/></svg>` : '');
            
            return `
            <div class="flex gap-3 max-w-[90%] ${isAdmin ? 'self-end flex-row-reverse' : ''}">
              <div class="w-8 h-8 rounded-xl overflow-hidden shrink-0 flex items-center justify-center font-black text-xs ${isAdmin ? 'bg-stone-900 dark:bg-white text-white dark:text-black' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'} border border-white/10">
                ${avatarHtml}
              </div>
              <div class="p-4 rounded-2xl flex-1 min-w-0 border ${isAdmin ? 'bg-stone-900 dark:bg-white text-white dark:text-black self-end border-transparent' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-white/10'}">
                <div class="mb-1 text-xs opacity-70 flex items-center"><strong>${c.user?.full_name || 'Warga'}</strong>${badgeHtml}</div>
                <p class="m-0 text-sm">${c.content}</p>
              </div>
            </div>
          `}).join('');
        } catch(e) {
          list.innerHTML = '<div class="text-sm font-bold text-red-500 text-center py-4">Gagal memuat diskusi.</div>';
        }
      }
      fetchAdminComments(id);

      const modContainer = document.getElementById("moderation-container");
      const btnVerify = document.getElementById("btn-verify");
      const btnResolve = document.getElementById("btn-resolve");
      const btnCancel = document.getElementById("btn-cancel");
      if (modContainer && btnVerify && btnResolve && btnCancel) {
        if (r.status === 'PENDING') {
          modContainer.style.display = 'block';
          btnVerify.style.display = 'flex';
          btnResolve.style.display = 'none';
          btnCancel.style.display = 'none';
        } else if (r.status === 'VALID') {
          modContainer.style.display = 'block';
          btnVerify.style.display = 'none';
          btnResolve.style.display = 'flex';
          btnCancel.style.display = 'flex';
        } else if (r.status === 'RESOLVED') {
          modContainer.style.display = 'block';
          btnVerify.style.display = 'none';
          btnResolve.style.display = 'none';
          btnCancel.style.display = 'flex';
        } else {
          modContainer.style.display = 'none';
        }
      }
    };

    window.verifyReport = async (status) => {
      if(!currentReportId) return;
      const token = localStorage.getItem("access_token");
      try {
        const route = status === "VALID" ? "verify" : status === "RESOLVED" ? "resolve" : "cancel";
        const endpoint = status === "CANCEL" ? `${API_URL}/api/superadmin/reports/${currentReportId}/cancel` : `${API_URL}/api/admin/reports/${currentReportId}/${route}`;
        const res = await fetch(endpoint, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
        });
        if(res.ok) {
          showToast({ message: `Laporan berhasil diubah statusnya`, type: 'success' });
          (window as any).closeModal();
          loadData();
        } else {
          const data = await res.json();
          throw new Error(data.error || "Gagal");
        }
      } catch (err) { showToast({ message: "Gagal memperbarui status: " + err.message, type: 'error' }); }
    };

    function setupFilters() {
      const inputs = ["search-input", "category-filter", "status-filter"];
      inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener("input", () => {
            const search = (document.getElementById("search-input") as HTMLInputElement)?.value.toLowerCase() || "";
            const cat = (document.getElementById("category-filter") as HTMLSelectElement)?.value || "";
            const status = (document.getElementById("status-filter") as HTMLSelectElement)?.value || "";
            
            const filtered = reportsData.filter(r => {
              const matchesSearch = (r.description || '').toLowerCase().includes(search) || 
                                   (r.location_detail || '').toLowerCase().includes(search);
              const matchesCat = !cat || String(r.category_id) === cat;
              const matchesStatus = !status || r.status === status;
              return matchesSearch && matchesCat && matchesStatus;
            });
            
            renderReports(filtered);
          });
        }
      });
    }

    function setupListeners() {
      document.getElementById("btn-verify")?.addEventListener("click", () => window.verifyReport("VALID"));
      document.getElementById("btn-resolve")?.addEventListener("click", () => window.verifyReport("RESOLVED"));
      document.getElementById("btn-cancel")?.addEventListener("click", () => {
        if (confirm("Apakah Anda yakin ingin membatalkan status laporan ini kembali ke PENDING? Poin user akan dikurangi secara otomatis.")) {
          window.verifyReport("CANCEL");
        }
      });

      document.getElementById("btn-export")?.addEventListener("click", () => {
        if (!reportsData || reportsData.length === 0) {
          showToast({ message: "Tidak ada data laporan untuk diekspor.", type: 'error' });
          return;
        }
        const headers = ["ID", "Tanggal", "Pelapor", "Kategori", "Lokasi", "Status", "Deskripsi"];
        const rows = reportsData.map(r => {
          const date = new Date(r.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'});
          const cat = categoriesData.find(c => c.id === r.category_id)?.name || 'Umum';
          const reporterName = `"${(r.profile?.full_name || 'Warga').replace(/"/g, '""')}"`;
          const desc = `"${(r.description || '').replace(/"/g, '""')}"`;
          const loc = `"${(r.location_detail || '').replace(/"/g, '""')}"`;
          return [r.id, date, reporterName, cat, loc, r.status, desc].join(",");
        });
        const csvContent = [headers.join(","), ...rows].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Data_Laporan_SovraEquitara_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    let mainInterval;
    let timeInterval;
    let themeObserver;

    function initZenDashboard() {
      updateTime();
      loadData();
      setupFilters();
      setupListeners();

      if (timeInterval) clearInterval(timeInterval);
      timeInterval = setInterval(updateTime, 1000);

      if (mainInterval) clearInterval(mainInterval);
      mainInterval = setInterval(loadData, 10000);

      if (themeObserver) themeObserver.disconnect();
      themeObserver = new MutationObserver(() => renderCharts());
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    document.addEventListener('astro:page-load', initZenDashboard);
  