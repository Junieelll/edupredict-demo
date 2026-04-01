window.EP = window.EP || {};

// State
EP.currentRole = 'student';
EP.currentPage = 'dashboard';
EP.selectedClassId = null;
EP.charts = {};
EP.calYear = new Date().getFullYear();
EP.calMonth = new Date().getMonth();

// Nav configs
const navConfigs = {
  student: [
    { id:'dashboard',      label:'Dashboard',       icon:'squares-2x2' },
    { id:'classes',        label:'My Classes',       icon:'book-open' },
    { id:'recommendation', label:'Recommendations',  icon:'sparkles' },
    { id:'prediction',     label:'My Prediction',    icon:'arrow-trending-up' },
    { id:'chatbot',        label:'Study Assistant',  icon:'chat-bubble-left-right' },
    { id:'classwork',      label:'Classwork',        icon:'clipboard-document-list' },
    { id:'settings',       label:'Settings',         icon:'cog-6-tooth' },
  ],
  educator: [
    { id:'dashboard',  label:'Dashboard',   icon:'squares-2x2' },
    { id:'classes',    label:'Classes',     icon:'book-open' },
    { id:'students',   label:'Students',    icon:'users' },
    { id:'prediction', label:'Predictions', icon:'arrow-trending-up' },
    { id:'classwork',  label:'Classwork',   icon:'clipboard-document-list' },
    { id:'settings',   label:'Settings',    icon:'cog-6-tooth' },
  ],
};

const pageMap = {
  student_dashboard:      () => EP.studentDashboard?.render(),
  student_classes:        () => EP.studentClasses?.render(),
  student_recommendation: () => EP.studentRecommendation?.render(),
  student_prediction:     () => EP.studentPrediction?.render(),
  student_chatbot:        () => EP.studentChatbot?.render(),
  student_classwork:      () => EP.studentClasswork?.render(),
  student_settings:       () => EP.studentSettings?.render(),
  educator_dashboard:     () => EP.educatorDashboard?.render(),
  educator_classes:       () => EP.educatorClasses?.render(),
  educator_manage:        () => EP.educatorClassDetails?.render(),
  educator_students:      () => EP.educatorStudents?.render(),
  educator_prediction:    () => EP.educatorPrediction?.render(),
  educator_classwork:     () => EP.educatorClasswork?.render(),
  educator_settings:      () => EP.educatorSettings?.render(),
  student_class_details:  () => EP.studentClassDetails?.render(),
  educator_class_details: () => EP.educatorClassDetails?.render(),
};

EP.getIcon = (name, className='', type='outline') => {
  const iconName = type === 'outline' ? name : `${name}-${type}`;
  const wMatch = className.match(/w-(\d+(\.\d+)?)/);
  const hMatch = className.match(/h-(\d+(\.\d+)?)/);
  const sizeMap = { '1': 4, '1.5': 6, '2': 8, '2.5': 10, '3': 12, '3.5': 14, '4': 16, '5': 20, '6': 24, '7': 28, '8': 32, '10': 40, '12': 48 };
  
  const width = wMatch ? sizeMap[wMatch[1]] || wMatch[1] * 4 : 24;
  const height = hMatch ? sizeMap[hMatch[1]] || hMatch[1] * 4 : 24;
  const cleanClass = className.replace(/\b[wh]-(\d+(\.\d+)?)\b/g, '').trim();

  return `<iconify-icon icon="heroicons:${iconName}" class="${cleanClass}" width="${width}" height="${height}"></iconify-icon>`;
};

