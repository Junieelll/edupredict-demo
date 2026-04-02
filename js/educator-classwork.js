window.EP = window.EP || {};

EP.educatorClasswork = {
  render() {
    const { classworks, classes } = EP.data;
    const totalSubmissions = classworks.reduce((s, cw) => s + cw.submissions, 0);
    const totalStudents = classworks.reduce((s, cw) => s + cw.total, 0);
    const avgCompletion = Math.round((totalSubmissions / totalStudents) * 100);

    document.getElementById('content').innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between gap-4">
          <div>
            <h1 class="font-display font-semibold text-[#0F172A] text-[14px] md:text-lg">Classwork Management</h1>
            <p class="text-[#64748B] text-xs mt-0.5">Track and grade ${classworks.length} active assignments</p>
          </div>
          <button onclick="EP.actions.newAssignment()" class="bg-indigo-500 hover:bg-indigo-600 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-3 md:px-6 md:py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-2 flex-shrink-0">
            ${EP.getIcon('plus', 'w-4 h-4')}
            <span>New Task</span>
          </button>
        </div>

        <!-- Quick Summary -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${[
            { label: 'Avg Submission Rate', value: avgCompletion + '%', icon: 'clipboard-document-check', color: 'indigo' },
            { label: 'Pending Grading', value: classworks.filter(cw => cw.status === 'Submitted').length, icon: 'clock', color: 'amber' },
            { label: 'Completed Review', value: classworks.filter(cw => cw.status === 'Graded').length, icon: 'check-circle', color: 'emerald' },
          ].map(s => `
            <div class="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-${s.color}-50 flex items-center justify-center flex-shrink-0">
                ${EP.getIcon(s.icon, `w-6 h-6 text-${s.color}-500`)}
              </div>
              <div>
                <p class="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">${s.label}</p>
                <p class="text-xl font-display font-bold text-[#0F172A]">${s.value}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Classwork Grid -->
        <div class="grid grid-cols-1 gap-4">
          ${classworks.map(cw => {
            const cls = classes.find(c => c.id === cw.classId);
            const subPct = Math.round((cw.submissions / cw.total) * 100);
            return `
              <div class="bg-white rounded-2xl border border-transparent p-5 shadow-sm hover:border-indigo-200 transition-all group">
                <div class="flex flex-col md:flex-row md:items-center gap-5">
                  <div class="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                    ${typeIcon(cw.type, 'w-6 h-6 text-indigo-500')}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 class="font-display font-semibold text-[#0F172A] text-sm group-hover:text-indigo-600 transition-colors">${cw.title}</h3>
                        <div class="flex items-center gap-2 mt-1">
                          <span class="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                            ${cls?.code || ''}
                          </span>
                          <span class="text-xs text-[#94A3B8]">${cls?.name || ''}</span>
                        </div>
                      </div>
                      ${statusBadge(cw.status)}
                    </div>
                    
                    <div class="flex flex-col lg:flex-row lg:items-center gap-5 mt-6 pt-5 border-t border-[#F8FAFC]">
                      <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-center mb-1.5 text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">
                          <span>Submissions</span>
                          <span class="text-[#475569]">${cw.submissions}/${cw.total} (${subPct}%)</span>
                        </div>
                        <div class="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                          <div class="h-full rounded-full bg-indigo-500 transition-all duration-700 shadow-sm shadow-indigo-500/20" style="width: ${subPct}%"></div>
                        </div>
                      </div>
                      
                      <div class="grid grid-cols-2 sm:flex items-center gap-4 sm:gap-8">
                        <div class="min-w-0">
                          <p class="text-[10px] font-bold text-[#94A3B8] uppercase leading-tight italic tracking-wide">Due Date</p>
                          <p class="text-xs font-semibold text-[#475569] mt-0.5">${new Date(cw.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div class="min-w-0 border-l border-[#F1F5F9] pl-4 sm:border-l-0 sm:pl-0 sm:text-center">
                          <p class="text-[10px] font-bold text-[#94A3B8] uppercase leading-tight italic tracking-wide">Graded</p>
                          <p class="text-xs font-semibold text-[#475569] mt-0.5">${cw.status === 'Graded' ? cw.submissions : '0'}/${cw.submissions}</p>
                        </div>
                      </div>
                      
                      <div class="flex items-center gap-2 pt-2 lg:pt-0 lg:ml-auto">
                        <div class="flex gap-2.5">
                          <button onclick="EP.actions.gradeSubmissions('${cw.title}')" class="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-[10px] font-semibold uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                            Grade Submissions
                          </button>
                          <button onclick="EP.notify('Assignment editor not available', 'info')" class="w-10 h-10 flex items-center justify-center bg-white border border-[#E2E8F0] text-[#64748B] hover:text-indigo-600 hover:border-indigo-200 rounded-xl transition-all hover:shadow-sm active:scale-95">
                            ${EP.getIcon('pencil-square', 'w-5 h-5')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
};
