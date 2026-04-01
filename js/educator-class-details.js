window.EP = window.EP || {};

EP.educatorClassDetails = {
  render() {
    const classId = EP.selectedClassId;
    const cls = EP.data.classes.find(c => c.id === classId);
    
    if (!cls) {
      navigate('classes');
      return;
    }

    const students = EP.data.students; // In a real app, filter by class
    const classworks = EP.data.classworks.filter(cw => cw.classId === classId);
    const announcements = EP.data.announcements.filter(a => a.classId === classId);

    const lowRisk = students.filter(s => s.dropoutRisk === 'Low').length;
    const medRisk = students.filter(s => s.dropoutRisk === 'Medium').length;
    const highRisk = students.filter(s => s.dropoutRisk === 'High').length;

    document.getElementById('content').innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6">
        <!-- Header / Breadcrumb -->
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <button onclick="navigate('classes')" class="p-2 rounded-xl bg-white border border-[#E2E8F0] text-[#64748B] hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-95 shadow-sm">
              ${EP.getIcon('arrow-left', 'w-5 h-5')}
            </button>
            <div>
              <div class="flex items-center gap-2 text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-0.5">
                <span>Classes</span>
                ${EP.getIcon('chevron-right', 'w-3 h-3')}
                <span class="text-indigo-500">${cls.code}</span>
              </div>
              <h1 class="font-display font-semibold text-[#0F172A] text-xl leading-none">Class Management</h1>
            </div>
          </div>
          <div class="flex items-center gap-2">
             <button onclick="EP.actions.postAnnouncement('${cls.name}')" class="bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-3 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2">
                ${EP.getIcon('megaphone', 'w-4 h-4', 'solid')}
                <span>Announce</span>
             </button>
             <button onclick="EP.actions.newAssignment()" class="bg-indigo-500 hover:bg-indigo-600 text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-3 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-2">
                ${EP.getIcon('plus-circle', 'w-4 h-4', 'solid')}
                <span>New Assignment</span>
             </button>
          </div>
        </div>

        <!-- Class Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
             <p class="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-2">Average Score</p>
             <p class="text-3xl font-display font-bold text-indigo-600">${cls.avgScore}%</p>
             <div class="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-500 font-semibold">
                ${EP.getIcon('arrow-trending-up', 'w-3 h-3')}
                <span>+2.4% from last week</span>
             </div>
          </div>
          <div class="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
             <p class="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-2">Submission Rate</p>
             <p class="text-3xl font-display font-bold text-[#0F172A]">92%</p>
             <div class="mt-2 text-[10px] text-[#94A3B8] font-semibold">26/28 students submitted</div>
          </div>
          <div class="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm col-span-1 md:col-span-2">
             <p class="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-4">Risk Distribution</p>
             <div class="flex items-center gap-2 h-8 w-full rounded-2xl overflow-hidden">
                <div class="h-full bg-emerald-500 transition-all hover:brightness-110 relative group" style="width: ${(lowRisk/students.length)*100}%">
                   <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Low: ${lowRisk}</div>
                </div>
                <div class="h-full bg-amber-500 transition-all hover:brightness-110 relative group" style="width: ${(medRisk/students.length)*100}%">
                   <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Medium: ${medRisk}</div>
                </div>
                <div class="h-full bg-rose-500 transition-all hover:brightness-110 relative group" style="width: ${(highRisk/students.length)*100}%">
                   <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">High: ${highRisk}</div>
                </div>
             </div>
             <div class="mt-4 flex items-center justify-between text-[10px] font-semibold">
                <span class="text-emerald-600 uppercase tracking-widest">${lowRisk} On Track</span>
                <span class="text-amber-600 uppercase tracking-widest">${medRisk} At Risk</span>
                <span class="text-rose-600 uppercase tracking-widest">${highRisk} Critical</span>
             </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Student List -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm">
               <div class="px-6 py-5 border-b border-[#F1F5F9] flex items-center justify-between">
                 <h3 class="font-display font-semibold text-[#0F172A] text-sm flex items-center gap-2">
                    ${EP.getIcon('users', 'w-5 h-5 text-indigo-500', 'solid')} Enrolled Students
                 </h3>
                 <div class="flex items-center gap-2">
                    <button class="p-2 rounded-xl text-[#64748B] hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                       ${EP.getIcon('magnifying-glass', 'w-4 h-4')}
                    </button>
                    <button onclick="EP.actions.newStudent()" class="flex items-center gap-1 px-3 py-2 rounded-xl text-[10px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 uppercase tracking-widest hover:bg-indigo-100 transition-all active:scale-95">
                       ${EP.getIcon('plus', 'w-3 h-3')}
                       <span>Add Student</span>
                    </button>
                    <button class="p-2 rounded-xl text-[#64748B] hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                       ${EP.getIcon('funnel', 'w-4 h-4')}
                    </button>
                 </div>
               </div>
               <div class="overflow-x-auto">
                 <table class="w-full text-left">
                   <thead class="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                     <tr>
                       <th class="px-6 py-4 text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest">Student Name</th>
                       <th class="px-6 py-4 text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest">Attendance</th>
                       <th class="px-6 py-4 text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest">Risk Level</th>
                       <th class="px-6 py-4 text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest">Predicted GPA</th>
                       <th class="px-6 py-4"></th>
                     </tr>
                   </thead>
                   <tbody class="divide-y divide-[#F1F5F9]">
                     ${students.map(s => `
                       <tr class="hover:bg-[#FDFDFF] transition-colors cursor-pointer group">
                         <td class="px-6 py-4">
                           <div class="flex items-center gap-3">
                              ${avatarEl(s.name, 'w-9 h-9 text-[10px]')}
                              <div class="min-w-0">
                                <p class="text-sm font-bold text-[#0F172A] truncate">${s.name}</p>
                                <p class="text-[10px] text-[#94A3B8] truncate leading-tight">${s.email}</p>
                              </div>
                           </div>
                         </td>
                         <td class="px-6 py-4">
                           <div class="flex items-center gap-2">
                              <span class="text-xs font-bold text-[#475569]">${s.attendance}%</span>
                              <div class="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                 <div class="h-full ${s.attendance > 85 ? 'bg-emerald-500' : 'bg-amber-500'} rounded-full transition-all" style="width:${s.attendance}%"></div>
                              </div>
                           </div>
                         </td>
                         <td class="px-6 py-4">
                            ${riskBadge(s.dropoutRisk)}
                         </td>
                         <td class="px-6 py-4">
                            <span class="text-xs font-semibold text-[#0F172A] tracking-tighter">${(s.gpa).toFixed(2)}</span>
                         </td>
                         <td class="px-6 py-4 text-right">
                           <button class="p-2 rounded-xl text-[#94A3B8] hover:text-indigo-600 hover:bg-indigo-50 transition-all opacity-0 group-hover:opacity-100">
                             ${EP.getIcon('chevron-right', 'w-4 h-4')}
                           </button>
                         </td>
                       </tr>
                     `).join('')}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Details Card -->
            <div class="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
               <h3 class="font-display font-semibold text-[#0F172A] text-sm mb-6 flex items-center gap-2">
                  ${EP.getIcon('document-text', 'w-5 h-5 text-violet-500', 'solid')} Class Overview
               </h3>
               <div class="space-y-5">
                  <div>
                    <p class="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Course Title</p>
                    <p class="text-xs font-semibold text-[#475569] leading-relaxed">${cls.name}</p>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                     <div>
                       <p class="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-1">Course Code</p>
                       <p class="text-xs font-semibold text-indigo-500 uppercase">${cls.code}</p>
                     </div>
                     <div>
                       <p class="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-1">Students</p>
                       <p class="text-xs font-semibold text-[#0F172A] uppercase">${cls.students} Enrolled</p>
                     </div>
                  </div>
                  <div>
                    <p class="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-1">Schedule & Room</p>
                   <p class="text-xs font-semibold text-[#475569] leading-relaxed">${cls.schedule} · ${cls.room}</p>
                  </div>
               </div>
            </div>

            <!-- Danger Zone -->
            <div class="bg-rose-50 rounded-3xl border border-rose-100 p-6">
               <h3 class="font-display font-semibold text-rose-800 text-sm mb-2 flex items-center gap-2">
                  ${EP.getIcon('exclamation-triangle', 'w-5 h-5 text-rose-500', 'solid')} Administration
               </h3>
               <p class="text-rose-600 text-[10px] leading-relaxed mb-4 opacity-80">Archiving this class will move it to your records and disable student participation.</p>
               <button onclick="EP.actions.confirmDelete('${cls.code}', () => { EP.notify('Class archived successfully', 'success'); navigate('classes'); })" class="w-full py-3.5 bg-rose-600 text-white text-[10px] font-semibold uppercase tracking-widest rounded-xl shadow-lg shadow-rose-500/20 active:scale-95 transition-all">
                  Archive Class
               </button>
            </div>

            <!-- Recent Classwork -->
            <div class="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
               <h3 class="font-display font-semibold text-[#0F172A] text-sm mb-6 flex items-center gap-2 font-display">
                  ${EP.getIcon('clipboard-document-list', 'w-5 h-5 text-indigo-500', 'solid')} Recent Classwork
               </h3>
               <div class="space-y-4">
                  ${classworks.map(cw => `
                    <div class="group cursor-pointer" onclick="EP.actions.gradeSubmissions('${cw.title}')">
                       <div class="flex justify-between items-start mb-2">
                          <div>
                             <p class="text-xs font-bold text-[#475569] group-hover:text-indigo-600 transition-colors">${cw.title}</p>
                             <p class="text-[10px] text-[#94A3B8] font-medium italic">Due ${new Date(cw.dueDate).toLocaleDateString()}</p>
                          </div>
                          <span class="text-[10px] font-black text-indigo-500">${cw.submissions}/${cw.total}</span>
                       </div>
                       <div class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div class="h-full bg-indigo-500 rounded-full transition-all group-hover:brightness-110" style="width:${(cw.submissions/cw.total)*100}%"></div>
                       </div>
                    </div>
                  `).join('')}
               </div>
               <button onclick="navigate('classwork')" class="w-full mt-6 py-3.5 bg-indigo-50 text-indigo-600 text-[10px] font-semibold uppercase tracking-widest rounded-xl hover:bg-indigo-100 transition-all active:scale-95">View All Classwork</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
