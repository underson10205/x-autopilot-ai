/* ==========================================================================
   Management Support AI Dynamic Engine & Gamification System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // State Storage
  let userState = JSON.parse(localStorage.getItem('MG_USER_STATE')) || {
    level: 1,
    exp: 25,
    maxExp: 100,
    streak: 3,
    partnerId: '早苗',
    history: []
  };

  let partnerData = {
    '陽葵': {
      name: '陽葵 (ひまり)',
      avatar: '陽',
      color: '#f59e0b',
      badge: '① ポジティブ・共感型 (女性)',
      motto: '「アンダーソンさん、今日もお仕事お疲れ様です✨ 大丈夫、一緒に解決していきましょう！」',
      greeting: 'アンダーソンさん！毎日チームを支えておられて本当にお疲れ様です✨\nどんな些細な悩みでも遠慮なく話してくださいね！温かくポジティブな3〜4案の解決策をご提案します♪'
    },
    '冷泉': {
      name: '冷泉 (れいせん)',
      avatar: '冷',
      color: '#3b82f6',
      badge: '② クール・ロジカル型 (女性)',
      motto: '「…アンダーソンさん。感情論は不要です。問題の根本原因を淡々と分析し、改善策を提示します」',
      greeting: 'アンダーソンさん、お疲れ様です。現状のチームの課題や問題点を客観的にお知らせください。冷徹かつ論理的に根拠のある3〜4個のアクションプランを提示します。'
    },
    '早苗': {
      name: 'AI秘書 早苗ちゃん',
      avatar: '早苗',
      color: '#8b5cf6',
      badge: '③ ツンデレ・スパルタ型 (女性)',
      motto: '「…ふん。アンダーソンさん、甘えは厳禁です。成果を出したら認めてあげます」',
      greeting: 'アンダーソンさん、今日もお仕事お疲れ様です。\n誰にも言えない現場の悩みや、部下との接し方で引っかかっていることがあれば何でも話してください。厳しく、ですが合理的な3〜4案の解決策を提示いたします。'
    }
  };

  let knowledgeList = JSON.parse(localStorage.getItem('MG_KNOWLEDGE_LIST')) || [
    {
      title: '『部下の本音を引き出す1on1面談の極意』',
      category: '1on1対話ノウハウ',
      summary: '評価ではなく共感から入る。03:20 信頼関係を作る最初の言葉が効果的。'
    },
    {
      title: '『角を立てずに改善を促すフィードバック術』',
      category: '指導・フィードバック',
      summary: 'サンドイッチ法（褒める➔改善点➔期待）を活用し、モチベーションを維持させる。05:40 参照。'
    }
  ];

  // Tab Navigation
  const navButtons = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      navButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.style.display = 'none');

      btn.classList.add('active');
      const targetTab = document.getElementById(`tab-${tabId}`);
      if (targetTab) targetTab.style.display = 'block';
    });
  });

  // Partner Selection Handler
  const partnerCards = document.querySelectorAll('.partner-select-card');
  partnerCards.forEach(card => {
    card.addEventListener('click', () => {
      partnerCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      const partnerId = card.getAttribute('data-partner-id');
      userState.partnerId = partnerId;
      saveUserState();
      updatePartnerUI();
      showToast(`👥 AIパートナーを『${partnerData[partnerId].name}』に変更しました！`);
    });
  });

  document.getElementById('btn-change-partner').addEventListener('click', () => {
    document.querySelector('[data-tab="settings"]').click();
  });

  function updatePartnerUI() {
    const p = partnerData[userState.partnerId] || partnerData['早苗'];
    document.getElementById('partner-avatar').textContent = p.avatar;
    document.getElementById('partner-avatar').style.background = p.color;
    document.getElementById('partner-name').textContent = p.name;
    document.getElementById('partner-type-badge').textContent = p.badge;
    document.getElementById('partner-motto').textContent = p.motto;
  }

  // Quick Question Card Handlers
  const quickCards = document.querySelectorAll('.quick-question-card');
  quickCards.forEach(card => {
    card.addEventListener('click', () => {
      const questionText = card.getAttribute('data-q');
      document.getElementById('chat-input-text').value = questionText;
      handleSendConsult();
    });
  });

  // Send Consultation Handler
  const btnSend = document.getElementById('btn-send-consult');
  if (btnSend) {
    btnSend.addEventListener('click', handleSendConsult);
  }

  function handleSendConsult() {
    const inputEl = document.getElementById('chat-input-text');
    const query = inputEl.value.trim();
    if (!query) return;

    const chatBody = document.getElementById('chat-messages-body');
    const partner = partnerData[userState.partnerId] || partnerData['早苗'];

    // Append User Message
    const userRow = document.createElement('div');
    userRow.className = 'chat-bubble-row user';
    userRow.innerHTML = `
      <div class="chat-avatar" style="background: #2563eb;">アン</div>
      <div class="chat-bubble-content">
        <div class="chat-sender-name">アンダーソンさん</div>
        <div class="chat-bubble-text">${escapeHtml(query)}</div>
      </div>
    `;
    chatBody.appendChild(userRow);
    inputEl.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Show AI Partner Thinking State
    const thinkingRow = document.createElement('div');
    thinkingRow.className = 'chat-bubble-row partner';
    thinkingRow.id = 'thinking-row';
    thinkingRow.innerHTML = `
      <div class="chat-avatar" style="background: ${partner.color};">${partner.avatar}</div>
      <div class="chat-bubble-content">
        <div class="chat-sender-name">${partner.name}</div>
        <div class="chat-bubble-text" style="color: #94a3b8;">
          ⚡️ アンダーソン厳選ナレッジを参照し、最適な3〜4案を思考中...
        </div>
      </div>
    `;
    chatBody.appendChild(thinkingRow);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate AI Response with 3-4 Options & Knowledge Source Reference
    setTimeout(() => {
      const thinking = document.getElementById('thinking-row');
      if (thinking) thinking.remove();

      const aiRow = document.createElement('div');
      aiRow.className = 'chat-bubble-row partner';

      let aiResponseHTML = `
        <div class="chat-avatar" style="background: ${partner.color};">${partner.avatar}</div>
        <div class="chat-bubble-content">
          <div class="chat-sender-name">${partner.name}</div>
          <div class="chat-bubble-text">
<strong>【労いと共有】</strong><br>
アンダーソンさん、毎日現場のチームを支えておられて本当にお疲れ様です。<br>
ご相談いただいた「${escapeHtml(query)}」について、蓄積されたナレッジを元に最適な4つのアドバイス提案をまとめました。<br><br>

<strong>【ナレッジ参照根拠】</strong> 📚 <em>『部下の本音を引き出す1on1面談の極意』（03:20付近）より参照</em><br><br>

<div class="option-proposal-box">
  <div class="option-title">💡 提案①：『共感ファースト原則』</div>
  <div class="option-reason">まず「君が悩んでいる気持ち、よくわかるよ」と相手の感情を受け止めてから本題に入ります。相手の防衛本能が解けます。</div>
</div>

<div class="option-proposal-box">
  <div class="option-title">💡 提案②：『沈黙を恐れない10秒間』</div>
  <div class="option-reason">黙り込んだ時は無理に話しかけず、10秒間待つことで、部下自らが考えを言葉にする時間を確保します。</div>
</div>

<div class="option-proposal-box">
  <div class="option-title">💡 提案③：『ゴール共有とポジティブフィードバック』</div>
  <div class="option-reason">指示ではなく「この仕事が完成するとチームにどんな良いことがあるか」のワクワクする未来を伝えます。</div>
</div>

<div class="option-proposal-box">
  <div class="option-title">💡 提案④：『直後のワンポイント労い』</div>
  <div class="option-reason">指導が終わった直後に「期待しているから伝えたんだよ」と笑顔で1言添えてフォローします。</div>
</div>
          </div>
        </div>
      `;
      aiRow.innerHTML = aiResponseHTML;
      chatBody.appendChild(aiRow);
      chatBody.scrollTop = chatBody.scrollHeight;

      // Show Feedback Stamps
      document.getElementById('feedback-panel').style.display = 'block';
    }, 1200);
  }

  // Stamp Feedback Handler (PDCA & Exp Gamification)
  const stampBtns = document.querySelectorAll('.stamp-btn');
  stampBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const res = btn.getAttribute('data-result');
      let gainedExp = 30;
      if (res === 'so-so') gainedExp = 20;
      if (res === 'skip') gainedExp = 10;

      addExp(gainedExp);
      document.getElementById('feedback-panel').style.display = 'none';
      showToast(`🎉 実践フィードバック完了！ +${gainedExp} EXPを獲得しました！`);
    });
  });

  function addExp(amount) {
    userState.exp += amount;
    if (userState.exp >= userState.maxExp) {
      userState.level += 1;
      userState.exp -= userState.maxExp;
      userState.maxExp = Math.floor(userState.maxExp * 1.2);
      showToast(`🎊 LEVEL UP! Lv.${userState.level} へ昇格しました！新たなマネジメントバッジを獲得！`, 6000);
    }
    saveUserState();
    updateGamificationUI();
  }

  function updateGamificationUI() {
    document.getElementById('user-level-label').textContent = `Lv.${userState.level} リーダー`;
    const pct = Math.min(100, Math.floor((userState.exp / userState.maxExp) * 100));
    document.getElementById('user-exp-bar').style.width = `${pct}%`;
  }

  // Knowledge Studio Handlers (URL Extraction)
  const btnExtract = document.getElementById('btn-extract-knowledge');
  if (btnExtract) {
    btnExtract.addEventListener('click', async () => {
      const urlInput = document.getElementById('knowledge-url-input').value.trim();
      if (!urlInput) {
        showToast('⚠️ YouTube動画などのURLを入力してください');
        return;
      }

      btnExtract.disabled = true;
      btnExtract.textContent = '⏳ AI解析中...';

      try {
        const res = await fetch('/api/management_knowledge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: urlInput })
        });
        const data = await res.json();
        if (data.success && data.knowledge) {
          document.getElementById('knowledge-preview-card').style.display = 'block';
          document.getElementById('prev-title').value = data.knowledge.title;
          document.getElementById('prev-summary').value = data.knowledge.summary;
          showToast('✨ 動画から要約とタイムスタンプを自動抽出しました！確認・保存してください。');
        }
      } catch (err) {
        showToast('❌ 解析エラー: ' + err.message);
      } finally {
        btnExtract.disabled = false;
        btnExtract.textContent = '✨ AIナレッジ解析';
      }
    });
  }

  const btnSaveK = document.getElementById('btn-save-knowledge');
  if (btnSaveK) {
    btnSaveK.addEventListener('click', () => {
      const title = document.getElementById('prev-title').value;
      const summary = document.getElementById('prev-summary').value;

      knowledgeList.unshift({
        title,
        category: '動画学習ナレッジ',
        summary
      });

      localStorage.setItem('MG_KNOWLEDGE_LIST', JSON.stringify(knowledgeList));
      renderKnowledgeList();
      document.getElementById('knowledge-preview-card').style.display = 'none';
      document.getElementById('knowledge-url-input').value = '';
      addExp(50); // Add 50 EXP for registering knowledge
      showToast('💾 ナレッジデータベースへ正常に登録蓄積されました！ (+50 EXP)');
    });
  }

  function renderKnowledgeList() {
    const listGrid = document.getElementById('knowledge-list-grid');
    if (!listGrid) return;

    listGrid.innerHTML = knowledgeList.map(k => `
      <div class="knowledge-item-card" style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; margin-bottom: 6px;">${escapeHtml(k.category || 'ナレッジ')}</span>
          <h4 style="font-size: 15px; font-weight: 700; color: #f8fafc;">${escapeHtml(k.title)}</h4>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 6px; white-space: pre-wrap;">${escapeHtml(k.summary)}</p>
        </div>
      </div>
    `).join('');

    document.getElementById('knowledge-count').textContent = knowledgeList.length;
  }

  function saveUserState() {
    localStorage.setItem('MG_USER_STATE', JSON.stringify(userState));
  }

  function showToast(msg, duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.style.background = '#10b981';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, duration);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[m]);
  }

  // Initialize
  updatePartnerUI();
  updateGamificationUI();
  renderKnowledgeList();
});
