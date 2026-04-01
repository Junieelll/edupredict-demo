window.EP = window.EP || {};

EP.studentRecommendation = {
  render() {
    const { recommendations } = EP.data;
    const typeConfig = {
      Video:    { icon:'play-circle',  color:'bg-red-50 text-red-600 border-red-100',     label:'Video' },
      Article:  { icon:'document-text',  color:'bg-blue-50 text-blue-600 border-blue-100',   label:'Article' },
      Practice: { icon:'code-bracket', color:'bg-emerald-50 text-emerald-600 border-emerald-100', label:'Practice' },
    };
    const diffConfig = {
      Beginner:     'bg-emerald-50 text-emerald-700 border-emerald-100',
      Intermediate: 'bg-amber-50 text-amber-700 border-amber-100',
      Advanced:     'bg-red-50 text-red-700 border-red-100',
    };

    document.getElementById('content').innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6">
        <!-- Header -->
        <div class="flex items-start justify-between gap-4">
          <div>
            <h1 class="font-display font-semibold text-[#0F172A] text-[14px] md:text-lg">AI Recommendations</h1>
            <p class="text-[#64748B] text-xs mt-0.5">Personalized study materials based on your performance</p>
          </div>
          <div class="hidden md:flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2.5">
            ${EP.getIcon('sparkles', 'w-4 h-4 text-indigo-500')}
            <span class="text-xs font-semibold text-indigo-600">AI-Powered</span>
          </div>
        </div>

        <!-- Info banner -->
        <div class="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-5 flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
            ${EP.getIcon('bolt', 'w-5 h-5 text-indigo-600')}
          </div>
          <div>
            <p class="font-semibold text-[#0F172A] text-sm">How recommendations work</p>
            <p class="text-[#64748B] text-xs mt-1 leading-relaxed">EduPredict analyzes your quiz scores, attendance, assignment submissions, and learning patterns to surface the most relevant study materials for you right now.</p>
          </div>
        </div>

        <!-- Recommendation groups -->
        ${recommendations.map((group, gi) => {
          const colors = ['indigo','violet','sky'];
          const color = colors[gi % colors.length];
          const gradMap = { indigo:'from-indigo-500 to-indigo-700', violet:'from-violet-500 to-violet-700', sky:'from-sky-500 to-sky-700' };
          return `
          <div class="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
            <!-- Group header -->
            <div class="bg-gradient-to-r ${gradMap[color]} p-5 flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                ${EP.getIcon('book-open', 'w-4 h-4 text-white')}
              </div>
              <div>
                <h2 class="font-display font-bold text-white text-base">${group.subject}</h2>
                <p class="text-white/70 text-xs mt-0.5">${group.reason}</p>
              </div>
              <div class="ml-auto text-white/50 text-sm font-medium">${group.items.length} resources</div>
            </div>

            <!-- Items -->
            <div class="divide-y divide-[#F1F5F9]">
              ${group.items.map(item => {
                const tc = typeConfig[item.type] || typeConfig.Article;
                return `
                  <div class="p-5 flex items-start gap-4 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                    <div class="w-10 h-10 rounded-xl ${tc.color} border flex items-center justify-center flex-shrink-0">
                      ${EP.getIcon(tc.icon, 'w-5 h-5')}
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-semibold text-[#0F172A] text-sm">${item.title}</p>
                      <div class="flex flex-wrap items-center gap-2 mt-1.5">
                        <span class="text-xs text-[#64748B] flex items-center gap-1">
                          ${EP.getIcon('arrow-top-right-on-square', 'w-3 h-3')}${item.source}
                        </span>
                        <span class="text-[#D1D5DB]">·</span>
                        <span class="text-xs text-[#94A3B8] flex items-center gap-1">
                          ${EP.getIcon('clock', 'w-3 h-3')}${item.duration}
                        </span>
                      </div>
                    </div>
                    <div class="flex flex-col items-end gap-2 flex-shrink-0">
                      <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${diffConfig[item.difficulty]||'bg-gray-100 text-gray-600'}">${item.difficulty}</span>
                      <span class="text-[10px] text-[#94A3B8]">${tc.label}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="p-4 bg-[#F8FAFC] border-t border-[#F1F5F9]">
              <button class="text-sm font-semibold text-${color}-500 hover:text-${color}-600 transition-colors flex items-center gap-1.5">
                ${EP.getIcon('plus-circle', 'w-4 h-4')} Load more resources
              </button>
            </div>
          </div>
          `;
        }).join('')}

        <!-- Tip card -->
        <div class="bg-[#0D1425] rounded-2xl p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            ${EP.getIcon('light-bulb', 'w-6 h-6 text-amber-400', 'solid')}
          </div>
          <div>
            <p class="font-display font-semibold text-white text-sm">Study Tip</p>
            <p class="text-[#94A3B8] text-xs mt-1 leading-relaxed">Consistent 25-minute focused study sessions (Pomodoro technique) are more effective than long cramming sessions. Your AI assistant can help you create a personalized study schedule.</p>
          </div>
          <button onclick="navigate('chatbot')" class="flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors whitespace-nowrap">
            Ask Assistant
          </button>
        </div>
      </div>
    `;
  }
};