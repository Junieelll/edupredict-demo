window.EP = window.EP || {};

EP.studentPrediction = {
  render() {
    const { predictions } = EP.data;
    const { student } = predictions;

    document.getElementById('content').innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 class="font-display font-semibold text-[#0F172A] text-[14px] md:text-lg">My Prediction</h1>
          <p class="text-[#64748B] text-xs mt-0.5">AI-powered performance forecast based on your learning data</p>
        </div>

        <!-- Hero score + trend -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <!-- Overall score -->
          <div class="bg-[#0D1425] rounded-2xl p-6 text-center relative overflow-hidden">
            <div class="absolute inset-0">
              <div class="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
              <div class="absolute bottom-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl"></div>
            </div>
            <div class="relative">
              <p class="text-[#94A3B8] text-xs font-semibold uppercase tracking-widest mb-3">Predicted Overall</p>
              <div class="relative w-28 h-28 mx-auto mb-3">
                <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(99,102,241,0.15)" stroke-width="8"/>
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#6366F1" stroke-width="8"
                    stroke-dasharray="${2*Math.PI*42}" stroke-dashoffset="${2*Math.PI*42*(1-student.overall/100)}"
                    stroke-linecap="round"/>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="font-display font-black text-white text-2xl">${student.overall}</span>
                </div>
              </div>
              <p class="text-white font-semibold text-sm">Overall Grade</p>
              <span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full mt-2">
                ${EP.getIcon('arrow-trending-up', 'w-3 h-3')} Improving
              </span>
            </div>
          </div>

          <!-- Subject predictions -->
          <div class="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm">
            <h2 class="font-display font-semibold text-[#0F172A] text-base mb-5">Subject Breakdown</h2>
            <div class="space-y-4">
              ${student.subjects.map(s=>`
                <div class="flex items-center gap-4">
                  <div class="w-24 flex-shrink-0">
                    <p class="font-semibold text-[#0F172A] text-sm">${s.name}</p>
                    <p class="text-xs text-[#94A3B8]">${s.label}</p>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1.5">
                      <div class="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div class="h-full rounded-full ${s.current>=85?'bg-emerald-500':s.current>=75?'bg-indigo-500':'bg-amber-500'} transition-all duration-700" style="width:${s.current}%"></div>
                      </div>
                      <span class="text-xs font-bold text-[#0F172A] w-8 text-right">${s.current}%</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div class="h-full rounded-full bg-indigo-300 transition-all duration-700" style="width:${s.predicted}%;opacity:0.6"></div>
                      </div>
                      <span class="text-xs font-bold text-indigo-500 w-8 text-right">${s.predicted}%</span>
                    </div>
                  </div>
                  ${riskBadge(s.risk)}
                </div>
              `).join('')}
              <div class="flex items-center gap-4 pt-2 border-t border-[#F1F5F9] text-xs text-[#94A3B8]">
                <div class="flex items-center gap-1.5"><span class="w-3 h-2 rounded bg-indigo-500 inline-block"></span>Current</div>
                <div class="flex items-center gap-1.5"><span class="w-3 h-2 rounded bg-indigo-300 opacity-60 inline-block"></span>Predicted (next term)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trend Chart -->
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="font-display font-semibold text-[#0F172A] text-base">Grade Trend & Forecast</h2>
              <p class="text-xs text-[#94A3B8] mt-0.5">Historical performance with AI-predicted future grades</p>
            </div>
            <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">Last 7 months</span>
          </div>
          <div class="h-64">
            <canvas id="predictionChart"></canvas>
          </div>
        </div>

        <!-- Insights -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${[
            { icon:'bolt', color:'indigo', title:'Strength',   text:'You perform best in CS101 with consistent scores above 85%. Keep up the momentum in the final weeks.' },
            { icon:'exclamation-triangle', color:'amber', title:'Focus Area', text:'CS150 is your weakest subject this term. Consider attending extra lab sessions and seeking help early.' },
            { icon:'flag', color:'emerald', title:'Goal',    text:'At your current pace, you\'re on track to finish the semester with an 86+ average. Aim for 90+ with one strong final exam.' },
          ].map(c=>`
            <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
              <div class="w-9 h-9 rounded-xl bg-${c.color}-50 border border-${c.color}-100 flex items-center justify-center mb-3">
                ${EP.getIcon(c.icon, `w-4 h-4 text-${c.color}-600`)}
              </div>
              <p class="font-display font-semibold text-[#0F172A] text-sm mb-1.5">${c.title}</p>
              <p class="text-xs text-[#64748B] leading-relaxed">${c.text}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    setTimeout(() => {
      this.initChart();
    }, 30);
  },

  initChart() {
    const { predictions } = EP.data;
    const { student } = predictions;
    const ctx = document.getElementById('predictionChart');
    if (!ctx) return;

    const allLabels = [...student.labels, ...student.futureLabels];
    const historical = [...student.history, null, null];
    const forecast = [...Array(student.history.length).fill(null), student.history[student.history.length-1], ...student.future];

    EP.charts.prediction = new Chart(ctx, {
      type: 'line',
      data: {
        labels: allLabels,
        datasets: [
          {
            label: 'Actual Grade',
            data: historical,
            borderColor: '#6366F1',
            backgroundColor: 'rgba(99,102,241,0.08)',
            borderWidth: 2.5,
            pointBackgroundColor: '#6366F1',
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.4,
            spanGaps: false,
          },
          {
            label: 'Predicted',
            data: forecast,
            borderColor: '#6366F1',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [6, 4],
            pointBackgroundColor: '#fff',
            pointBorderColor: '#6366F1',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: false,
            tension: 0.4,
            spanGaps: false,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: true, position: 'top', labels: { boxWidth: 12, boxHeight: 12, borderRadius: 4, font: { size: 11 }, color: '#64748B', padding: 16 } },
          tooltip: {
            backgroundColor: '#0D1425', titleColor: '#E2E8F0', bodyColor: '#94A3B8',
            borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, padding: 10, cornerRadius: 12,
          }
        },
        scales: {
          x: { grid: { display: false }, border: { display: false }, ticks: { color: '#94A3B8', font: { size: 11 } } },
          y: {
            min: 60, max: 100,
            grid: { color: 'rgba(0,0,0,0.04)' },
            border: { display: false },
            ticks: { color: '#94A3B8', font: { size: 11 }, stepSize: 10, callback: v => v + '%' }
          }
        }
      }
    });
  }
};