function setRole(role, p) {
  EP.currentRole = role;
  EP.currentPage = p || 'dashboard';
  localStorage.setItem('ep_role', role);
  localStorage.setItem('ep_page', EP.currentPage);

  const sBtn = document.getElementById('role-student');
  const eBtn = document.getElementById('role-educator');
  const label = document.getElementById('user-role-label');

  if (role === 'student') {
    if (sBtn) sBtn.className = 'flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all duration-200 bg-indigo-500 text-white shadow-sm';
    if (eBtn) eBtn.className = 'flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all duration-200 text-[#64748B] hover:text-[#94A3B8]';
    if (label) label.textContent = 'Student Account';
  } else {
    if (eBtn) eBtn.className = 'flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all duration-200 bg-indigo-500 text-white shadow-sm';
    if (sBtn) sBtn.className = 'flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all duration-200 text-[#64748B] hover:text-[#94A3B8]';
    if (label) label.textContent = 'Educator Account';
  }

  // Smooth transition for role change
  const content = document.getElementById('content');
  if (content) {
    content.style.opacity = '0';
    content.style.transform = 'translateY(10px)';
    setTimeout(() => {
      renderNav();
      navigate(EP.currentPage, true);
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
    }, 200);
  } else {
    renderNav();
    navigate(EP.currentPage, true);
  }
}

function renderNav() {
  const nav = document.getElementById('nav');
  const items = navConfigs[EP.currentRole];
  nav.innerHTML = items.map(item => `
    <button id="nav-${item.id}" onclick="navigate('${item.id}')"
      class="nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#64748B] hover:text-[#94A3B8] hover:bg-white/5 transition-all group">
      ${EP.getIcon(item.icon, 'w-4 h-4 flex-shrink-0')}
      <span>${item.label}</span>
    </button>
  `).join('');
  updateNavActive();
}

function updateNavActive() {
  const items = navConfigs[EP.currentRole];
  items.forEach(item => {
    const btn = document.getElementById(`nav-${item.id}`);
    if (!btn) return;
    const icon = btn.querySelector('iconify-icon');
    if (item.id === EP.currentPage) {
      btn.className = 'nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-indigo-500/15 text-white active-nav group';
      if (icon) {
        icon.setAttribute('icon', `heroicons:${item.icon}-solid`);
        icon.style.color = '#818CF8';
      }
    } else {
      btn.className = 'nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#64748B] hover:text-[#94A3B8] hover:bg-white/5 transition-all group';
      if (icon) {
        icon.setAttribute('icon', `heroicons:${item.icon}`);
        icon.style.color = '';
      }
    }
  });
}

