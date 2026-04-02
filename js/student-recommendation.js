window.EP = window.EP || {};

EP.studentRecommendation = {
  render() {
    const { recommendations } = EP.data;
    const typeConfig = {
      Video:    { icon:'play-circle',  color:'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',     label:'Video' },
      Article:  { icon:'document-text',  color:'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',   label:'Article' },
      Practice: { icon:'code-bracket', color:'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20', label:'Practice' },
    };
    const diffConfig = {
      Beginner:     'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
      Intermediate: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
      Advanced:     'bg-red-50 text-red-700 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
    };

    document.getElementById('content').innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6">
        <!-- Header -->
        <div class="flex items-start justify-between gap-4">
          <div>
            <h1 class="font-display font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-[14px] md:text-lg">AI Recommendations</h1>
            <p class="text-[#64748B] dark:text-[#94A3B8] text-xs mt-0.5">Personalized study materials based on your performance</p>
          </div>
          <div class="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 border shrink-0 border-indigo-100 dark:border-indigo-500/20 rounded-xl px-3 py-2 md:px-4 md:py-2.5 shadow-sm">
            ${EP.getIcon('sparkles', 'w-4 h-4 text-indigo-500')}
            <span class="text-[10px] md:text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest md:normal-case md:tracking-normal">AI-Powered</span>
          </div>
        </div>

        <!-- Info banner -->
        <div class="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-500/10 dark:to-violet-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl p-5 flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
            ${EP.getIcon('bolt', 'w-5 h-5 text-indigo-600 dark:text-indigo-400')}
          </div>
          <div>
            <p class="font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-sm">How recommendations work</p>
            <p class="text-[#64748B] dark:text-[#94A3B8] text-xs mt-1 leading-relaxed">EduPredict analyzes your quiz scores, attendance, assignment submissions, and learning patterns to surface the most relevant study materials for you right now.</p>
          </div>
        </div>

        <!-- Recommendation groups -->
        ${recommendations.map((group, gi) => {
          const colors = ['indigo','violet','sky'];
          const color = colors[gi % colors.length];
          const gradMap = { indigo:'from-indigo-500 to-indigo-700', violet:'from-violet-500 to-violet-700', sky:'from-sky-500 to-sky-700' };
          return `
          <div class="bg-white dark:bg-[#141D33] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] overflow-hidden shadow-sm">
            <!-- Group header -->
            <div class="bg-gradient-to-r ${gradMap[color]} p-5 flex flex-wrap items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                ${EP.getIcon('book-open', 'w-4 h-4 text-white')}
              </div>
              <div class="flex-1 min-w-0">
                <h2 class="font-display font-bold text-white text-base truncate">${group.subject}</h2>
                <p class="text-white/70 text-[10px] md:text-xs mt-0.5 truncate">${group.reason}</p>
              </div>
              <div class="w-full sm:w-auto mt-2 sm:mt-0 text-white/50 text-[10px] font-semibold uppercase tracking-widest sm:normal-case sm:tracking-normal text-right sm:text-left">${group.items.length} resources</div>
            </div>

            <!-- Items -->
            <div class="divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
              ${group.items.map(item => {
                const tc = typeConfig[item.type] || typeConfig.Article;
                return `
                  <div class="p-5 flex flex-col sm:flex-row items-start gap-4 hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors cursor-pointer group/item">
                    <div class="w-10 h-10 rounded-xl ${tc.color} border shadow-sm flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                      ${EP.getIcon(tc.icon, 'w-5 h-5')}
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-sm group-hover/item:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${item.title}</p>
                      <div class="flex flex-wrap items-center gap-2 mt-1.5 opacity-70">
                        <span class="text-[10px] md:text-xs text-[#64748B] flex items-center gap-1">
                          ${EP.getIcon('arrow-top-right-on-square', 'w-3 h-3')}${item.source}
                        </span>
                        <span class="text-[#D1D5DB]">•</span>
                        <span class="text-[10px] md:text-xs text-[#94A3B8] flex items-center gap-1">
                          ${EP.getIcon('clock', 'w-3 h-3')}${item.duration}
                        </span>
                      </div>
                    </div>
                    <div class="flex flex-row sm:flex-col items-center sm:items-end gap-2 flex-shrink-0 w-full sm:w-auto mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F1F5F9] dark:border-[#1E293B]">
                      <span class="text-[9px] md:text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${diffConfig[item.difficulty]||'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400'}">${item.difficulty}</span>
                      <span class="text-[9px] md:text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest ml-auto sm:ml-0">${tc.label}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="p-4 bg-[#F8FAFC] dark:bg-[#0D1425] border-t border-[#F1F5F9] dark:border-[#1E293B]">
              <button class="text-sm font-semibold text-${color}-500 dark:text-${color}-400 hover:text-${color}-600 dark:hover:text-${color}-300 transition-colors flex items-center gap-1.5">
                ${EP.getIcon('plus-circle', 'w-4 h-4')} Load more resources
              </button>
            </div>
          </div>
          `;
        }).join('')}

        <!-- Tip card -->
        <div class="bg-[#0D1425] rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6 relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 relative z-10 scale-110 md:scale-100">
            ${EP.getIcon('light-bulb', 'w-6 h-6 text-amber-400', 'solid')}
          </div>
          <div class="flex-1 relative z-10 text-center md:text-left">
            <p class="font-display font-semibold text-white text-base">Study Tip</p>
            <p class="text-[#94A3B8] text-[11px] md:text-xs mt-2 md:mt-1 leading-relaxed max-w-sm mx-auto md:mx-0">Consistent 25-minute focused study sessions (Pomodoro technique) are more effective than long cramming sessions. Your AI assistant can help you create a personalized study schedule.</p>
          </div>
          <button onclick="navigate('chatbot')" class="w-full md:w-auto relative z-10 bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold px-6 py-3.5 md:py-2 rounded-xl transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-amber-500/20">
            Ask Assistant
          </button>
        </div>
      </div>
    `;
  }
};