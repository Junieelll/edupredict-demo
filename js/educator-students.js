window.EP = window.EP || {};

EP.educatorStudents = {
  render() {
    const { students } = EP.data;
    const highRiskCount = students.filter(s => s.dropoutRisk === 'High').length;
    const avgAttendance = Math.round(students.reduce((s, st) => s + st.attendance, 0) / students.length);

    document.getElementById('content').innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="font-display font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-[14px] md:text-lg">Students</h1>
            <p class="text-[#64748B] dark:text-[#94A3B8] text-xs mt-0.5">Track and manage ${students.length} students across all courses</p>
          </div>
          <div class="flex items-center gap-2 flex-wrap md:flex-nowrap">
             <div class="relative flex-1 sm:w-64">
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                   ${EP.getIcon('magnifying-glass', 'w-4 h-4')}
                </div>
                <input type="text" placeholder="Search students..." class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#141D33] text-[#0F172A] dark:text-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all shadow-sm placeholder-[#94A3B8]">
             </div>
             <button onclick="EP.actions.newStudent()" class="bg-indigo-500 hover:bg-indigo-600 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-3 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-2 flex-shrink-0">
                ${EP.getIcon('user-plus', 'w-4 h-4')}
                <span>New Student</span>
             </button>
             <button onclick="EP.actions.showFilterOptions('Students')" class="bg-white dark:bg-[#141D33] hover:bg-gray-50 dark:hover:bg-white/5 border border-[#E2E8F0] dark:border-[#1E293B] hover:border-indigo-200 dark:hover:border-indigo-500/50 text-[#475569] dark:text-[#94A3B8] hover:text-indigo-600 dark:hover:text-indigo-400 p-2.5 rounded-xl transition-all shadow-sm active:scale-95">
                ${EP.getIcon('adjustments-horizontal', 'w-5 h-5')}
             </button>
          </div>
        </div>

        <!-- Quick Summary -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          ${[
            { label: 'Total Students', value: students.length, icon: 'users', color: 'indigo' },
            { label: 'High Risk', value: highRiskCount, icon: 'exclamation-triangle', color: 'red' },
            { label: 'Avg Attendance', value: avgAttendance + '%', icon: 'check-badge', color: 'emerald' },
            { label: 'Top Performers', value: students.filter(s => s.gpa >= 3.5).length, icon: 'star', color: 'amber' },
          ].map(s => `
            <div class="bg-white dark:bg-[#141D33] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] p-4 shadow-sm dark:shadow-indigo-500/5 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-${s.color}-50 dark:bg-${s.color}-500/10 flex items-center justify-center flex-shrink-0">
                ${EP.getIcon(s.icon, `w-5 h-5 text-${s.color}-500 dark:text-${s.color}-400`)}
              </div>
              <div>
                <p class="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">${s.label}</p>
                <p class="text-base font-display font-bold text-[#0F172A] dark:text-[#F8FAFC]">${s.value}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Student List -->
        <div class="bg-white dark:bg-[#141D33] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-[#F8FAFC] dark:bg-[#0D1425] border-b border-[#E2E8F0] dark:border-[#1E293B] text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider">
                  <th class="px-6 py-4">Student Name</th>
                  <th class="px-6 py-4">GPA</th>
                  <th class="px-6 py-4">Attendance</th>
                  <th class="px-6 py-4">Risk Level</th>
                  <th class="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
                ${students.map(s => `
                  <tr class="hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors group">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        ${avatarEl(s.name, 'w-10 h-10 text-sm')}
                        <div>
                          <p class="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${s.name}</p>
                          <p class="text-xs text-[#94A3B8] truncate max-w-[120px]">${s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <div class="flex-1 w-16 h-1.5 bg-[#F1F5F9] dark:bg-[#0D1425] rounded-full overflow-hidden border border-transparent dark:border-[#1E293B]">
                          <div class="h-full rounded-full bg-indigo-500" style="width: ${s.gpa * 25}%"></div>
                        </div>
                        <span class="text-sm font-bold text-[#475569] dark:text-[#F8FAFC]">${s.gpa}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-1.5 text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
                        ${EP.getIcon(s.attendance >= 90 ? 'arrow-trending-up' : s.attendance >= 75 ? 'minus' : 'arrow-trending-down', `w-4 h-4 ${s.attendance >= 90 ? 'text-emerald-500' : s.attendance >= 75 ? 'text-amber-500' : 'text-red-500'}`)}
                        ${s.attendance}%
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      ${riskBadge(s.dropoutRisk)}
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                         <button onclick="EP.notify('Email composer not available in prototype', 'info')" class="p-2 border border-[#E2E8F0] dark:border-[#1E293B] rounded-lg text-[#64748B] dark:text-[#94A3B8] hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:bg-white dark:hover:bg-white/5 transition-all shadow-sm">
                            ${EP.getIcon('envelope', 'w-4 h-4')}
                         </button>
                         <button onclick="EP.actions.viewDetails(${s.id})" class="p-2 border border-[#E2E8F0] dark:border-[#1E293B] rounded-lg text-[#64748B] dark:text-[#94A3B8] hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:bg-white dark:hover:bg-white/5 transition-all shadow-sm">
                            ${EP.getIcon('eye', 'w-4 h-4')}
                         </button>
                         <button onclick="EP.actions.confirmDelete('${s.name}', () => { EP.data.students = EP.data.students.filter(st=>st.name!=='${s.name}'); EP.educatorStudents.render(); EP.notify('Student removed from course', 'success'); })" class="p-2 border border-[#E2E8F0] dark:border-rose-500/30 rounded-lg text-rose-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all shadow-sm">
                            ${EP.getIcon('trash', 'w-4 h-4')}
                         </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
};
