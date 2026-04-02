window.EP = window.EP || {};

EP.studentChatbot = {
  messages: null,
  responseIdx: 0,

  render() {
    if (!this.messages) {
      this.messages = JSON.parse(JSON.stringify(EP.data.chatMessages));
    }

    document.getElementById('content').innerHTML = `
      <div class="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        <!-- Header -->
        <div class="bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#1f2937] p-4 shadow-sm mb-4 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            ${EP.getIcon('chat-bubble-left-right', 'w-5 h-5 text-white', 'solid')}
          </div>
          <div class="flex-1">
            <p class="font-display font-semibold text-[#0F172A] dark:text-[#f9fafb] text-sm">Study Assistant</p>
            <p class="text-xs text-[#64748B] dark:text-[#9ca3af]">AI-powered · Answers questions about your coursework</p>
          </div>
          <span class="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span class="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>Online
          </span>
        </div>

        <!-- Chat area -->
        <div id="chat-messages" class="flex-1 overflow-y-auto space-y-4 pb-4 chat-messages">
          ${this.renderMessages()}
        </div>

        <!-- Suggestions -->
        <div id="chat-suggestions" class="flex gap-2 overflow-x-auto pb-3 pt-1 no-scrollbar">
          ${['Explain recursion','What is Big-O?','Study tips for finals','How to improve my grade?'].map(s=>`
            <button onclick="EP.studentChatbot.sendSuggestion('${s}')" class="flex-shrink-0 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap">
              ${s}
            </button>
          `).join('')}
        </div>

        <!-- Input -->
        <div class="bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#1f2937] p-3 shadow-sm flex gap-2 items-end">
          <textarea id="chat-input" placeholder="Ask anything about your coursework..."
            class="flex-1 bg-transparent resize-none outline-none text-sm text-[#0F172A] dark:text-white placeholder-[#94A3B8] max-h-32 leading-relaxed"
            rows="1" onkeydown="EP.studentChatbot.handleKey(event)"></textarea>
          <button onclick="EP.studentChatbot.send()" id="send-btn"
            class="w-9 h-9 rounded-xl bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center transition-colors flex-shrink-0">
            ${EP.getIcon('paper-airplane', 'w-4 h-4 text-white', 'solid')}
          </button>
        </div>
        <p class="text-[10px] text-[#94A3B8] text-center mt-2">This is a demo assistant. Responses are pre-scripted for portfolio purposes.</p>
      </div>
    `;
    setTimeout(() => { this.scrollToBottom(); }, 30);
  },

  renderMessages() {
    return this.messages.map(m => m.role === 'user' ? `
      <div class="flex justify-end">
        <div class="max-w-xs lg:max-w-md bg-indigo-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
          ${m.text}
        </div>
      </div>
    ` : `
      <div class="flex gap-3 items-start">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
          ${EP.getIcon('chat-bubble-left-right', 'w-4 h-4 text-white', 'solid')}
        </div>
        <div class="max-w-xs lg:max-w-md bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1f2937] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#0F172A] dark:text-[#f9fafb] leading-relaxed shadow-sm">
          ${m.text.replace(/\n/g,'<br>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}
        </div>
      </div>
    `).join('');
  },

  scrollToBottom() {
    const el = document.getElementById('chat-messages');
    if (el) el.scrollTop = el.scrollHeight;
  },

  handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); }
  },

  sendSuggestion(text) {
    const inp = document.getElementById('chat-input');
    if (inp) { inp.value = text; this.send(); }
  },

  send() {
    const inp = document.getElementById('chat-input');
    const text = inp?.value?.trim();
    if (!text) return;

    this.messages.push({ role:'user', text });
    inp.value = '';
    this.updateChat();

    // Typing indicator
    setTimeout(() => {
      const chatEl = document.getElementById('chat-messages');
      if (!chatEl) return;
      const typingId = 'typing-' + Date.now();
      chatEl.insertAdjacentHTML('beforeend', `
        <div id="${typingId}" class="flex gap-3 items-start">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            ${EP.getIcon('chat-bubble-left-right', 'w-4 h-4 text-white', 'solid')}
          </div>
          <div class="bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1f2937] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
            <div class="flex gap-1 items-center h-4">
              <span class="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce" style="animation-delay:0ms"></span>
              <span class="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce" style="animation-delay:150ms"></span>
              <span class="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce" style="animation-delay:300ms"></span>
            </div>
          </div>
        </div>
      `);
      this.scrollToBottom();

      setTimeout(() => {
        const typing = document.getElementById(typingId);
        if (typing) typing.remove();

        const responses = EP.data.chatResponses;
        const reply = responses[this.responseIdx % responses.length];
        this.responseIdx++;
        this.messages.push({ role:'assistant', text: reply });
        this.updateChat();
      }, 1200 + Math.random() * 600);
    }, 200);
  },

  updateChat() {
    const el = document.getElementById('chat-messages');
    if (el) { el.innerHTML = this.renderMessages(); this.scrollToBottom(); }
  }
};