function navigate(page, skipSave = false) {
  EP.currentPage = page;
  if (!skipSave) localStorage.setItem('ep_page', page);

  // Destroy charts
  Object.values(EP.charts).forEach(c => { try { c.destroy(); } catch(e) {} });
  EP.charts = {};

  // Breadcrumb
  const navItem = navConfigs[EP.currentRole].find(n => n.id === page) || { label: 'Class Management' };
  const bc = document.getElementById('page-breadcrumb');
  if (bc && navItem) bc.textContent = navItem.label;

  closeSidebar();
  updateNavActive();

  // Render with smooth transition
  const content = document.getElementById('content');
  const key = `${EP.currentRole}_${page}`;
  
  if (content && pageMap[key]) {
    content.style.opacity = '0';
    content.style.transform = 'translateY(10px)';
    setTimeout(() => {
      pageMap[key]();
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  } else if (pageMap[key]) {
    pageMap[key]();
  }
}

function openSidebar() {
  document.getElementById('sidebar').classList.remove('-translate-x-full');
  document.getElementById('sidebar-overlay').classList.remove('hidden');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.add('-translate-x-full');
  document.getElementById('sidebar-overlay').classList.add('hidden');
}

// ─── Shared Utilities ───────────────────────────────────────────────


function riskBadge(risk) {
  const m = { Low:'bg-emerald-50 text-emerald-700 border border-emerald-100', Medium:'bg-amber-50 text-amber-700 border border-amber-100', High:'bg-red-50 text-red-700 border border-red-100' };
  return `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${m[risk]||'bg-gray-100 text-gray-600'}">${risk}</span>`;
}

function statusBadge(status) {
  const m = { Submitted:'bg-emerald-50 text-emerald-700 border border-emerald-100', Pending:'bg-amber-50 text-amber-700 border border-amber-100', Overdue:'bg-red-50 text-red-700 border border-red-100', Graded:'bg-indigo-50 text-indigo-700 border border-indigo-100' };
  return `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${m[status]||'bg-gray-100 text-gray-600'}">${status}</span>`;
}

function avatarEl(name, extraClass='w-9 h-9 text-xs') {
  const initials = name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
  const colors = ['bg-indigo-500','bg-violet-500','bg-emerald-500','bg-amber-500','bg-sky-500','bg-rose-500','bg-teal-500'];
  const ci = name.charCodeAt(0) % colors.length;
  return `<div class="rounded-full flex items-center justify-center font-semibold text-white ${colors[ci]} ${extraClass} flex-shrink-0">${initials}</div>`;
}

function typeIcon(type, className='w-5 h-5') {
  const name = { Assignment:'clipboard-document-list', Quiz:'pencil-square', Project:'wrench-screwdriver', Laboratory:'beaker', Exam:'document-text' }[type] || 'map-pin';
  return EP.getIcon(name, className);
}

function classGradient(color) {
  return { indigo:'from-indigo-400 to-indigo-700', violet:'from-violet-400 to-violet-700', sky:'from-sky-400 to-sky-700', emerald:'from-emerald-400 to-emerald-700', amber:'from-amber-400 to-amber-700' }[color] || 'from-indigo-400 to-indigo-700';
}

function showModal(html) {
  const mc = document.getElementById('modal-container');
  if (mc) {
    mc.innerHTML = `
      <div class="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4" onclick="if(event.target===this)closeModal()">
        <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg animate-[fadeUp_0.15s_ease-out] overflow-hidden border border-white/20">
          <div class="max-h-[90vh] overflow-y-auto p-1.5 custom-scrollbar">
            <div class="bg-white rounded-[1.6rem] overflow-hidden">
               ${html}
            </div>
          </div>
        </div>
      </div>`;
  }
}

function closeModal() {
  const mc = document.getElementById('modal-container');
  if (mc) mc.innerHTML = '';
}

function showPanel(html) {
  const container = document.getElementById('modal-container');
  if (!container) return;
  
  container.innerHTML = `
    <div id="panel-root" class="fixed inset-0 z-[60] overflow-hidden">
      <!-- Overlay -->
      <div id="panel-overlay" class="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out_forwards]" onclick="closePanel()"></div>
      <!-- Panel Body -->
      <div id="panel-body" class="absolute inset-y-0 right-0 bg-white w-full max-w-lg shadow-2xl border-l border-[#E2E8F0] animate-[slideInRight_0.3s_cubic-bezier(0.4,0,0.2,1)_forwards] flex flex-col">
        <div class="flex-1 overflow-y-auto custom-scrollbar">
          ${html}
        </div>
      </div>
    </div>
  `;
}

function closePanel() {
  const overlay = document.getElementById('panel-overlay');
  const panel = document.getElementById('panel-body');
  
  if (panel && overlay) {
    panel.style.animation = 'slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    overlay.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => {
      const mc = document.getElementById('modal-container');
      if (mc) mc.innerHTML = '';
    }, 300);
  } else {
    const mc = document.getElementById('modal-container');
    if (mc) mc.innerHTML = '';
  }
}

