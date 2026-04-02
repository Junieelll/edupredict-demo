window.EP = window.EP || {};

EP.studentClassDetails = {
  render() {
    const classId = EP.selectedClassId;
    const cls = EP.data.classes.find(c => c.id === classId);
    
    if (!cls) {
      navigate('classes');
      return;
    }

    const classworks = EP.data.classworks.filter(cw => cw.classId === classId);
    const announcements = EP.data.announcements.filter(a => a.classId === classId);
    
    const graded = classworks.filter(c => c.status === 'Graded');
    const avgScore = graded.length ? Math.round(graded.reduce((s, c) => s + (c.score / c.maxScore) * 100, 0) / graded.length) : '—';

    document.getElementById('content').innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6">
        <!-- Header / Breadcrumb -->
        <div class="flex items-center gap-4">
          <button onclick="navigate('classes')" class="p-2 rounded-xl bg-white border border-[#E2E8F0] text-[#64748B] hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-95 shadow-sm">
            ${EP.getIcon('arrow-left', 'w-5 h-5')}
          </button>
          <div>
            <div class="flex items-center gap-2 text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-0.5">
              <span>My Classes</span>
              ${EP.getIcon('chevron-right', 'w-3 h-3')}
              <span class="text-indigo-500">${cls.code}</span>
            </div>
            <h1 class="font-display font-semibold text-[#0F172A] text-lg leading-none">${cls.name}</h1>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Hero Card -->
            <div class="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm relative group/hero">
              <div class="h-44 bg-gradient-to-br ${classGradient(cls.color)} relative overflow-hidden">
                 <!-- Decorative Graphics -->
                 <div class="absolute inset-0 bg-black/10 transition-colors group-hover/hero:bg-black/5"></div>
                 <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                 <div class="absolute -left-8 -top-8 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
                 
                 <!-- Subject-Specific Background Icons -->
                 <div class="absolute right-12 top-1/2 -translate-y-1/2 opacity-10 transition-transform duration-700 group-hover/hero:scale-110 group-hover/hero:rotate-12">
                   ${EP.getIcon(cls.code==='PRC102'?'briefcase':cls.code==='CAP102'?'rocket-launch':'server', 'w-32 h-32 text-white', 'solid')}
                 </div>
                 <div class="absolute right-32 bottom-4 opacity-5 rotate-12">
                   ${EP.getIcon(cls.code==='PRC102'?'academic-cap':cls.code==='CAP102'?'beaker':'cpu-chip', 'w-20 h-20 text-white', 'solid')}
                 </div>

                 <div class="absolute top-6 left-8">
                   <span class="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-semibold text-white uppercase tracking-widest border border-white/20 shadow-sm">${cls.code}</span>
                 </div>
              </div>
              <div class="px-8 pb-8 -mt-12 relative">
                <div class="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xl shadow-black/5 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div class="text-center">
                    <p class="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-1">Students</p>
                    <p class="font-display font-semibold text-[#0F172A] text-lg">${cls.students}</p>
                  </div>
                  <div class="text-center border-l border-[#F1F5F9]">
                    <p class="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-1">Your Grade</p>
                    <p class="font-display font-semibold text-indigo-600 text-lg">${avgScore}${avgScore !== '—' ? '%' : ''}</p>
                  </div>
                  <div class="text-center border-l border-[#F1F5F9]">
                    <p class="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-1">Rank</p>
                    <p class="font-display font-semibold text-[#0F172A] text-lg">Top 15%</p>
                  </div>
                  <div class="text-center border-l border-[#F1F5F9]">
                    <p class="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-1">Next Class</p>
                    <p class="font-display font-semibold text-amber-500 text-lg">${cls.nextClass.split(',')[0]}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- About & Announcements -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div class="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
                 <h3 class="font-display font-semibold text-[#0F172A] text-sm mb-4 flex items-center gap-2">
                    ${EP.getIcon('information-circle', 'w-5 h-5 text-indigo-500', 'solid')} Course Description
                 </h3>
                 <p class="text-xs text-[#64748B] leading-relaxed">${cls.description}</p>
                 <div class="mt-6 space-y-3">
                    <div class="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9]">
                       <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
                          ${EP.getIcon('calendar', 'w-4 h-4')}
                       </div>
                       <div>
                          <p class="text-[10px] font-semibold text-[#94A3B8] uppercase">Schedule</p>
                          <p class="text-xs font-semibold text-[#475569]">${cls.schedule}</p>
                       </div>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9]">
                       <div class="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-500">
                          ${EP.getIcon('map-pin', 'w-4 h-4')}
                       </div>
                       <div>
                          <p class="text-[10px] font-semibold text-[#94A3B8] uppercase">Location</p>
                          <p class="text-xs font-semibold text-[#475569]">${cls.room}</p>
                       </div>
                    </div>
                 </div>
               </div>

               <div class="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
                 <h3 class="font-display font-semibold text-[#0F172A] text-sm mb-4 flex items-center gap-2">
                    ${EP.getIcon('megaphone', 'w-5 h-5 text-amber-500', 'solid')} Announcements
                 </h3>
                 <div class="space-y-4">
                   ${announcements.length ? announcements.map(a => `
                     <div class="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl relative overflow-hidden group">
                       <div class="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
                       <div class="flex justify-between items-start mb-1">
                          <p class="text-xs font-semibold text-amber-800">${a.title}</p>
                          <span class="text-[9px] font-medium text-amber-600/70 uppercase">${new Date(a.date).toLocaleDateString()}</span>
                       </div>
                       <p class="text-[11px] text-amber-900/70 leading-relaxed">${a.text}</p>
                     </div>
                   `).join('') : `
                     <div class="py-8 text-center bg-[#F8FAFC] rounded-2xl border border-dashed border-[#E2E8F0]">
                        <p class="text-xs text-[#94A3B8]">No announcements yet</p>
                     </div>
                   `}
                 </div>
               </div>
            </div>

            <!-- Classwork -->
            <div class="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm">
               <div class="px-6 py-5 border-b border-[#F1F5F9] flex items-center justify-between">
                 <h3 class="font-display font-semibold text-[#0F172A] text-sm flex items-center gap-2">
                    ${EP.getIcon('clipboard-document-list', 'w-5 h-5 text-emerald-500', 'solid')} Classwork & Submissions
                 </h3>
                 <button onclick="navigate('classwork')" class="text-[10px] font-semibold text-indigo-500 uppercase tracking-widest hover:text-indigo-600">View All</button>
               </div>
               <div class="divide-y divide-[#F1F5F9]">
                  ${classworks.map(cw => `
                    <div class="p-6 flex items-center justify-between hover:bg-[#FDFDFF] transition-colors cursor-pointer group" onclick="EP.actions.viewClassworkDetails(${cw.id})">
                       <div class="flex items-center gap-4">
                          <div class="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#94A3B8] group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all">
                             ${typeIcon(cw.type, 'w-6 h-6')}
                          </div>
                          <div>
                             <p class="text-sm font-semibold text-[#0F172A] mb-0.5">${cw.title}</p>
                             <div class="flex items-center gap-2">
                                <span class="text-[10px] text-[#94A3B8] font-medium">${cw.type}</span>
                                <span class="w-1 h-1 rounded-full bg-[#E2E8F0]"></span>
                                <span class="text-[10px] text-[#94A3B8] font-medium italic">Due ${new Date(cw.dueDate).toLocaleDateString()}</span>
                             </div>
                          </div>
                       </div>
                       <div>
                          ${statusBadge(cw.status)}
                       </div>
                    </div>
                  `).join('')}
               </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Instructor Card -->
            <div class="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm text-center">
               <div class="w-20 h-20 rounded-full bg-indigo-500 mx-auto mb-4 p-1">
                  <div class="w-full h-full rounded-full border-4 border-white overflow-hidden bg-[#F8FAFC] flex items-center justify-center">
                     ${avatarEl(cls.instructor, 'w-full h-full text-2xl font-semibold')}
                  </div>
               </div>
               <h4 class="font-display font-semibold text-[#0F172A] text-base">${cls.instructor}</h4>
               <p class="text-xs text-[#94A3B8] font-medium mb-4">Course Instructor</p>
               <div class="pt-4 border-t border-[#F1F5F9] flex gap-2">
                  <button class="flex-1 py-3.5 bg-indigo-50 text-indigo-600 text-[10px] font-semibold uppercase tracking-widest rounded-xl hover:bg-indigo-100 transition-all active:scale-95">Message</button>
                  <button class="flex-1 py-3.5 bg-[#F8FAFC] text-[#475569] text-[10px] font-semibold uppercase tracking-widest rounded-xl hover:bg-[#F1F5F9] transition-all border border-[#E2E8F0] active:scale-95">Profile</button>
               </div>
            </div>

            <!-- Grade Breakdown -->
            <div class="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
               <h3 class="font-display font-semibold text-[#0F172A] text-sm mb-6 flex items-center gap-2">
                  ${EP.getIcon('chart-pie', 'w-5 h-5 text-violet-500', 'solid')} Grade Weighting
               </h3>
               <div class="space-y-4">
                  ${[
                    { label:'Assignments', weight:20, color:'indigo' },
                    { label:'Quizzes', weight:25, color:'violet' },
                    { label:'Midterms', weight:25, color:'amber' },
                    { label:'Final Exam', weight:30, color:'rose' }
                  ].map(w => `
                    <div class="group">
                       <div class="flex justify-between items-center mb-1.5">
                          <span class="text-[10px] font-semibold text-[#475569] uppercase tracking-wider">${w.label}</span>
                          <span class="text-xs font-semibold text-${w.color}-500">${w.weight}%</span>
                       </div>
                       <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div class="h-full bg-${w.color}-500 rounded-full transition-all group-hover:brightness-110" style="width:${w.weight}%"></div>
                       </div>
                    </div>
                  `).join('')}
               </div>
               <p class="mt-6 text-[10px] text-[#94A3B8] italic leading-relaxed text-center">Weights are based on the latest course syllabus provided by the instructor.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
