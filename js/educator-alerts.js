window.EP = window.EP || {};
EP.educatorAlerts = {
  render() {
    this.renderView();
  },

  renderView(search = '') {
    const { notifications } = EP.data;
    // For educator, we'll prefix some specific alerts
    const educatorAlerts = [
      { id: 101, title: 'Submission Deadline Reached', time: new Date().toISOString(), text: 'Midterm Prototype V1 is now closed for submissions.', icon: 'clock', color: 'red', isRead: false },
      { id: 102, title: 'New Student Enrolled', time: new Date(Date.now() - 3600000).toISOString(), text: 'Maria Santos has joined Capstone Project 2.', icon: 'user-plus', color: 'emerald', isRead: false },
      ...notifications
    ];

    const filtered = educatorAlerts.filter(n => 
      n.title.toLowerCase().includes(search.toLowerCase()) || 
      n.text.toLowerCase().includes(search.toLowerCase())
    );

    const grouped = filtered.reduce((acc, n) => {
      const date = new Date(n.time).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const label = date === new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) ? 'Today' : date;
      if (!acc[label]) acc[label] = [];
      acc[label].push(n);
      return acc;
    }, {});

    document.getElementById('content').innerHTML = `
      <div class="max-w-4xl mx-auto space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="font-display font-semibold text-[#0F172A] text-sm md:text-lg">Educator Notifications</h1>
            <p class="text-[#64748B] text-xs mt-0.5">Manage class updates, student enrollments, and academic deadlines.</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="text-xs font-semibold text-indigo-600 px-4 py-2 hover:bg-indigo-50 rounded-xl transition-all">Mark all as read</button>
          </div>
        </div>

        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94A3B8]">
            ${EP.getIcon('magnifying-glass', 'w-4 h-4')}
          </div>
          <input type="text" 
            placeholder="Search alerts..." 
            value="${search}"
            oninput="EP.educatorAlerts.renderView(this.value)"
            class="w-full pl-11 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm">
        </div>

        <div class="space-y-8">
          ${Object.entries(grouped).map(([date, items]) => `
            <div>
              <h3 class="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-4 ml-1">${date}</h3>
              <div class="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm divide-y divide-[#F1F5F9]">
                ${items.map(n => `
                  <div class="p-5 flex items-start gap-4 hover:bg-[#F8FAFC] transition-colors group cursor-pointer">
                    <div class="w-10 h-10 rounded-xl bg-${n.color}-50 flex items-center justify-center text-${n.color}-500 flex-shrink-0 mt-0.5 border border-${n.color}-100 transition-transform group-hover:scale-110">
                      ${EP.getIcon(n.icon, 'w-5 h-5', 'solid')}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between gap-2 mb-1">
                        <p class="font-semibold text-[#0F172A] text-sm group-hover:text-indigo-600 transition-colors">${n.title}</p>
                        <span class="text-[10px] text-[#94A3B8]">${new Date(n.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                      </div>
                      <p class="text-[11px] md:text-xs text-[#64748B] leading-relaxed">${n.text}</p>
                    </div>
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
