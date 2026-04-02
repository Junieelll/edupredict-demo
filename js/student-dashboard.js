window.EP = window.EP || {};

EP.studentDashboard = {
  render() {
    const { currentUser, classes, classworks, predictions } = EP.data;
    const pending  = classworks.filter(c=>c.status==='Pending').length;
    const overdue  = classworks.filter(c=>c.status==='Overdue').length;
    const upcoming = classworks
      .filter(c=>['Pending','Overdue'].includes(c.status))
      .sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate))
      .slice(0,5);

    const hr = new Date().getHours();
    const greeting = hr<12?'Good morning':hr<17?'Good afternoon':'Good evening';

    document.getElementById('content').innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto">

        <!-- Welcome Banner -->
        <div class="relative bg-[#0D1425] dark:bg-[#0D1425]/90 backdrop-blur-md rounded-3xl overflow-hidden p-6 lg:p-8 border border-transparent dark:border-indigo-500/20 dark:shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)]">
          <div class="absolute inset-0">
            <div class="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 right-32 w-48 h-48 bg-violet-500/10 rounded-full blur-2xl"></div>
            <div class="absolute top-0 left-1/3 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl"></div>
          </div>
          <div class="relative flex items-start justify-between gap-4">
            <div class="flex-1">
              <p class="text-indigo-400 text-sm font-medium mb-1 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block"></span>
                ${greeting}
              </p>
              <h1 class="font-display text-white font-bold text-[14px] md:text-2xl lg:text-3xl mb-2 flex items-center gap-2">
                Welcome back, ${currentUser.name.split(' ')[0]}! ${EP.getIcon('hand-raised', 'w-5 h-5 md:w-7 md:h-7 text-amber-400', 'solid')}
              </h1>
              <p class="text-[#94A3B8] text-sm max-w-lg leading-relaxed">
                ${pending>0?`You have <span class="text-amber-400 font-semibold">${pending} pending</span> `:'All assignments are up to date. '}
                ${overdue>0?`and <span class="text-red-400 font-semibold">${overdue} overdue</span> assignments this week.`:'Keep up the great work!'}
              </p>
              <div class="flex flex-wrap gap-2 mt-4">
                <span class="inline-flex items-center gap-1.5 text-xs text-[#64748B] bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  ${EP.getIcon('book-open', 'w-3 h-3')} ${currentUser.program}
                </span>
                <span class="inline-flex items-center gap-1.5 text-xs text-[#64748B] bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  ${EP.getIcon('identification', 'w-3 h-3')} ${currentUser.studentId}
                </span>
              </div>
            </div>
            <div class="hidden lg:flex text-indigo-500/20 select-none">
              ${EP.getIcon('book-open', 'w-20 h-20', 'solid')}
            </div>
          </div>
 
          <!-- Quick stats -->
          <div class="relative mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            ${[
              { label:'GPA',        value:'3.52', sub:'↑ +0.2 this term', color:'text-emerald-400', icon:'academic-cap' },
              { label:'Attendance', value:'89%',  sub:'↑ +3% vs last sem', color:'text-emerald-400', icon:'user-group' },
              { label:'Classes',    value:classes.length, sub:`${classes.length} active courses`, color:'text-indigo-400', icon:'book-open' },
              { label:'Pending',    value:pending, sub:overdue>0?`${overdue} overdue`:'All on track', color:overdue>0?'text-red-400':pending>0?'text-amber-400':'text-emerald-400', icon:'clock' },
            ].map(s=>`
              <div class="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/10 transition-all group cursor-default">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">${s.label}</p>
                  <div class="text-white/10 group-hover:text-white/30 transition-colors">
                    ${EP.getIcon(s.icon, 'w-4 h-4', 'solid')}
                  </div>
                </div>
                <p class="font-display font-bold text-white text-xl lg:text-2xl">${s.value}</p>
                <div class="flex items-center gap-1.5 mt-1.5">
                  <span class="text-[10px] ${s.color} font-bold italic">${s.sub}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Main grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- Left col -->
          <div class="lg:col-span-2 space-y-6">

            <!-- Enrolled Classes -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <h2 class="font-display font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-lg">Enrolled Classes</h2>
                <button onclick="navigate('classes')" class="text-sm text-indigo-500 hover:text-indigo-600 font-medium flex items-center gap-1 transition-colors">
                  View all ${EP.getIcon('arrow-right', 'w-3.5 h-3.5')}
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                ${classes.map(cls => {
                  const cws = classworks.filter(cw=>cw.classId===cls.id);
                  const pending = cws.filter(c=>c.status==='Pending').length;
                  const graded  = cws.filter(c=>c.status==='Graded');
                  const avgScore = graded.length ? Math.round(graded.reduce((s,c)=>s+(c.score/c.maxScore)*100,0)/graded.length) : null;
                  
                  return `
                    <div class="bg-white dark:bg-[#141D33] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] overflow-hidden hover-lift cursor-pointer shadow-sm dark:shadow-indigo-500/10 group">
                      <div onclick="EP.actions.viewClass(${cls.id})" class="h-24 sm:h-28 bg-gradient-to-br ${classGradient(cls.color)} relative flex items-end p-5">
                        <span class="text-white/20 font-display font-semibold text-4xl absolute top-2 right-4 select-none hidden sm:block">${cls.code}</span>
                        <div class="relative z-10">
                          <span class="text-[10px] font-bold text-white uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">${cls.code}</span>
                          <h3 class="font-display font-bold text-white text-base mt-2 leading-tight group-hover:underline underline-offset-4 decoration-2 transition-all">${cls.name}</h3>
                        </div>
                      </div>
                      <div class="p-5">
                        <p class="text-[#64748B] dark:text-[#94A3B8] text-xs leading-relaxed mb-4 line-clamp-2">${cls.description}</p>
                        
                        <div class="flex items-center justify-between gap-4 mb-5 pb-5 border-b border-[#F1F5F9] dark:border-[#1E293B]">
                          <div class="text-center">
                            <p class="font-display font-bold text-[#0F172A] dark:text-[#F8FAFC] text-sm">${avgScore ?? '—'}${avgScore ? '%' : ''}</p>
                            <p class="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wide">Avg Score</p>
                          </div>
                          <div class="w-px h-6 bg-[#F1F5F9] dark:bg-[#1E293B]"></div>
                          <div class="text-center">
                            <p class="font-display font-bold text-[#0F172A] dark:text-[#F8FAFC] text-sm">${cws.length}</p>
                            <p class="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wide">Classes</p>
                          </div>
                          <div class="w-px h-6 bg-[#F1F5F9] dark:bg-[#1E293B]"></div>
                          <div class="text-center">
                            <p class="font-display font-bold ${pending>0?'text-amber-500':'text-emerald-500'} text-sm">${pending}</p>
                            <p class="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wide">Pending</p>
                          </div>
                        </div>

                        <button onclick="EP.actions.viewClass(${cls.id})" class="w-full py-3 rounded-2xl bg-indigo-500 text-white text-xs font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2">
                          View Details ${EP.getIcon('arrow-right', 'w-3.5 h-3.5')}
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-4">
                <h2 class="font-display font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-lg">Upcoming Work</h2>
                <button onclick="navigate('classwork')" class="text-sm text-indigo-500 hover:text-indigo-600 font-medium flex items-center gap-1 transition-colors">
                  View all ${EP.getIcon('arrow-right', 'w-3.5 h-3.5')}
                </button>
              </div>
              <div class="space-y-2.5">
                ${upcoming.length === 0 ? `
                  <div class="bg-white dark:bg-[#141D33] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] p-8 text-center shadow-sm dark:shadow-indigo-500/10">
                    <div class="mb-2 text-indigo-500">
                      ${EP.getIcon('sparkles', 'w-8 h-8', 'solid')}
                    </div>
                    <p class="text-[#64748B] dark:text-[#94A3B8] text-sm font-medium">You're all caught up!</p>
                    <p class="text-[#94A3B8] text-xs mt-1">No pending assignments this week.</p>
                  </div>
                ` : upcoming.map(cw=>{
                  const cls = EP.data.classes.find(c=>c.id===cw.classId);
                  const due = new Date(cw.dueDate);
                  const diff = Math.ceil((due - new Date()) / 86400000);
                  const dueText = diff < 0 ? 'Overdue' : diff === 0 ? 'Due today' : diff === 1 ? 'Due tomorrow' : `${diff} days left`;
                  const dueColor = diff < 0 ? 'text-red-500' : diff <= 1 ? 'text-amber-500' : 'text-[#94A3B8]';
                  const typeColors = { 
                    Assignment: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400', 
                    Quiz: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400', 
                    Project: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400', 
                    Laboratory: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400', 
                    Exam: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' 
                  };
                  return `
                    <div class="bg-white dark:bg-[#141D33] rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] p-4 flex items-center gap-3.5 hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:shadow-sm dark:hover:shadow-indigo-500/10 transition-all cursor-pointer dark:shadow-indigo-500/5">
                      <div class="w-10 h-10 rounded-xl ${typeColors[cw.type]||'bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-400'} flex items-center justify-center flex-shrink-0">
                        ${typeIcon(cw.type, 'w-5 h-5')}
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-sm truncate">${cw.title}</p>
                        <p class="text-xs text-[#94A3B8] mt-0.5">${cls?.code||''} · ${cw.type}</p>
                      </div>
                      <div class="text-right flex-shrink-0">
                        <p class="text-xs font-semibold ${dueColor}">${dueText}</p>
                        <p class="text-xs text-[#94A3B8]">${due.toLocaleDateString('en-US',{month:'short',day:'numeric'})}</p>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Right col -->
          <div class="space-y-5">
            <!-- Calendar -->
            <div id="cal-container">${getCalendarHTML(EP.calYear, EP.calMonth)}</div>

            <!-- Performance Snapshot -->
            <div class="bg-white dark:bg-[#141D33] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] p-5 shadow-sm dark:shadow-indigo-500/5">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-display font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-sm">Performance</h3>
                <span class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-2 py-0.5 rounded-full">↑ Improving</span>
              </div>
              ${predictions.student.subjects.map(s=>`
                <div class="mb-3.5">
                  <div class="flex justify-between items-center mb-1.5">
                    <span class="text-xs font-medium text-[#475569] dark:text-[#94A3B8]">${s.name}</span>
                    <span class="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">${s.current}%</span>
                  </div>
                  <div class="h-1.5 bg-[#F1F5F9] dark:bg-[#0D1425] rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-700 ${s.current>=85?'bg-emerald-500':s.current>=75?'bg-indigo-500':'bg-amber-500'}" style="width:${s.current}%"></div>
                  </div>
                </div>
              `).join('')}
              <button onclick="navigate('prediction')" class="mt-3 w-full py-2.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-all">
                View Full Prediction →
              </button>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white dark:bg-[#141D33] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] p-5 shadow-sm dark:shadow-indigo-500/5">
              <h3 class="font-display font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-sm mb-3">Quick Actions</h3>
              <div class="space-y-2">
                ${[
                  { label:'Ask Study Assistant', icon:'chat-bubble-left-right', page:'chatbot', color:'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' },
                  { label:'View Recommendations', icon:'sparkles', page:'recommendation', color:'text-violet-500 bg-violet-50 dark:bg-violet-500/10' },
                  { label:'Check Predictions', icon:'arrow-trending-up', page:'prediction', color:'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
                ].map(a=>`
                  <button onclick="navigate('${a.page}')" class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-white/5 border border-transparent hover:border-[#E2E8F0] dark:hover:border-[#1E293B] transition-all text-left group/btn">
                    <div class="w-8 h-8 rounded-lg ${a.color} flex items-center justify-center flex-shrink-0 transition-transform group-hover/btn:scale-110">
                      ${EP.getIcon(a.icon, 'w-4 h-4')}
                    </div>
                    <span class="text-sm font-medium text-[#475569] dark:text-[#94A3B8]">${a.label}</span>
                    ${EP.getIcon('chevron-right', 'w-3.5 h-3.5 text-[#CBD5E1] dark:text-[#334155] ml-auto')}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};