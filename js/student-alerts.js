window.EP = window.EP || {};
EP.studentAlerts = {
  render() {
    this.renderView();
  },

  renderView(search = '') {
    const { notifications } = EP.data;
    const filtered = notifications.filter(n => 
      n.title.toLowerCase().includes(search.toLowerCase()) || 
      n.text.toLowerCase().includes(search.toLowerCase())
    );

    const grouped = filtered.reduce((acc, n) => {
      const date = new Date(n.time).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const label = date === today ? 'Today' : date;
      if (!acc[label]) acc[label] = [];
      acc[label].push(n);
      return acc;
    }, {});

    document.getElementById('content').innerHTML = `
      <div class="max-w-4xl mx-auto space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="font-display font-semibold text-[#0F172A] text-sm md:text-lg">Notifications</h1>
            <p class="text-[#64748B] text-xs mt-0.5">Stay updated with your latest academic alerts and system updates.</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="text-xs font-semibold text-indigo-600 px-4 py-2 hover:bg-indigo-50 rounded-xl transition-all">Mark all as read</button>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94A3B8]">
            ${EP.getIcon('magnifying-glass', 'w-4 h-4')}
          </div>
          <input type="text" 
            placeholder="Search notifications..." 
            value="${search}"
            oninput="EP.studentAlerts.renderView(this.value)"
            class="w-full pl-11 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm">
        </div>

        <!-- Alerts List -->
        <div class="space-y-8">
          ${Object.keys(grouped).length === 0 ? `
            <div class="bg-white rounded-3xl border border-[#E2E8F0] p-12 text-center shadow-sm">
              <div class="w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#CBD5E1]">
                ${EP.getIcon('bell-slash', 'w-8 h-8')}
              </div>
              <h3 class="font-display font-semibold text-[#0F172A]">No notifications found</h3>
              <p class="text-[#64748B] text-xs mt-1">We couldn't find any alerts matching your search.</p>
            </div>
          ` : Object.entries(grouped).map(([date, items]) => `
            <div>
              <h3 class="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-4 ml-1">${date}</h3>
              <div class="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm divide-y divide-[#F1F5F9]">
                ${items.map(n => `
                  <div class="p-5 flex items-start gap-4 hover:bg-[#F8FAFC] transition-colors group cursor-pointer">
                    <div class="w-10 h-10 rounded-xl bg-${n.color}-50 flex items-center justify-center text-${n.color}-500 flex-shrink-0 mt-0.5 border border-${n.color}-100">
                      ${EP.getIcon(n.icon, 'w-5 h-5', 'solid')}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between gap-2 mb-1">
                        <p class="font-semibold text-[#0F172A] text-sm group-hover:text-indigo-600 transition-colors">${n.title}</p>
                        <span class="text-[10px] text-[#94A3B8] flex-shrink-0">${new Date(n.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                      </div>
                      <p class="text-[11px] md:text-xs text-[#64748B] leading-relaxed">${n.text}</p>
                    </div>
                    ${!n.isRead ? `<div class="w-2 h-2 bg-indigo-500 rounded-full mt-2 ring-4 ring-indigo-500/10"></div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
};