function getCalendarHTML(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

  return `
    <div class="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-display font-semibold text-[#0F172A] text-sm">${monthName} ${year}</h3>
        <div class="flex gap-1">
          <button onclick="changeMonth(-1)" class="p-1.5 rounded-lg hover:bg-gray-50 text-[#94A3B8] transition-colors border border-transparent hover:border-[#E2E8F0]">
            ${EP.getIcon('chevron-left', 'w-3.5 h-3.5')}
          </button>
          <button onclick="changeMonth(1)" class="p-1.5 rounded-lg hover:bg-gray-50 text-[#94A3B8] transition-colors border border-transparent hover:border-[#E2E8F0]">
            ${EP.getIcon('chevron-right', 'w-3.5 h-3.5')}
          </button>
        </div>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center mb-2">
        ${['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => `<span class="text-[10px] font-bold text-[#94A3B8] uppercase">${d}</span>`).join('')}
      </div>
      <div class="grid grid-cols-7 gap-1">
        ${Array(firstDay).fill(0).map(() => `<div class="h-8"></div>`).join('')}
        ${Array(daysInMonth).fill(0).map((_, i) => {
          const day = i + 1;
          const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
          const hasEvent = [5, 12, 18, 24].includes(day); // Mock events
          return `
            <div class="h-8 flex flex-col items-center justify-center relative group cursor-pointer">
              <span class="text-xs font-medium ${isToday ? 'text-white bg-indigo-500 w-6 h-6 rounded-lg flex items-center justify-center shadow-sm shadow-indigo-500/20' : 'text-[#475569] group-hover:text-indigo-600'}">${day}</span>
              ${hasEvent ? `<span class="absolute bottom-1 w-1 h-1 bg-indigo-400 rounded-full"></span>` : ''}
              ${isToday ? '' : `<div class="absolute inset-0 bg-indigo-50 rounded-lg opacity-0 group-hover:opacity-100 -z-10 scale-90 group-hover:scale-100 transition-all"></div>`}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderCalendar(year, month) {
  const container = document.getElementById('cal-container');
  if (container) container.innerHTML = getCalendarHTML(year, month);
}

function changeMonth(delta) {
  EP.calMonth += delta;
  if (EP.calMonth > 11) { EP.calMonth = 0; EP.calYear++; }
  if (EP.calMonth < 0) { EP.calMonth = 11; EP.calYear--; }
  renderCalendar(EP.calYear, EP.calMonth);
}

function toggleNotifications() {
  const d = document.getElementById('dropdown-notifications');
  const p = document.getElementById('dropdown-profile');
  if (p) p.classList.add('hidden');
  if (d) {
     d.classList.toggle('hidden');
     if (!d.classList.contains('hidden')) renderNotificationsList();
  }
}

function toggleProfile() {
  const p = document.getElementById('dropdown-profile');
  const d = document.getElementById('dropdown-notifications');
  if (d) d.classList.add('hidden');
  if (p) p.classList.toggle('hidden');
}

function renderNotificationsList() {
  const list = document.getElementById('notification-list');
  if (!list) return;
  const items = [
    { title: 'New Grade Posted', time: '2h ago', text: 'Prof. Vasquez graded Binary Trees homework.', icon: 'document-check', color: 'indigo' },
    { title: 'Class Reminder', time: '5h ago', text: 'CS150 Lab session starts in 1 hour.', icon: 'clock', color: 'amber' },
    { title: 'AI Prediction Update', time: '1d ago', text: 'Your predicted GPA increased to 3.52!', icon: 'sparkles', color: 'violet' }
  ];
  list.innerHTML = items.map(n => `
    <div class="px-4 py-3 hover:bg-[#F8FAFC] transition-colors cursor-pointer group">
      <div class="flex gap-3">
        <div class="w-8 h-8 rounded-lg bg-${n.color}-50 flex items-center justify-center text-${n.color}-500 flex-shrink-0 mt-0.5">
          ${EP.getIcon(n.icon, 'w-4 h-4', 'solid')}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-0.5">
            <p class="text-xs font-bold text-[#0F172A]">${n.title}</p>
            <span class="text-[10px] text-[#94A3B8]">${n.time}</span>
          </div>
          <p class="text-[10px] text-[#64748B] leading-relaxed line-clamp-2">${n.text}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── Interactive Actions ──────────────────────────────────────────

EP.notify = (msg, type='info') => {
  const container = document.getElementById('toast-container');
  if(!container) return;
  const colors = { success:'bg-emerald-500', error:'bg-rose-500', info:'bg-indigo-500', warning:'bg-amber-500' };
  const icons  = { success:'check-circle', error:'exclamation-circle', info:'information-circle', warning:'exclamation-triangle' };
  
  const el = document.createElement('div');
  el.className = `pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white shadow-2xl animate-[fadeUp_0.3s_ease] ${colors[type]||colors.info}`;
  el.innerHTML = `
    ${EP.getIcon(icons[type]||icons.info, 'w-5 h-5 text-white', 'solid')}
    <p class="text-[10px] font-black uppercase tracking-wider italic">${msg}</p>
  `;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('opacity-0', '-translate-y-2');
    el.style.transition = 'all 0.3s ease';
    setTimeout(() => el.remove(), 300);
  }, 3500);
};

EP.actions = {
  viewClassworkDetails(id) {
    const cw = EP.data.classworks.find(c => c.id === id);
    if (!cw) return EP.notify('Assignment not found', 'error');
    const cls = EP.data.classes.find(c => c.id === cw.classId);
    const due = new Date(cw.dueDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    
    showPanel(`
      <div class="p-0">
        <div class="p-8 bg-white border-b border-[#F1F5F9] relative overflow-hidden">
          <div class="absolute -right-12 -top-12 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
          <div class="relative">
            <div class="flex items-center gap-2 mb-4">
              <span class="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-100">${cls?.code || 'CS'}</span>
              <span class="w-1 h-1 rounded-full bg-[#CBD5E1]"></span>
              <span class="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">${cw.type}</span>
            </div>
            <h3 class="font-display font-semibold text-[#0F172A] text-base mb-2">${cw.title}</h3>
            <div class="flex items-center gap-2 text-xs text-[#64748B]">
               ${EP.getIcon('calendar', 'w-4 h-4')}
               <span>Due ${due}</span>
            </div>
          </div>
        </div>

        <div class="p-8 space-y-5 pt-0 pb-5">
          <!-- Description -->
          <div>
            <h4 class="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-4 ml-1">Instructions</h4>
            <div class="text-[#475569] text-sm leading-relaxed space-y-4">
              <p>Please complete this assignment based on the latest lecture materials. Ensure your solution follows the provided standard guidelines and coding style.</p>
              <ul class="list-disc list-inside space-y-2 opacity-80 pl-2">
                <li>Submit your solution in a single PDF or ZIP file.</li>
                <li>Include comments explaining your implementation logic.</li>
                <li>Cite any external resources or libraries used.</li>
              </ul>
            </div>
          </div>

          <!-- Attachments -->
          <div>
            <h4 class="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-4 ml-1">Materials</h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:border-indigo-200 hover:bg-white transition-all cursor-pointer group">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                    ${EP.getIcon('document-text', 'w-5 h-5', 'solid')}
                  </div>
                  <div>
                    <p class="text-xs font-bold text-[#0F172A]">ProblemSet_Instruction.pdf</p>
                    <p class="text-[10px] text-[#94A3B8]">1.2 MB · PDF Document</p>
                  </div>
                </div>
                ${EP.getIcon('arrow-down-tray', 'w-4 h-4 text-[#CBD5E1] group-hover:text-indigo-500')}
              </div>
            </div>
          </div>

          <!-- Submission / Score -->
          <div class="pt-4">
            ${cw.status === 'Graded' ? `
              <div class="bg-emerald-50 rounded-2xl border border-emerald-100 p-6 flex items-center justify-between">
                <div>
                  <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Final Score</p>
                  <p class="text-xl font-display font-black text-emerald-700">${cw.score}<span class="text-emerald-500/50 text-xl">/${cw.maxScore}</span></p>
                </div>
                <div class="text-emerald-500">
                  ${EP.getIcon('check-badge', 'w-12 h-12', 'solid')}
                </div>
              </div>
            ` : `
              <div class="bg-[#F8FAFC] rounded-2xl border-2 border-dashed border-[#E2E8F0] p-8 text-center group cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all active:scale-[0.98]">
                <div class="w-12 h-12 rounded-full bg-white shadow-sm border border-[#E2E8F0] flex items-center justify-center text-indigo-500 mb-4 mx-auto group-hover:scale-110 transition-transform">
                  ${EP.getIcon('cloud-arrow-up', 'w-6 h-6')}
                </div>
                <p class="text-xs font-bold text-[#475569] mb-1">Click to upload or drag & drop</p>
                <p class="text-[10px] text-[#94A3B8]">Maximum file size: 25MB (PDF, ZIP, DOCX)</p>
              </div>
            `}
          </div>
        </div>

        <div class="p-6 py-5 bg-[#F8FAFC] border-t border-[#F1F5F9] flex gap-3">
          <button onclick="closePanel()" class="flex-1 py-4 bg-white border border-[#E2E8F0] hover:bg-gray-50 text-[#475569] font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-95">Close</button>
          ${cw.status !== 'Graded' ? `
             <button onclick="EP.notify('Submission received!', 'success'); closePanel();" class="flex-[2] py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95">Complete Submission</button>
          ` : ''}
        </div>
      </div>
    `);
  },
  
  saveSettings() {
    EP.notify('Changes saved successfully', 'success');
  },

  showFilterOptions(title='Data') {
    showModal(`
      <div class="p-8">
        <h3 class="font-display font-bold text-[#0F172A] text-xl mb-2">Filter ${title}</h3>
        <p class="text-[#64748B] text-sm mb-8 leading-relaxed italic">Refine the view based on your specific criteria.</p>
        <div class="space-y-6 mb-8">
          <div>
            <label class="block text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-2.5 ml-1">Sort By</label>
            <div class="grid grid-cols-2 gap-2">
              <button class="py-2.5 px-4 bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold rounded-xl transition-all">Name (A-Z)</button>
              <button class="py-2.5 px-4 bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] text-xs font-bold rounded-xl hover:bg-white transition-all">Latest Activity</button>
            </div>
          </div>
          <div>
            <label class="block text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-2.5 ml-1">Status / Risk</label>
            <div class="flex flex-wrap gap-2">
              ${['All', 'High Risk', 'On Track', 'Graded'].map(f=>`
                <button class="px-4 py-2 border border-[#E2E8F0] text-[#475569] text-xs font-semibold rounded-full hover:border-indigo-200 hover:text-indigo-600 transition-all">${f}</button>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button onclick="closeModal()" class="py-4 bg-gray-50 text-[#475569] font-bold rounded-xl text-[10px] uppercase tracking-widest">Reset</button>
          <button onclick="EP.notify('Filter applied!', 'success'); closeModal();" class="py-4 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 text-[10px] uppercase tracking-widest active:scale-95 transition-transform">Apply Filter</button>
        </div>
      </div>
    `);
  },

  joinClass() {
    showModal(`
      <div class="p-8 text-center">
        <div class="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-6 mx-auto">
          ${EP.getIcon('plus-circle', 'w-10 h-10 text-indigo-500', 'solid')}
        </div>
        <h3 class="font-display font-semibold text-[#0F172A] text-base mb-2">Join New Class</h3>
        <p class="text-[#64748B] text-xs mb-8 leading-relaxed">Enter your instructor's class code to enroll.</p>
        <input type="text" id="join-code" placeholder="CODE-2026" class="w-full px-6 py-4 rounded-xl border-2 border-[#F1F5F9] mb-8 focus:border-indigo-400 focus:ring-0 outline-none text-center text-xs font-bold tracking-widest uppercase">
        <div class="grid grid-cols-2 gap-3">
          <button onclick="closeModal()" class="py-4 bg-gray-50 text-[#64748B] font-bold rounded-xl text-[10px] uppercase tracking-widest">Cancel</button>
          <button onclick="EP.actions.submitJoinClass()" class="py-4 bg-indigo-500 text-white font-bold rounded-xl shadow-xl shadow-indigo-500/20 text-[10px] uppercase tracking-widest active:scale-95 transition-transform">Join Class</button>
        </div>
      </div>
    `);
  },

  submitJoinClass() {
    const code = document.getElementById('join-code').value;
    if(!code) return EP.notify('Please enter a valid code', 'warning');
    EP.notify(`Request sent for ${code.toUpperCase()}`, 'success');
    closeModal();
  },

  newClass() {
    showModal(`
      <div class="p-8">
        <h3 class="font-display font-semibold text-[#0F172A] text-base mb-2">Create New Class</h3>
        <p class="text-[#64748B] text-xs mb-8 italic">Set up a new learning environment.</p>
        <div class="space-y-4 mb-8">
          <div>
            <label class="block text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-1.5 ml-1">Class Name</label>
            <input type="text" id="new-class-name" placeholder="e.g. Advanced Web Design" class="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-indigo-400 text-sm font-medium">
          </div>
          <div>
            <label class="block text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-1.5 ml-1">Class Code</label>
            <input type="text" id="new-class-code" placeholder="e.g. CS401" class="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-indigo-400 text-sm font-medium tracking-wider uppercase">
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button onclick="closeModal()" class="py-4 bg-gray-50 text-[#475569] font-bold rounded-xl text-[10px] uppercase tracking-widest">Discard</button>
          <button onclick="EP.actions.submitNewClass()" class="py-4 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 text-[10px] uppercase tracking-widest">Create Class</button>
        </div>
      </div>
    `);
  },

  submitNewClass() {
    const name = document.getElementById('new-class-name').value;
    if(!name) return EP.notify('Class name is required', 'error');
    EP.notify(`${name} created successfully!`, 'success');
    closeModal();
  },

  newStudent() {
    showModal(`
      <div class="p-8">
        <h3 class="font-display font-semibold text-[#0F172A] text-base mb-2 italic">Enlist New Student</h3>
        <p class="text-[#64748B] text-xs mb-6 leading-relaxed">Add a student to the academic database for tracking and prediction.</p>
        <div class="space-y-4 mb-8">
          <div>
            <label class="block text-[10px] font-medium text-[#94A3B8] uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
            <input type="text" id="new-student-name" placeholder="e.g. Juan De La Cruz" class="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-indigo-400 text-sm font-medium">
          </div>
          <div>
            <label class="block text-[10px] font-medium text-[#94A3B8] uppercase tracking-widest mb-1.5 ml-1">Student ID/Email</label>
            <input type="text" id="new-student-id" placeholder="e.g. 2024-1001 or email" class="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-indigo-400 text-sm font-medium">
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button onclick="closeModal()" class="py-4 bg-gray-50 text-[#475569] font-bold rounded-xl text-[10px] uppercase tracking-widest">Discard</button>
          <button onclick="EP.actions.submitNewStudent()" class="py-4 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 text-[10px] uppercase tracking-widest">Enlist Student</button>
        </div>
      </div>
    `);
  },

  submitNewStudent() {
    const name = document.getElementById('new-student-name').value;
    if(!name) return EP.notify('Student name is required', 'error');
    EP.notify(`${name} added to database!`, 'success');
    closeModal();
  },

  postAnnouncement(classTitle) {
    showModal(`
      <div class="p-8">
        <h3 class="font-display font-semibold text-[#0F172A] text-base mb-2">New Announcement</h3>
        <p class="text-[#64748B] text-sm mb-8 leading-relaxed italic">Share an important update with ${classTitle}.</p>
        <div class="space-y-4 mb-8">
          <div>
            <label class="block text-[10px] font-medium text-[#94A3B8] uppercase tracking-widest mb-1.5 ml-1">Announcement Title</label>
            <input type="text" id="ann-title" placeholder="e.g. Schedule Change" class="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-indigo-400 text-sm font-medium">
          </div>
          <div>
            <label class="block text-[10px] font-medium text-[#94A3B8] uppercase tracking-widest mb-1.5 ml-1">Message Content</label>
            <textarea id="ann-text" rows="4" placeholder="Type your message here..." class="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-indigo-400 text-sm font-medium resize-none"></textarea>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button onclick="closeModal()" class="py-4 bg-gray-50 text-[#475569] font-bold rounded-xl text-[10px] uppercase tracking-widest">Discard</button>
          <button onclick="EP.actions.submitAnnouncement()" class="py-4 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 text-[10px] uppercase tracking-widest active:scale-95 transition-transform">Post Announcement</button>
        </div>
      </div>
    `);
  },

  submitAnnouncement() {
    const title = document.getElementById('ann-title').value;
    if(!title) return EP.notify('Please enter a title', 'error');
    EP.notify('Announcement posted to class wall!', 'success');
    closeModal();
  },

  newAssignment() {
    showModal(`
      <div class="p-8">
        <h3 class="font-display font-semibold text-[#0F172A] text-base mb-2">Post New Assignment</h3>
        <p class="text-[#64748B] text-xs mb-8 leading-relaxed italic">Create a new task for your students to complete.</p>
        <div class="space-y-4 mb-8">
           <div>
              <label class="block text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-1.5 ml-1">Title</label>
              <input type="text" placeholder="e.g. Introduction to React" class="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-indigo-400 text-sm font-medium">
           </div>
           <div class="grid grid-cols-2 gap-3">
              <div>
                 <label class="block text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-1.5 ml-1">Due Date</label>
                 <input type="date" class="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-indigo-400 text-sm font-medium">
              </div>
              <div>
                 <label class="block text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-1.5 ml-1">Max Score</label>
                 <input type="number" placeholder="100" class="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-indigo-400 text-sm font-medium">
              </div>
           </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button onclick="closeModal()" class="py-3 bg-gray-50 text-[#475569] font-semibold rounded-xl text-[10px] uppercase tracking-widest">Discard</button>
          <button onclick="EP.notify('Assignment posted!', 'success'); closeModal();" class="py-3 bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 text-[10px] uppercase tracking-widest">Post Task</button>
        </div>
      </div>
    `);
  },

  gradeSubmissions(title) {
    showModal(`
      <div class="p-8">
        <h3 class="font-display font-semibold text-[#0F172A] text-base mb-2">Grade Submissions</h3>
        <p class="text-[#64748B] text-xs mb-6">${title}</p>
        <div class="space-y-3 mb-8">
           ${['Maria Santos', 'Juan Dela Cruz', 'Elena Gilbert'].map(name=>`
              <div class="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                 <div class="flex items-center gap-3">
                    ${avatarEl(name, 'w-8 h-8 text-[10px]')}
                    <p class="text-xs font-bold text-[#475569]">${name}</p>
                 </div>
                 <input type="number" placeholder="0" class="w-16 px-2 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-bold text-center focus:border-indigo-400 outline-none">
              </div>
           `).join('')}
        </div>
        <button onclick="EP.notify('Grades updated!', 'success'); closeModal();" class="w-full py-4 bg-indigo-500 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all">Submit Grades</button>
      </div>
    `);
  },

  confirmDelete(title, callback) {
    showModal(`
      <div class="p-8 text-center">
        <div class="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-6">
          ${EP.getIcon('trash', 'w-7 h-7 text-rose-500', 'solid')}
        </div>
        <h3 class="font-display font-semibold text-[#0F172A] text-base mb-2">Delete ${title}?</h3>
        <p class="text-[#64748B] text-xs mb-10 leading-relaxed">This action is irreversible for the current session. All related student data will be purged.</p>
        <div class="flex gap-3">
          <button onclick="closeModal()" class="flex-1 py-4 bg-gray-50 text-[#475569] font-bold rounded-xl text-[10px] uppercase tracking-widest">Cancel</button>
          <button id="btn-confirm-delete" class="flex-1 py-4 bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-500/20 text-[10px] uppercase tracking-widest active:scale-95 transition-transform">Confirm Delete</button>
        </div>
      </div>
    `);
    const btn = document.getElementById('btn-confirm-delete');
    if (btn) {
      btn.onclick = () => {
        callback();
        closeModal();
      };
    }
  },

  viewClass(id) {
    EP.selectedClassId = id;
    navigate('class_details');
  }
};

// ─── Init ────────────────────────────────────────────────────────────

EP.ui = {
  toggle(btn, id) {
    const isOn = btn.classList.contains('toggle-on');
    if (isOn) {
      btn.classList.replace('toggle-on', 'toggle-off');
      btn.querySelector('span').classList.replace('translate-x-4', 'translate-x-0');
    } else {
      btn.classList.replace('toggle-off', 'toggle-on');
      btn.querySelector('span').classList.replace('translate-x-0', 'translate-x-4');
    }
  }
};

EP.actions = {
  ...EP.actions,
  setTheme(theme) {
    localStorage.setItem('ep_theme', theme);
    const body = document.body;
    body.classList.remove('dark');
    
    if (theme === 'dark') {
      body.classList.add('dark');
    } else if (theme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark');
      }
    }
    
    // Re-render settings to show active state
    if (EP.currentPage === 'settings') {
      if (EP.currentRole === 'student') EP.studentSettings.render();
      else EP.educatorSettings.render();
    }
    EP.notify(`Theme set to ${theme}`, 'info');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Chart !== 'undefined') {
    Chart.defaults.font.family = 'Poppins';
    Chart.defaults.color = '#94A3B8';
  }
  
  const savedTheme = localStorage.getItem('ep_theme') || 'light';
  if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
  }
  
  const savedRole = localStorage.getItem('ep_role') || 'student';
  const savedPage = localStorage.getItem('ep_page') || 'dashboard';
  setRole(savedRole, savedPage);
});