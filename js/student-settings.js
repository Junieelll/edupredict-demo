window.EP = window.EP || {};
 
EP.studentSettings = {
  render() {
    const { currentUser } = EP.data;
    
    document.getElementById('content').innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between gap-4">
          <div>
            <h1 class="font-display font-semibold text-[#0F172A] dark:text-[#f9fafb] text-[14px] md:text-lg">Settings</h1>
            <p class="text-[#64748B] dark:text-[#9ca3af] text-xs mt-0.5">Manage your profile, academic info, and preferences</p>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="EP.actions.saveSettings()" class="bg-indigo-500 hover:bg-indigo-600 text-white text-[10px] font-semibold uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-2">
              ${EP.getIcon('check-badge', 'w-4 h-4')}
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Profile Column -->
          <div class="lg:col-span-1 space-y-6">
            <div class="bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-sm flex flex-col items-center text-center border border-transparent dark:border-[#1f2937] dark:shadow-indigo-500/10">
              <div class="relative mb-4 group cursor-pointer">
                <div class="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 p-1">
                   <div class="w-full h-full rounded-full bg-white dark:bg-[#030712] flex items-center justify-center p-1 overflow-hidden shadow-inner">
                      ${avatarEl(currentUser.name, 'w-full h-full text-3xl font-semibold dark:text-white')}
                   </div>
                </div>
                <div class="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                   ${EP.getIcon('camera', 'w-6 h-6')}
                </div>
              </div>
              <h2 class="font-display font-semibold text-[#0F172A] dark:text-[#f9fafb] text-lg">${currentUser.name}</h2>
              <p class="text-xs text-[#64748B] dark:text-[#9ca3af] font-medium leading-relaxed">${currentUser.program}</p>
              <div class="mt-4 flex flex-wrap justify-center gap-2">
                 <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 uppercase tracking-wider">Active Student</span>
              </div>
            </div>

            <div class="bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-sm border border-transparent dark:border-[#1f2937]">
               <h3 class="font-display font-semibold text-[#0F172A] dark:text-[#f9fafb] text-sm mb-4">Academic Information</h3>
               <div class="space-y-5">
                  ${[
                    { label: 'Student ID', value: currentUser.studentId, icon: 'identification' },
                    { label: 'Year Level', value: currentUser.year, icon: 'academic-cap' },
                    { label: 'Program', value: currentUser.program, icon: 'book-open' },
                    { label: 'Email Address', value: currentUser.email, icon: 'envelope' },
                  ].map(f => `
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-lg bg-gray-50 dark:bg-[#030712] flex items-center justify-center flex-shrink-0 text-[#94A3B8]">
                           ${EP.getIcon(f.icon, 'w-4 h-4')}
                        </div>
                        <div class="min-w-0">
                           <p class="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wide mb-1">${f.label}</p>
                           <p class="text-sm font-semibold text-[#475569] dark:text-[#f9fafb] truncate">${f.value}</p>
                        </div>
                    </div>
                  `).join('')}
               </div>
            </div>
          </div>

          <!-- Settings Column -->
          <div class="lg:col-span-2 space-y-6">
             <!-- Notifications -->
             <div class="bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-sm border border-transparent dark:border-[#1f2937]">
                    <h3 class="font-display font-semibold text-[#0F172A] dark:text-[#f9fafb] text-base mb-6 flex items-center gap-2">
                      ${EP.getIcon('bell', 'w-5 h-5 text-indigo-500', 'solid')} Notification Preferences
                   </h3>
                <div class="space-y-6">
                   ${[
                     { id: 'rem', title: 'Assignment Reminders', desc: 'Get notified 24 hours before deadlines', on: true },
                     { id: 'grd', title: 'Grade Updates', desc: 'Alert when your work is graded by instructor', on: true },
                     { id: 'cwk', title: 'New Classwork', desc: 'When instructor posts new materials', on: true },
                     { id: 'pred', title: 'Prediction Forecasts', desc: 'Weekly AI performance forecast summaries', on: false },
                   ].map(n => `
                      <div class="flex items-center justify-between py-2 border-b border-[#F8FAFC] dark:border-[#1f2937] last:border-0 hover:bg-[#FDFDFF] dark:hover:bg-white/5 transition-colors -mx-4 px-4 rounded-xl">
                         <div class="flex-1 pr-4">
                             <p class="text-sm font-semibold text-[#0F172A] dark:text-[#f9fafb]">${n.title}</p>
                             <p class="text-xs text-[#94A3B8] mt-0.5">${n.desc}</p>
                         </div>
                         <button onclick="EP.ui.toggle(this, '${n.id}')"
                          class="relative w-9 h-5 rounded-full flex items-center px-[2px] transition-all flex-shrink-0 ${n.on ? 'toggle-on' : 'toggle-off'}">
                           <span class="w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${n.on ? 'translate-x-4' : 'translate-x-0'}"></span>
                        </button>
                      </div>
                   `).join('')}
                </div>
             </div>

             <!-- Appearance -->
             <div class="bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-sm border border-transparent dark:border-[#1f2937]">
                <h3 class="font-display font-semibold text-[#0F172A] dark:text-[#f9fafb] text-base mb-6 flex items-center gap-2">
                   ${EP.getIcon('paint-brush', 'w-5 h-5 text-violet-500', 'solid')} Appearance Settings
                </h3>
                <div class="grid grid-cols-3 gap-3">
                    ${[
                      { id: 'light', label:'Light', active: (localStorage.getItem('ep_theme') || 'light') === 'light', bg:'bg-white dark:bg-slate-800', icon:'sun', text:'text-indigo-600', iconColor:'text-indigo-500' },
                      { id: 'dark', label:'Dark', active: (localStorage.getItem('ep_theme')) === 'dark', bg:'bg-[#0D1425]', icon:'moon', text:'text-white', iconColor:'text-white/70' },
                      { id: 'system', label:'System', active: (localStorage.getItem('ep_theme')) === 'system', bg:'bg-gradient-to-br from-[#1E293B] to-[#0F172A]', icon:'computer-desktop', text:'text-white', iconColor:'text-white/70' },
                    ].map(t=>`
                      <button onclick="EP.actions.setTheme('${t.id}')" class="flex-1 rounded-xl border-2 ${t.active?'border-indigo-400 shadow-lg shadow-indigo-500/10':'border-transparent opacity-60 hover:opacity-100'} ${t.bg} p-4 flex flex-col items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 group shadow-sm">
                        <div class="${t.active ? (t.id === 'light' ? 'bg-indigo-50' : 'bg-white/10') : 'bg-black/10'} w-10 h-10 rounded-full flex items-center justify-center mb-1 group-hover:rotate-12 transition-transform">
                           ${EP.getIcon(t.icon, `w-5 h-5 ${t.active ? t.iconColor : 'text-slate-400'}`)}
                        </div>
                        <span class="text-[10px] font-semibold ${t.active ? (t.id === 'light' ? 'text-indigo-600' : 'text-white') : 'text-slate-400'} tracking-widest uppercase italic transition-colors">${t.label}</span>
                      </button>
                    `).join('')}
                </div>
             </div>
             
             <!-- Danger Zone -->
             <div class="bg-rose-50 rounded-2xl border border-rose-100 dark:bg-rose-950/60 dark:border-rose-700 p-6 flex items-center justify-between gap-4">
                <div class="flex items-start gap-4">
                   <div class="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/60 flex items-center justify-center flex-shrink-0">
                      ${EP.getIcon('exclamation-triangle', 'w-5 h-5 text-rose-600 dark:text-rose-300', 'solid')}
                   </div>
                   <div>
                      <h4 class="font-display font-semibold text-rose-800 dark:text-rose-600 text-sm">Delete Account Data</h4>
                      <p class="text-rose-600 text-xs mt-0.5 leading-relaxed opacity-90">Irreversibly remove all your class records and student data.</p>
                   </div>
                </div>
                <button onclick="EP.actions.confirmDelete('All Account Data', () => { EP.notify('All local data cleared. Resetting...', 'error'); setTimeout(()=>location.reload(), 2000); })" class="px-4 py-2 bg-rose-600 text-white text-[10px] font-semibold rounded-xl hover:bg-rose-700 transition-colors uppercase tracking-widest shadow-sm shadow-rose-500/20 active:scale-95">
                   Delete Data
                </button>
             </div>
          </div>
        </div>
      </div>
    `;
  },

  showSaved() {
    const msg = document.getElementById('saved-msg');
    if (msg) {
      msg.classList.remove('hidden');
      setTimeout(() => msg.classList.add('hidden'), 2500);
    }
  }
};