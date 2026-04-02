window.EP = window.EP || {};

EP.studentClasses = {
  render() {
    const { classes, classworks } = EP.data;

    document.getElementById('content').innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h1 class="font-display font-semibold text-[#0F172A] dark:text-[#f9fafb] text-[14px] md:text-lg">My Classes</h1>
            <p class="text-[#64748B] dark:text-[#9ca3af] text-xs mt-0.5">2nd Semester, AY 2025-2026 · ${classes.length} enrolled</p>
          </div>
          <button onclick="EP.actions.joinClass()" class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all outline-none flex-shrink-0">
            Join Class
          </button>
        </div>

        <!-- Class Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          ${classes.map(cls => {
            const cws = classworks.filter(cw=>cw.classId===cls.id);
            const pending = cws.filter(c=>c.status==='Pending').length;
            const graded  = cws.filter(c=>c.status==='Graded');
            const avgScore = graded.length ? Math.round(graded.reduce((s,c)=>s+(c.score/c.maxScore)*100,0)/graded.length) : null;
            return `
              <div class="bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#1f2937] overflow-hidden shadow-sm hover-lift group dark:shadow-indigo-500/10">
                <!-- Header -->
                <div class="h-32 bg-gradient-to-br ${classGradient(cls.color)} relative overflow-hidden">
                  <div class="absolute inset-0 bg-black/10"></div>
                  <div class="absolute bottom-0 left-0 right-0 p-4">
                    <span class="text-white/90 text-[10px] font-bold uppercase tracking-widest bg-white/10 px-2 py-1 rounded-full">${cls.code}</span>
                    <h3 class="font-display font-bold text-white text-base mt-2 leading-tight">${cls.name}</h3>
                  </div>
                  <div class="absolute top-3 right-3 text-white/10 font-display font-semibold text-5xl select-none">${cls.code}</div>
                </div>

                <!-- Body -->
                <div class="p-5">
                  <p class="text-[#64748B] dark:text-[#9ca3af] text-xs leading-relaxed mb-4">${cls.description}</p>

                  <div class="grid grid-cols-2 gap-3 mb-4">
                    <div class="bg-[#F8FAFC] dark:bg-[#030712] rounded-xl p-3 border border-transparent dark:border-[#1f2937]">
                      <p class="text-[10px] text-[#94A3B8] uppercase font-semibold tracking-wide mb-1">Instructor</p>
                      <p class="text-xs font-semibold text-[#475569] dark:text-[#f9fafb] leading-tight">${cls.instructor}</p>
                    </div>
                    <div class="bg-[#F8FAFC] dark:bg-[#030712] rounded-xl p-3 border border-transparent dark:border-[#1f2937]">
                      <p class="text-[10px] text-[#94A3B8] uppercase font-semibold tracking-wide mb-1">Schedule</p>
                      <p class="text-xs font-semibold text-[#475569] dark:text-[#f9fafb] leading-tight">${cls.schedule}</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 mb-4">
                    <div class="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#9ca3af]">
                      ${EP.getIcon('map-pin', 'w-3.5 h-3.5 text-[#94A3B8]')}
                      ${cls.room}
                    </div>
                    <div class="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#9ca3af]">
                      ${EP.getIcon('users', 'w-3.5 h-3.5 text-[#94A3B8]')}
                      ${cls.students} students
                    </div>
                  </div>

                  <!-- Stats -->
                  <div class="flex gap-2 pt-4 border-t border-[#F1F5F9] dark:border-[#1f2937]">
                    <div class="flex-1 text-center">
                      <p class="font-display font-bold text-[#0F172A] dark:text-[#f9fafb] text-lg">${avgScore ?? '—'}${avgScore ? '%' : ''}</p>
                      <p class="text-[10px] text-[#94A3B8]">Avg Score</p>
                    </div>
                    <div class="w-px bg-[#F1F5F9] dark:bg-[#1f2937]"></div>
                    <div class="flex-1 text-center">
                      <p class="font-display font-bold text-[#0F172A] dark:text-[#f9fafb] text-lg">${cws.length}</p>
                      <p class="text-[10px] text-[#94A3B8]">Classworks</p>
                    </div>
                    <div class="w-px bg-[#F1F5F9] dark:bg-[#1f2937]"></div>
                    <div class="flex-1 text-center">
                      <p class="font-display font-bold ${pending>0?'text-amber-500':'text-emerald-500'} text-lg">${pending}</p>
                      <p class="text-[10px] text-[#94A3B8]">Pending</p>
                    </div>
                  </div>

                  <div class="mt-4 flex gap-2">
                    <button onclick="EP.actions.viewClass(${cls.id})" class="flex-1 py-2.5 rounded-xl bg-indigo-500 text-white text-xs font-semibold hover:bg-indigo-600 transition-all shadow-sm shadow-indigo-500/10 active:scale-95">
                      View Class
                    </button>
                    <button onclick="navigate('classwork')" class="flex-1 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#1f2937] text-xs font-semibold text-[#64748B] dark:text-[#9ca3af] hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-all active:scale-95 text-center">
                      Classwork
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Academic Info Card -->
        <div class="bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#1f2937] p-6 shadow-sm dark:shadow-indigo-500/5">
          <h2 class="font-display font-semibold text-[#0F172A] dark:text-[#f9fafb] text-base mb-4">Academic Information</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${[
              { label:'Program',    value:'BS Information Technology' },
              { label:'Year Level', value:'4th Year' },
              { label:'Semester',   value:'2nd Semester' },
              { label:'Total Units', value:'21 units' },
            ].map(item=>`
              <div class="bg-[#F8FAFC] dark:bg-[#030712] rounded-xl p-4 border border-[#E2E8F0] dark:border-[#1f2937]">
                <p class="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">${item.label}</p>
                <p class="font-semibold text-[#0F172A] dark:text-[#f9fafb] text-sm">${item.value}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
};