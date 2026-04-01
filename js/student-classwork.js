window.EP = window.EP || {};

EP.studentClasswork = {
  activeFilter: 'All',

  render() {
    this.activeFilter = this.activeFilter || 'All';
    const { classworks, classes } = EP.data;
    const filters = ['All','Pending','Submitted','Graded','Overdue'];
    const counts = {};
    filters.forEach(f => counts[f] = f === 'All' ? classworks.length : classworks.filter(c=>c.status===f).length);

    const filtered = this.activeFilter === 'All' ? classworks : classworks.filter(c=>c.status===this.activeFilter);
    const sorted = [...filtered].sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate));

    document.getElementById('content').innerHTML = `
      <div class="max-w-4xl mx-auto space-y-5">
        <!-- Header -->
        <div class="flex items-center justify-between gap-4">
          <div>
            <h1 class="font-display font-semibold text-[#0F172A] text-[14px] md:text-lg">Classwork</h1>
            <p class="text-[#64748B] text-xs mt-0.5">${classworks.length} total assignments across ${classes.length} classes</p>
          </div>
        </div>

        <!-- Stats row -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          ${[
            { label:'Pending',   count:counts.Pending,   color:'amber', icon:'clock' },
            { label:'Overdue',   count:counts.Overdue,   color:'red',   icon:'exclamation-triangle' },
            { label:'Submitted', count:counts.Submitted, color:'sky',   icon:'arrow-up-tray' },
            { label:'Graded',    count:counts.Graded,    color:'emerald', icon:'check-badge' },
          ].map(s=>`
            <div class="bg-white rounded-2xl p-4 shadow-sm hover-lift relative overflow-hidden group">
              <div class="absolute right-2 top-2 text-${s.color}-500 opacity-[0.10] group-hover:opacity-10 transition-all duration-300">
                ${EP.getIcon(s.icon, 'w-12 h-12', 'solid')}
              </div>
              <div class="relative flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-${s.color}-50 flex items-center justify-center text-${s.color}-500 shadow-sm border border-${s.color}-100/50">
                  ${EP.getIcon(s.icon, 'w-5 h-5', 'solid')}
                </div>
                <div>
                  <p class="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">${s.label}</p>
                  <p class="font-display font-bold text-[#0F172A] text-2xl mt-0.5">${s.count}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Filters -->
        <div class="flex gap-2 overflow-x-auto pb-1">
          ${filters.map(f=>`
            <button onclick="EP.studentClasswork.setFilter('${f}')"
              class="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${this.activeFilter===f?'bg-indigo-500 text-white shadow-sm':'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-indigo-200 hover:text-indigo-600'}">
              ${f} ${counts[f]>0?`<span class="ml-1 text-xs opacity-70">${counts[f]}</span>`:''}
            </button>
          `).join('')}
        </div>

        <!-- Classwork list -->
        <div class="space-y-3">
          ${sorted.length === 0 ? `
            <div class="bg-white rounded-2xl p-12 text-center shadow-sm">
              <div class="mb-3 text-indigo-500">
                ${EP.getIcon('inbox', 'w-10 h-10', 'solid')}
              </div>
              <p class="font-semibold text-[#475569]">No ${this.activeFilter.toLowerCase()} assignments</p>
              <p class="text-sm text-[#94A3B8] mt-1">Check back later or switch filters.</p>
            </div>
          ` : sorted.map((cw, idx) => {
            const cls = classes.find(c=>c.id===cw.classId);
            const due = new Date(cw.dueDate);
            const diff = Math.ceil((due - new Date()) / 86400000);
            const dueText = cw.status==='Graded'?due.toLocaleDateString('en-US',{month:'short',day:'numeric'}):diff<0?'Overdue':diff===0?'Due today':diff===1?'Due tomorrow':`${diff}d left`;
            const dueColor = cw.status==='Graded'?'text-[#94A3B8]':diff<0?'text-red-500':diff<=1?'text-amber-500':'text-[#64748B]';
            const typeColors = { Assignment:'bg-blue-50 text-blue-600', Quiz:'bg-purple-50 text-purple-600', Project:'bg-emerald-50 text-emerald-600', Laboratory:'bg-cyan-50 text-cyan-600', Exam:'bg-red-50 text-red-600' };
            const clsColors = { 1:'indigo', 2:'violet', 3:'sky' };
            const cc = clsColors[cw.classId]||'indigo';

            return `
              <div class="bg-white rounded-2xl border border-transparent p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all animate-list-item" style="--i:${idx}">
                <div class="flex items-start gap-4">
                  <div class="w-11 h-11 rounded-xl ${typeColors[cw.type]||'bg-gray-50 text-gray-600'} flex items-center justify-center flex-shrink-0">
                    ${typeIcon(cw.type, 'w-6 h-6')}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <div>
                        <p class="font-semibold text-[#0F172A] text-sm">${cw.title}</p>
                        <div class="flex flex-wrap items-center gap-2 mt-1.5">
                          <span class="inline-flex items-center gap-1 text-xs font-semibold text-${cc}-600 bg-${cc}-50 border border-${cc}-100 px-2 py-0.5 rounded-full">
                            ${cls?.code||''}
                          </span>
                          <span class="text-xs text-[#94A3B8]">${cw.type}</span>
                        </div>
                      </div>
                      ${statusBadge(cw.status)}
                    </div>

                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5 pt-4 border-t border-[#F8FAFC]">
                      <div class="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                        <div class="flex items-center gap-1.5 text-xs font-semibold ${dueColor} tracking-tight">
                          ${EP.getIcon(diff < 0 ? 'exclamation-circle' : 'calendar', 'w-4 h-4')}
                          <span>${dueText}</span>
                        </div>
                        ${cw.status === 'Graded' ? `
                          <div class="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg shadow-sm">
                            ${EP.getIcon('check-badge', 'w-3.5 h-3.5')}
                            <span>${cw.score}/${cw.maxScore}</span>
                          </div>
                        `:''}
                      </div>
                      <button onclick="EP.actions.viewClassworkDetails(${cw.id})" class="w-full sm:w-auto bg-white hover:bg-gray-50 border border-[#E2E8F0] hover:border-indigo-200 text-[#475569] hover:text-indigo-600 text-[11px] font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95">
                         View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  setFilter(f) {
    this.activeFilter = f;
    const list = document.querySelector('.space-y-3');
    if (list) {
      list.style.opacity = '0';
      list.style.transform = 'translateY(4px)';
      list.style.transition = 'all 0.1s ease-out';
      setTimeout(() => {
        this.render();
      }, 100);
    } else {
      this.render();
    }
  }
};