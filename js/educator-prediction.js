window.EP = window.EP || {};

EP.educatorPrediction = {
  render() {
    const { predictions, students, classes } = EP.data;
    const { riskDist, modelAccuracy } = predictions;

    document.getElementById('content').innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between gap-4">
          <div>
            <h1 class="font-display font-semibold text-[#0F172A] text-sm md:text-lg">Predictions & Analytics</h1>
            <p class="text-[#64748B] text-xs mt-0.5">AI-powered insights across all ${classes.length} active courses</p>
          </div>
          <div class="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2.5">
            ${EP.getIcon('cpu-chip', 'w-4 h-4 text-indigo-500', 'solid')}
            <span class="text-xs font-semibold text-indigo-600">Model Accuracy: ${modelAccuracy}%</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Risk Distribution Summary -->
          <div class="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h2 class="font-display font-semibold text-[#0F172A] text-base mb-5 text-center">Dropout Risk Distribution</h2>
            <div class="relative w-40 h-40 mx-auto mb-6">
              <svg viewBox="0 0 36 36" class="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(16,185,129,0.1)" stroke-width="3"></circle>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#10B981" stroke-width="3" stroke-dasharray="${(riskDist.Low/students.length)*100} 100" stroke-linecap="round"></circle>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#F59E0B" stroke-width="3" stroke-dasharray="${(riskDist.Medium/students.length)*100} 100" stroke-dashoffset="-${(riskDist.Low/students.length)*100}" stroke-linecap="round"></circle>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="${(riskDist.High/students.length)*100} 100" stroke-dashoffset="-${((riskDist.Low+riskDist.Medium)/students.length)*100}" stroke-linecap="round"></circle>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-2xl font-display font-semibold text-[#0F172A]">${students.length}</span>
                <span class="text-[10px] font-bold text-[#94A3B8] uppercase">Students</span>
              </div>
            </div>
            <div class="space-y-3">
              ${[
                { label: 'Low Risk', value: riskDist.Low, color: 'emerald' },
                { label: 'Moderate Risk', value: riskDist.Medium, color: 'amber' },
                { label: 'High Risk', value: riskDist.High, color: 'red' },
              ].map(r => `
                <div class="flex items-center justify-between p-2 rounded-lg bg-${r.color}-50/50">
                   <div class="flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full bg-${r.color}-500"></span>
                      <span class="text-xs font-semibold text-[#475569]">${r.label}</span>
                   </div>
                   <span class="text-xs font-bold text-${r.color}-600">${r.value} Students</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Predictions Trend Chart -->
          <div class="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
             <div class="flex items-center justify-between mb-6">
                <div>
                  <h2 class="font-display font-semibold text-[#0F172A] text-base">Class Performance Forecasts</h2>
                  <p class="text-xs text-[#94A3B8] mt-0.5">Predicted grade averages based on current trends</p>
                </div>
                <div class="flex gap-2">
                   <span class="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                      ${EP.getIcon('arrow-trending-up', 'w-3 h-3')} High Confidence
                   </span>
                </div>
             </div>
             <div class="h-64">
                <canvas id="educatorPredictionChart"></canvas>
             </div>
          </div>
        </div>

        <!-- AI Insights -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div class="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl p-6 text-white relative overflow-hidden">
              <div class="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div class="relative z-10 flex items-start gap-4">
                 <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                    ${EP.getIcon('chat-bubble-bottom-center-text', 'w-6 h-6 text-white', 'solid')}
                 </div>
                 <div>
                    <h3 class="font-display font-semibold text-base mb-1">Weekly Intelligence Summary</h3>
                    <p class="text-indigo-100 text-xs leading-relaxed opacity-90">Predictions indicate a potential 5% dip in SAM101 midterm scores. We recommend reviewing "Linux Server Config" before the quiz.</p>
                    <button class="mt-4 px-4 py-2 bg-white text-indigo-600 text-xs font-semibold rounded-xl hover:bg-indigo-50 transition-colors">
                       View Full Analysis
                    </button>
                 </div>
              </div>
           </div>
           
           <div class="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                 ${EP.getIcon('exclamation-circle', 'w-6 h-6 text-amber-500', 'solid')}
              </div>
              <div>
                 <h3 class="font-display font-semibold text-[#0F172A] text-base mb-1">Attention Required</h3>
                 <p class="text-[#64748B] text-xs leading-relaxed">3 students in CAP102 have shown irregular attendance in the last 14 days. This typically correlates with a 15% drop in assignment scores.</p>
                 <div class="mt-4 flex gap-2">
                    <button class="px-4 py-2 border border-[#E2E8F0] text-[#475569] text-xs font-semibold rounded-xl hover:bg-[#F8FAFC] transition-colors">
                       Contact Students
                    </button>
                    <button class="px-4 py-2 bg-indigo-500 text-white text-xs font-semibold rounded-xl hover:bg-indigo-600 transition-colors">
                       Manage Alert
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      this.initChart();
    }, 30);
  },

  initChart() {
    const ctx = document.getElementById('educatorPredictionChart');
    if (!ctx) return;
    const { classAverage } = EP.data.predictions;

    EP.charts.educatorPrediction = new Chart(ctx, {
      type: 'line',
      data: {
        labels: classAverage.PRC102.labels,
        datasets: [
          {
            label: 'PRC102 Practicum 2',
            data: classAverage.PRC102.scores,
            borderColor: '#6366F1',
            backgroundColor: 'rgba(99,102,241,0.08)',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#6366F1',
          },
          {
            label: 'CAP102 Capstone 2',
            data: classAverage.CAP102.scores,
            borderColor: '#8B5CF6',
            backgroundColor: 'rgba(139,92,246,0.08)',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#8B5CF6',
          },
          {
            label: 'SAM101 Systems Admin',
            data: classAverage.SAM101.scores,
            borderColor: '#0EA5E9',
            backgroundColor: 'rgba(14,165,233,0.08)',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#0EA5E9',
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top', labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true, font: { size: 10 } } },
          tooltip: { backgroundColor:'#0D1425', titleColor:'#E2E8F0', bodyColor:'#94A3B8', borderColor:'rgba(255,255,255,0.1)', borderWidth:1, cornerRadius:12, padding:10 }
        },
        scales: {
          x: { grid:{ display:false }, border:{ display:false }, ticks:{ color:'#94A3B8', font:{ size:11 } } },
          y: { min:60, max:100, grid:{ color:'rgba(0,0,0,0.04)' }, border:{ display:false }, ticks:{ color:'#94A3B8', font:{ size:11 }, stepSize:10, callback:v=>v+'%' } }
        }
      }
    });
  }
};
