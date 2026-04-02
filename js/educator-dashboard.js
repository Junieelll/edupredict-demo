window.EP = window.EP || {};

EP.educatorDashboard = {
  render() {
    const { students, classes, classworks, predictions } = EP.data;
    const highRisk = students.filter(s=>s.dropoutRisk==='High');
    const totalClassworks = classworks.length;
    const avgScore = Math.round(students.reduce((s,st)=>s+st.gpa,0)/students.length*25);

    document.getElementById('content').innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6">

        <!-- Welcome -->
        <div class="flex items-center justify-between gap-4">
          <div>
            <h1 class="font-display font-semibold text-[#0F172A] text-[14px] md:text-lg">Educator Dashboard</h1>
            <p class="text-[#64748B] text-xs mt-0.5">2nd Semester, AY 2025-2026 · ${new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</p>
          </div>
        </div>

        <!-- Stat cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${[
            { label:'Total Students', value:students.length, sub:'Across all classes', icon:'users',          color:'indigo', delta:'+3 this sem' },
            { label:'Active Classes', value:classes.length,  sub:'Current semester',   icon:'book-open',      color:'violet', delta:null },
            { label:'At-Risk Students',value:highRisk.length,sub:'Need intervention',  icon:'exclamation-triangle', color:'red',    delta:'2 critical' },
            { label:'Class Avg Score', value:avgScore+'%',   sub:'Across all subjects',icon:'chart-bar',    color:'emerald',delta:'↑ +4% vs last' },
          ].map(s=>`
            <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm hover-lift relative overflow-hidden group">
              <div class="absolute -right-2 -top-2 text-${s.color}-500 opacity-[0.05] group-hover:opacity-10 transition-all duration-300">
                ${EP.getIcon(s.icon, 'w-16 h-16', 'solid')}
              </div>
              <div class="relative">
                <div class="flex items-center justify-between mb-4">
                  <div class="w-10 h-10 rounded-xl bg-${s.color}-50 flex items-center justify-center text-${s.color}-500 shadow-sm border border-${s.color}-100/50">
                    ${EP.getIcon(s.icon, 'w-5 h-5', 'solid')}
                  </div>
                  ${s.delta?`<span class="text-[10px] font-bold text-${s.color==='red'?'red':'emerald'}-600 bg-${s.color==='red'?'red':'emerald'}-50 px-2.5 py-1 rounded-lg border border-${s.color==='red'?'red':'emerald'}-100/50">${s.delta}</span>`:''}
                </div>
                <p class="font-display font-bold text-[#0F172A] text-2xl tracking-tight">${s.value}</p>
                <div class="flex flex-col mt-1">
                  <p class="text-xs font-semibold text-[#475569]">${s.label}</p>
                  <p class="text-[10px] text-[#94A3B8] mt-0.5">${s.sub}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Main grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- Chart: Class Average -->
          <div class="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div class="flex items-center justify-between mb-5">
              <div>
                <h2 class="font-display font-semibold text-[#0F172A] text-base">Class Performance</h2>
                <p class="text-xs text-[#94A3B8] mt-0.5">Average scores over the semester</p>
              </div>
              <select id="class-selector" onchange="EP.educatorDashboard.updateChart()" class="text-xs font-semibold text-[#475569] border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20">
                <option value="PRC102">PRC102</option>
                <option value="CAP102">CAP102</option>
                <option value="SAM101">SAM101</option>
              </select>
            </div>
            <div class="h-56">
              <canvas id="classChart"></canvas>
            </div>
          </div>

          <!-- Recent Classwork -->
          <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-display font-semibold text-[#0F172A] text-sm">Recent Classwork</h2>
              <button onclick="navigate('classwork')" class="text-xs text-indigo-500 font-medium hover:text-indigo-600 transition-colors">View all</button>
            </div>
            <div class="space-y-3">
              ${classworks.slice(0,5).map(cw=>{
                const cls = classes.find(c=>c.id===cw.classId);
                const pct = Math.round(cw.submissions/cw.total*100);
                return `
                  <div class="group">
                    <div class="flex items-start gap-2.5">
                      <div class="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        ${typeIcon(cw.type, 'w-4 h-4')}
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-xs font-semibold text-[#0F172A] truncate">${cw.title}</p>
                        <p class="text-[10px] text-[#94A3B8]">${cls?.code||''} · ${cw.submissions}/${cw.total} submitted</p>
                        <div class="mt-1.5 h-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                          <div class="h-full rounded-full bg-indigo-400 transition-all" style="width:${pct}%"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Bottom grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <!-- At-Risk Students -->
          <div class="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
              <h2 class="font-display font-semibold text-[#0F172A] text-base">Students Needing Attention</h2>
              <button onclick="navigate('students')" class="text-xs text-indigo-500 font-medium hover:text-indigo-600 transition-colors">View all</button>
            </div>
            <div class="divide-y divide-[#F8FAFC]">
              ${students.filter(s=>s.dropoutRisk!=='Low').slice(0,5).map(s=>`
                <div class="px-5 py-3.5 flex items-center gap-3 hover:bg-[#F8FAFC] transition-colors">
                  ${avatarEl(s.name)}
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-[#0F172A] truncate">${s.name}</p>
                    <p class="text-xs text-[#94A3B8]">GPA: ${s.gpa} · Attendance: ${s.attendance}%</p>
                  </div>
                  ${riskBadge(s.dropoutRisk)}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- My Classes summary -->
          <div class="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
              <h2 class="font-display font-semibold text-[#0F172A] text-base">My Classes</h2>
              <button onclick="navigate('classes')" class="text-xs text-indigo-500 font-medium hover:text-indigo-600 transition-colors">Manage</button>
            </div>
            <div class="divide-y divide-[#F8FAFC]">
              ${classes.map(cls=>`
                <div onclick="navigate('classes')" class="px-5 py-3.5 flex items-center gap-3 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                  <div class="w-9 h-9 rounded-xl bg-gradient-to-br ${classGradient(cls.color)} flex items-center justify-center flex-shrink-0">
                    <span class="text-white font-bold text-xs">${cls.code.replace(/\D/g,'')}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-[#0F172A] truncate">${cls.name}</p>
                    <p class="text-xs text-[#94A3B8]">${cls.students} students · ${cls.schedule}</p>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <p class="text-sm font-bold text-[#0F172A]">${cls.avgScore}%</p>
                    <p class="text-[10px] text-[#94A3B8]">avg score</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      this.initChart('PRC102');
    }, 30);
  },

  initChart(code) {
    const data = EP.data.predictions.classAverage[code];
    if (!data) return;
    const ctx = document.getElementById('classChart');
    if (!ctx) return;

    if (EP.charts.classChart) EP.charts.classChart.destroy();

    EP.charts.classChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Class Average',
          data: data.scores,
          borderColor: '#6366F1',
          backgroundColor: 'rgba(99,102,241,0.08)',
          fill: true,
          tension: 0.4,
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: '#6366F1',
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor:'#0D1425', titleColor:'#E2E8F0', bodyColor:'#94A3B8', borderColor:'rgba(255,255,255,0.1)', borderWidth:1, cornerRadius:12, padding:10 }
        },
        scales: {
          x: { grid:{ display:false }, border:{ display:false }, ticks:{ color:'#94A3B8', font:{ size:11 } } },
          y: { min:60, max:100, grid:{ color:'rgba(0,0,0,0.04)' }, border:{ display:false }, ticks:{ color:'#94A3B8', font:{ size:11 }, stepSize:10, callback:v=>v+'%' } }
        }
      }
    });
  },

  updateChart() {
    const sel = document.getElementById('class-selector');
    if (sel) this.initChart(sel.value);
  }
};