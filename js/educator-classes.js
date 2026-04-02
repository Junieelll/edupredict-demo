window.EP = window.EP || {};

EP.educatorClasses = {
  render() {
    const { classes, students } = EP.data;
    const totalStudents = classes.reduce((s, c) => s + c.students, 0);
    const avgGPA = (students.reduce((s, st) => s + st.gpa, 0) / students.length).toFixed(2);

    document.getElementById('content').innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6">
        <div class="flex flex-row items-center justify-between gap-4">
          <div>
            <h1 class="font-display font-semibold text-[#0F172A] text-[14px] md:text-lg">My Classes</h1>
            <p class="text-[#64748B] text-xs mt-0.5">Manage and track performance across your ${classes.length} active courses</p>
          </div>
          <button onclick="EP.actions.newClass()" class="bg-indigo-500 hover:bg-indigo-600 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-3 md:px-6 md:py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex justify-center items-center gap-2 flex-shrink-0">
            ${EP.getIcon('plus', 'w-4 h-4')}
            <span>New Class</span>
          </button>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${[
            { label: 'Active Classes', value: classes.length, icon: 'book-open', color: 'indigo' },
            { label: 'Total Students', value: totalStudents, icon: 'users', color: 'violet' },
            { label: 'Average GPA', value: avgGPA, icon: 'academic-cap', color: 'emerald' },
          ].map(s => `
            <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-${s.color}-50 flex items-center justify-center flex-shrink-0">
                ${EP.getIcon(s.icon, `w-6 h-6 text-${s.color}-500`)}
              </div>
              <div>
                <p class="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">${s.label}</p>
                <p class="text-xl font-display font-bold text-[#0F172A]">${s.value}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Classes Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${classes.map(cls => `
            <div class="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div class="h-24 bg-gradient-to-br ${classGradient(cls.color)} p-6 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
                <div class="relative flex justify-between items-start">
                  <div>
                    <h3 class="text-white font-display font-bold text-lg leading-tight">${cls.code}</h3>
                    <p class="text-white/80 text-xs font-medium">${cls.room}</p>
                  </div>
                  <div class="bg-white/20 backdrop-blur-md rounded-lg px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                    ${cls.semester.split(',')[0]}
                  </div>
                </div>
              </div>
              <div class="p-6">
                <h4 class="font-display font-bold text-[#0F172A] mb-1 group-hover:text-indigo-600 transition-colors">${cls.name}</h4>
                <p class="text-xs text-[#64748B] line-clamp-2 mb-4 leading-relaxed">${cls.description}</p>
                
                <div class="grid grid-cols-2 gap-4 pt-4 border-t border-[#F1F5F9]">
                  <div>
                    <p class="text-[10px] font-bold text-[#94A3B8] uppercase mb-1">Students</p>
                    <div class="flex items-center gap-1.5 capitalize text-xs font-semibold text-[#475569]">
                      ${EP.getIcon('users', 'w-3.5 h-3.5 text-[#94A3B8]')}
                      ${cls.students} Enrolled
                    </div>
                  </div>
                  <div>
                    <p class="text-[10px] font-bold text-[#94A3B8] uppercase mb-1">Performance</p>
                    <div class="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                      ${EP.getIcon('chart-bar', 'w-3.5 h-3.5 text-indigo-400')}
                      ${cls.avgScore}% Avg
                    </div>
                  </div>
                </div>

                <div class="mt-5 flex gap-2">
                  <button onclick="EP.actions.viewClass(${cls.id})" class="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-[10px] font-semibold uppercase tracking-widest py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-1.5 focus:outline-none">
                    ${EP.getIcon('view-details', 'w-4 h-4', 'solid')}
                    <span>Manage Class</span>
                  </button>
                  <button onclick="EP.notify('Class options for ${cls.code}', 'info')" class="w-10 h-10 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-indigo-200 text-[#475569] hover:text-indigo-600 rounded-xl transition-all flex items-center justify-center active:scale-95">
                    ${EP.getIcon('ellipsis-horizontal', 'w-5 h-5')}
                  </button>
                </div>
              </div>
            </div>
          `).join('')}

          <div onclick="EP.actions.newClass()" class="bg-[#F8FAFC] rounded-3xl border-2 border-dashed border-[#E2E8F0] p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[360px] group cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
            <div class="w-14 h-14 rounded-2xl bg-white shadow-sm border border-[#E2E8F0] flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
              ${EP.getIcon('plus', 'w-7 h-7')}
            </div>
            <div>
              <p class="font-display font-semibold text-[#475569] group-hover:text-indigo-600 transition-colors">Add New Class</p>
              <p class="text-xs text-[#94A3B8] mt-1 max-w-[150px] mx-auto">Create a new course section for this semester</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
