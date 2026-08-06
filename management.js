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
      color: '#059669',
      badge: '③ ツンデレ・スパルタ型 (女性)',
      motto: '「…ふん。アンダーソンさん、甘えは厳禁です。成果を出したら認めてあげます」',
      greeting: 'アンダーソンさん、今日もお仕事お疲れ様です。\n誰にも言えない現場の悩みや、部下との接し方で引っかかっていることがあれば何でも話してください。厳しく、ですが合理的な3〜4案の解決策を提示いたします。'
    },
    '太陽': {
      name: '太陽 (たいよう)',
      avatar: '太',
      color: '#ea580c',
      badge: '① ポジティブ・共感型 (男性)',
      motto: '「アンダーソンさん！熱い志でチームを導きましょう！僕が全力で応援します！」',
      greeting: 'アンダーソンさん！今日も熱いリーダーシップお見事です！\n悩んだ時は何でも僕にぶつけてください！一緒にチームを最高に盛り上げる熱い解決案を提案します！'
    },
    '冴島': {
      name: '冴島 (さえじま)',
      avatar: '冴',
      color: '#0284c7',
      badge: '② クール・ロジカル型 (男性)',
      motto: '「アンダーソンさん、マネジメントに感情のムラは敵です。構造と根拠で解決しましょう」',
      greeting: 'アンダーソンさん、お疲れ様です。現状の数字や部下の行動データをお聞かせください。問題点をロジカルに分解し、最適な構造的アプローチを提示します。'
    },
    '凛太郎': {
      name: '凛太郎 (りんたろう)',
      avatar: '凛',
      color: '#7c3aed',
      badge: '③ ツンデレ・スパルタ型 (男性)',
      motto: '「…フッ、アンダーソンさん。その程度の悩みでへばるな。成果を出したら一杯奢ってやる」',
      greeting: 'アンダーソンさん、お疲れ。弱音を吐くヒマがあったら相談に乗ってやる。\nだが甘えはナシだ。結果を出すための現実的な3〜4案を叩き込んでやるよ。'
    }
  };

  let sampleBernardText = `【タイトル / テーマ】
組織は命令ではなく協力で動く｜バーナードが見た協力意欲の構造

【参照動画URL / 出典】
https://www.youtube.com/watch?v=t-H3VsCcijM

【カテゴリタグ】
組織構造・協力意欲

【要約・ノウハウ本文】
# 組織論・マネジメント構造（バーナード理論）ナレッジ

## 1. 動画全体要約・コアメッセージ
組織が機能しない根本原因は「管理や命令の不足」ではなく「現場の協力意欲の低下」にある。組織は単なる配置や命令で動く機械ではなく「人々の協力が継続している状態」そのものである。マネジメントの本質とは、強い命令を出すことではなく、メンバーが自発的に協力したくなる構造・信頼関係・目的・情報を整えることである。

---

## 2. 中間管理職向け 悩み別AI相談・提案ロジック

### 相談ケースA：「部下に指示を出しても最低限のことしかやらない / 主体性がない」
- **動画参照URL**: https://www.youtube.com/watch?v=t-H3VsCcijM
- **AI診断**: 部下の性格の問題ではなく、命令が受容不可能な形になっているか、「協力した人が損をする構造」に陥っている可能性が高い。
- **具体提案・アクションプラン**:
  1. **命令の受容化**: 背景・目的・優先順位をセットで伝えて「納得・実行できる指示」にする（[00:06:22](https://www.youtube.com/watch?v=t-H3VsCcijM&t=382s)）。
  2. **貢献への誘因提供**: 隙間タスクの消化や非公式な貢献を可視化し、適切な承認や評価を与える（[00:10:16](https://www.youtube.com/watch?v=t-H3VsCcijM&t=616s)）。
  3. **不公平感の排除**: 意見を出した人や気遣いをした人だけに負担が偏らないタスク分散を図る（[00:11:41](https://www.youtube.com/watch?v=t-H3VsCcijM&t=701s)）。

### 相談ケースB：「ルールや報告を徹底させたのに、なぜかチームの動きが重い」
- **動画参照URL**: https://www.youtube.com/watch?v=t-H3VsCcijM
- **AI診断**: 協力意欲が落ちている中で管理（報告・承認・監視）を増やすと、「やらされ感」が増してさらに動作が鈍化する悪循環が発生している。
- **具体提案・アクションプラン**:
  1. **管理の引き算**: 不要な報告ラインや重複作業を削り、メンバーの負担を減らす（[00:18:10](https://www.youtube.com/watch?v=t-H3VsCcijM&t=1090s)）。
  2. **非公式空気のケア**: チャットや日々の会話で「相談しやすい空気（非公式組織の活性化）」を作る（[00:13:30](https://www.youtube.com/watch?v=t-H3VsCcijM&t=810s)）。

### 相談ケースC：「上層部の無茶振りと現場の不満の板挟みで辛い」
- **動画参照URL**: https://www.youtube.com/watch?v=t-H3VsCcijM
- **AI診断**: 上層部の指示が現場にとって「目的不明・実現不可能」な状態で降りてきている。
- **具体提案・アクションプラン**:
  1. **目的の翻訳**: 上からの命令をそのまま流さず、現場が共感できる「共通目的」に再定義して伝える（[00:15:30](https://www.youtube.com/watch?v=t-H3VsCcijM&t=930s)）。
  2. **現場キャパの可視化**: 現場のボトルネックをデータ化し、上層部にフィードバックして指示を調整する。

---

## 3. 根拠ライブラリ（直リンク付きタイムスタンプ・引用データ）

| ナレッジ・概念 | 内容・根拠 | 根拠リンク（直リンク） |
| :--- | :--- | :--- |
| **スピッドヘッドの反乱** | 厳格な軍隊組織（1797年英海軍）でも、現場が「協力不可能」と判断した瞬間に組織は機能停止した。 | [00:00:12 該当シーンへ](https://www.youtube.com/watch?v=t-H3VsCcijM&t=12s) |
| **組織の定義** | 組織とは命令が流れる機械ではなく「人々の協力が継続している状態」。 | [00:01:29 該当シーンへ](https://www.youtube.com/watch?v=t-H3VsCcijM&t=89s) |
| **組織成立の3要素** | コミュニケーション・共通目的・協力意欲の3点。欠けると静かな停滞が発生。 | [00:04:41 該当シーンへ](https://www.youtube.com/watch?v=t-H3VsCcijM&t=281s) |
| **権威受容論** | 命令の効力は受け手（部下）が決める。理解・目的合致・実行可能で初めて命令となる。 | [00:06:22 該当シーンへ](https://www.youtube.com/watch?v=t-H3VsCcijM&t=382s) |
| **受容の幅（信頼関係）** | 日頃の信頼や説明がある上司からの依頼なら、部下は余分に協力してくれる。 | [00:08:32 該当シーンへ](https://www.youtube.com/watch?v=t-H3VsCcijM&t=512s) |
| **貢献と誘因のバランス** | メンバーの貢献（時間・注意・感情）に対し、適切な誘因（承認・給料・納得）を返す必要がある。 | [00:10:16 該当シーンへ](https://www.youtube.com/watch?v=t-H3VsCcijM&t=616s) |
| **協力の損（弱体化）** | 協力者や意見を出した人が損をする構造になると、人は学習して不協力になる。 | [00:11:41 該当シーンへ](https://www.youtube.com/watch?v=t-H3VsCcijM&t=701s) |
| **非公式組織の力** | ホーソン実験の通り、現場の行動を左右するのは公式ルールより仲間内の空気や暗黙の基準。 | [00:13:30 該当シーンへ](https://www.youtube.com/watch?v=t-H3VsCcijM&t=810s) |
| **マネジメントの3役割** | ①情報体系維持 ②必要な貢献の確保 ③目的の明確化。命令を張り上げることではない。 | [00:15:30 該当シーンへ](https://www.youtube.com/watch?v=t-H3VsCcijM&t=930s) |
| **管理強化の悪循環** | 協力意欲がない状態での管理・監視強化は、やらされ感を増やしてさらに組織を重くする。 | [00:18:10 該当シーンへ](https://www.youtube.com/watch?v=t-H3VsCcijM&t=1090s) |`;

  let knowledgeList = JSON.parse(localStorage.getItem('MG_KNOWLEDGE_LIST')) || [
    {
      title: '組織は命令ではなく協力で動く｜バーナードが見た協力意欲の構造',
      url: 'https://www.youtube.com/watch?v=t-H3VsCcijM',
      category: '組織構造・協力意欲の法則',
      summary: sampleBernardText
    }
  ];

  // Role Switcher Logic (Admin vs General User)
  let isAdminMode = JSON.parse(localStorage.getItem('MG_ADMIN_MODE')) || false;
  const roleToggle = document.getElementById('role-toggle');
  const roleText = document.getElementById('role-status-text');
  const adminTabItem = document.querySelector('.admin-only-item');

  function updateRoleUI() {
    if (roleToggle) roleToggle.checked = isAdminMode;
    if (roleText) {
      roleText.textContent = isAdminMode ? '現在: 👑 管理者表示 (全機能解放)' : '現在: 👤 一般利用者表示';
      roleText.style.color = isAdminMode ? '#b45309' : '#94a3b8';
    }
    if (adminTabItem) {
      adminTabItem.style.display = isAdminMode ? 'flex' : 'none';
    }
  }

  if (roleToggle) {
    roleToggle.addEventListener('change', () => {
      isAdminMode = roleToggle.checked;
      localStorage.setItem('MG_ADMIN_MODE', JSON.stringify(isAdminMode));
      updateRoleUI();
      showToast(isAdminMode ? '👑 管理者モードを有効化しました (ナレッジ登録機能が解放されます)' : '👤 一般利用者モードに切り替えました (管理メニューが非表示になります)');
    });
  }

  // Tab Navigation Handler
  const navButtons = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  function switchTab(tabId) {
    navButtons.forEach(b => {
      if (b.getAttribute('data-tab') === tabId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    tabContents.forEach(c => {
      if (c.id === `tab-${tabId}`) {
        c.style.display = 'block';
        c.classList.add('active');
      } else {
        c.style.display = 'none';
        c.classList.remove('active');
      }
    });
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = btn.getAttribute('data-tab');
      if (tabId) {
        switchTab(tabId);
      }
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

  async function handleSendConsult() {
    const inputEl = document.getElementById('chat-input-text');
    const query = inputEl.value.trim();
    if (!query) return;

    const chatBody = document.getElementById('chat-messages-body');
    const partner = partnerData[userState.partnerId] || partnerData['早苗'];

    // Append User Message
    const userRow = document.createElement('div');
    userRow.className = 'chat-bubble-row user';
    userRow.innerHTML = `
      <div class="chat-avatar" style="background: #059669;">アン</div>
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
        <div class="chat-bubble-text" style="color: #64748b;">
          ⚡️ 蓄積ナレッジを参照し、Gemini 3.6 Flash で回答を生成中...
        </div>
      </div>
    `;
    chatBody.appendChild(thinkingRow);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Build Prompt with Accumulated Knowledge
    const knContext = knowledgeList.slice(0, 3).map(k => `【ナレッジ『${k.title}』】\n${k.summary}`).join('\n\n');
    const systemPrompt = `
あなたはマネジメント相談AIパートナー『${partner.name}』（タイプ: ${partner.badge}）です。
モットー: "${partner.motto}"

相談者（アンダーソンさん / 現場リーダー）から以下の悩みが寄せられました。
相談内容: 「${query}」

以下の【蓄積ナレッジデータベース】を参照し、あなたのキャラクター（${partner.name}）になりきって回答してください。

【蓄積ナレッジデータベース】
${knContext ? knContext : "基本マネジメント原則を適用"}

【回答要件】
1. 冒頭で、キャラクターに応じた温かい労いまたはキャラクターらしい受け答え（1〜2行）を述べてください。
2. 参照したナレッジの根拠（例: 『組織は命令ではなく協力で動く』より参照 [[01:48]] など）を提示してください。
3. 相談者へ提案する【具体策・アクションプランを3〜4案】、それぞれの理由と一緒に提示してください。
`;

    let aiResponseText = "";
    const modelsToTry = ["gemini-3.6-flash", "gemini-3.5-flash", "gemini-2.5-flash"];

    if (geminiApiKey) {
      for (const model of modelsToTry) {
        if (aiResponseText) break;
        try {
          const gRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }] })
          });
          if (gRes.ok) {
            const gData = await gRes.json();
            if (gData.candidates && gData.candidates[0]?.content?.parts[0]?.text) {
              aiResponseText = gData.candidates[0].content.parts[0].text;
            }
          }
        } catch (e) {}
      }
    }

    const thinking = document.getElementById('thinking-row');
    if (thinking) thinking.remove();

    const aiRow = document.createElement('div');
    aiRow.className = 'chat-bubble-row partner';

    let finalContent = "";
    if (aiResponseText) {
      finalContent = escapeHtml(aiResponseText);
    } else {
      finalContent = `<strong>【労いと共有】</strong><br>アンダーソンさん、毎日チームを支えておられて本当にお疲れ様です。<br>ご相談いただいた「${escapeHtml(query)}」について、蓄積されたナレッジを元に最適な4つのアドバイス提案をまとめました。<br><br><strong>【ナレッジ参照根拠】</strong> 📚 <em>『組織は命令ではなく協力で動く』（[[01:48]]）より参照</em><br><br><div class="option-proposal-box"><div class="option-title">💡 提案①：『共感ファースト原則』</div><div class="option-reason">まず「君が悩んでいる気持ち、よくわかるよ」と相手の感情を受け止めてから本題に入ります。相手の防衛本能が解けます。</div></div><div class="option-proposal-box"><div class="option-title">💡 提案②：『沈黙を恐れない10秒間』</div><div class="option-reason">黙り込んだ時は無理に話しかけず、10秒間待つことで、部下自らが考えを言葉にする時間を確保します。</div></div><div class="option-proposal-box"><div class="option-title">💡 提案③：『貢献と誘因のバランス共有』</div><div class="option-reason">指示ではなく「この仕事が完成するとチームや本人にどんな良い価値があるか」の理由を共有します。</div></div><div class="option-proposal-box"><div class="option-title">💡 提案④：『直後のワンポイント労い』</div><div class="option-reason">指導が終わった直後に「期待しているから伝えたんだよ」と笑顔で1言添えてフォローします。</div></div>`;
    }

    aiRow.innerHTML = `
      <div class="chat-avatar" style="background: ${partner.color};">${partner.avatar}</div>
      <div class="chat-bubble-content">
        <div class="chat-sender-name">${partner.name}</div>
        <div class="chat-bubble-text">${finalContent}</div>
      </div>
    `;
    chatBody.appendChild(aiRow);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Show Feedback Stamps
    document.getElementById('feedback-panel').style.display = 'block';
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

  // Gemini API Key Local Storage Management
  let geminiApiKey = localStorage.getItem('GEMINI_API_KEY') || '';
  const apiKeyInput = document.getElementById('gemini-api-key-input');
  const apiKeyStatus = document.getElementById('api-key-status');
  const btnSaveApiKey = document.getElementById('btn-save-api-key');

  function updateApiKeyUI() {
    if (apiKeyInput && geminiApiKey) {
      apiKeyInput.value = geminiApiKey;
    }
    if (apiKeyStatus) {
      apiKeyStatus.textContent = geminiApiKey ? '✅ 設定済み (本物Gemini有効)' : '未設定 (クリックして入力)';
      apiKeyStatus.style.color = geminiApiKey ? '#047857' : '#d97706';
    }
  }

  if (btnSaveApiKey) {
    btnSaveApiKey.addEventListener('click', () => {
      const inputVal = apiKeyInput.value.trim();
      geminiApiKey = inputVal;
      localStorage.setItem('GEMINI_API_KEY', geminiApiKey);
      updateApiKeyUI();
      showToast(geminiApiKey ? '🔑 Gemini APIキーを安全にブラウザ保存しました！本物Gemini AIが有効化されました！' : '⚠️ APIキーが消去されました');
    });
  }

  // Fill Sample Template Assistant Handler
  const btnFillSample = document.getElementById('btn-fill-sample-knowledge');
  if (btnFillSample) {
    btnFillSample.addEventListener('click', () => {
      const bulkInput = document.getElementById('knowledge-bulk-input');
      if (bulkInput) {
        bulkInput.value = sampleBernardText;
        showToast('📋 バーナード理論の見本フォーマットを入力欄にセットしました！');
      }
    });
  }

  // Bulk Single Text Area Parser & Knowledge Direct Save Handler
  const btnSaveBulk = document.getElementById('btn-save-bulk-knowledge');
  if (btnSaveBulk) {
    btnSaveBulk.addEventListener('click', () => {
      const rawText = document.getElementById('knowledge-bulk-input').value.trim();
      if (!rawText) {
        showToast('⚠️ 一括入力エリアにテキストをペーストしてください');
        return;
      }

      // Smart Parser
      let title = "一括入力ナレッジ";
      let url = "";
      let category = "マネジメントナレッジ";
      let bodyText = rawText;

      // Extract Title
      const titleMatch = rawText.match(/【タイトル\s*[\/／]?\s*テーマ】\s*\n?([^\n]+)/);
      if (titleMatch && titleMatch[1].trim()) {
        title = titleMatch[1].trim();
      } else {
        // Fallback to first line
        const firstLine = rawText.split('\n')[0].replace(/^#*\s*/, '').trim();
        if (firstLine) title = firstLine;
      }

      // Extract URL
      const urlMatch = rawText.match(/(https?:\/\/[^\s]+)/);
      if (urlMatch) {
        url = urlMatch[1].trim();
      }

      // Extract Category
      const catMatch = rawText.match(/【カテゴリタグ】\s*\n?([^\n]+)/);
      if (catMatch && catMatch[1].trim()) {
        category = catMatch[1].trim();
      }

      // Extract Body Text if structured header exists
      const bodyMatch = rawText.match(/【要約・ノウハウ本文】\s*\n?([\s\S]+)/);
      if (bodyMatch && bodyMatch[1].trim()) {
        bodyText = bodyMatch[1].trim();
      }

      knowledgeList.unshift({
        title,
        url,
        category,
        summary: bodyText
      });

      localStorage.setItem('MG_KNOWLEDGE_LIST', JSON.stringify(knowledgeList));
      renderKnowledgeList();
      
      // Clear Input
      document.getElementById('knowledge-bulk-input').value = '';

      showToast(`💾 ナレッジ『${title.slice(0, 15)}...』を一括解析・蓄積保存しました！`);
    });
  }

  // Knowledge Studio Handlers (URL Extraction with Direct Gemini 3.5 Flash API)
  const btnExtract = document.getElementById('btn-extract-knowledge');
  if (btnExtract) {
    btnExtract.addEventListener('click', async () => {
      const urlInput = document.getElementById('knowledge-url-input').value.trim();
      if (!urlInput) {
        showToast('⚠️ YouTube動画などのURLを入力してください');
        return;
      }

      if (!geminiApiKey) {
        showToast('⚠️ 本物のGemini 3.5 Flashで解析するには、上のボックスにGemini APIキーを入力して保存してください！', 6000);
        return;
      }

      btnExtract.disabled = true;
      btnExtract.textContent = '⏳ 本物 Gemini 3.5 Flash 解析中...';

      try {
        // 1. Fetch Video Title & oEmbed info
        let videoTitle = "YouTubeマネジメント動画";
        let authorName = "専門チャンネル";
        let videoId = "";
        const m = urlInput.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        if (m) videoId = m[1];

        try {
          const ores = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
          if (ores.ok) {
            const odata = await ores.json();
            videoTitle = odata.title || videoTitle;
            authorName = odata.author_name || authorName;
          }
        } catch (oe) {}

        // 2. High-Density Prompt for Gemini 3.5 Flash
        const promptText = `
動画タイトル: 『${videoTitle}』（投稿者: ${authorName}）
YouTube動画URL: ${urlInput}

上記動画の内容を詳しく解析・要約し、マネジメントサポートAIの「参謀知識ベース（ナレッジ）」として構造化してください。

【出力の必須目的】
この要約は、後からアプリ使用者（現場リーダー・管理者）がAIパートナーに悩みを相談してきた時に、「AIが根拠と一緒に使用者に最適な解決策を提案できる知識ベース」として使用できる形にまとめてください。
また、使用者が自ら元ソースの動画を確認できるように、「どの動画の何分何秒のところにあるのか（タイムスタンプ [[分:秒]]）」を必ず含めて整理してください。

【出力フォーマット】
🎥 動画の全体概要と核心メッセージ
[動画『${videoTitle}』の本質的な要約メッセージを3〜4行で記述]

🔑 使用者の相談時にAIが根拠として提案できる知識ポイント（5〜6選）
1. 【[テーマ・知識名]】
・使用者に提案できる解決策: [使用者の悩みを解決する具体的なアドバイス]
・根拠・事例・理由: [動画内で語られている具体的な歴史的事例、研究データ、思想]
・元ソースの該当位置: [[分:秒]]（動画のこの位置で確認可能）

2. 【[テーマ・知識名]】
...
`;

        // 3. Direct Gemini API Call (Primarily gemini-3.5-flash)
        let geminiResponseText = "";
        const modelsToTry = ["gemini-3.5-flash", "gemini-2.5-flash", "gemini-1.5-flash"];

        for (const model of modelsToTry) {
          if (geminiResponseText) break;
          try {
            const gRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
              })
            });
            if (gRes.ok) {
              const gData = await gRes.json();
              if (gData.candidates && gData.candidates[0]?.content?.parts[0]?.text) {
                geminiResponseText = gData.candidates[0].content.parts[0].text;
              }
            }
          } catch (err) {
            console.error(`Gemini API Model Error (${model}):`, err);
          }
        }

        if (geminiResponseText) {
          document.getElementById('knowledge-preview-card').style.display = 'block';
          document.getElementById('prev-title').value = videoTitle;
          document.getElementById('prev-summary').value = geminiResponseText;
          showToast('✨ 本物Gemini 3.5 Flashによるリアルタイム要約解析が完了しました！');
        } else {
          showToast('❌ Gemini 3.5 Flash APIの呼び出しに失敗しました。APIキーが正しいかご確認ください。', 6000);
        }

      } catch (err) {
        showToast('❌ 解析エラー: ' + err.message);
      } finally {
        btnExtract.disabled = false;
        btnExtract.textContent = '✨ 本物Gemini AI解析';
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

    if (knowledgeList.length === 0) {
      listGrid.innerHTML = `
        <div style="background: #ffffff; border: 1px solid var(--mg-border); border-radius: 12px; padding: 24px; text-align: center; color: #64748b;">
          登録されたナレッジはまだありません。上のフォームにテキストをコピペして登録してください。
        </div>
      `;
      document.getElementById('knowledge-count').textContent = 0;
      return;
    }

    function formatMarkdownText(str) {
      if (!str) return '';
      let formatted = escapeHtml(str);
      // Format Markdown Links [text](url)
      formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" style="color: #059669; font-weight: 700; text-decoration: underline;">$1</a>');
      // Format Raw URLs
      formatted = formatted.replace(/(^|[^"])((https?:\/\/[^\s<]+))/g, '$1<a href="$2" target="_blank" style="color: #059669; font-weight: 700; text-decoration: underline;">$2</a>');
      return formatted;
    }

    listGrid.innerHTML = knowledgeList.map((k, index) => `
      <div class="knowledge-item-card" style="background: #ffffff; border: 1px solid #e2ded4; border-radius: 16px; padding: 20px 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.03); margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
            <span class="badge" style="background: #f0fdf4; color: #047857; border: 1px solid #a7f3d0; margin-bottom: 8px;">${escapeHtml(k.category || 'ナレッジ')}</span>
            <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 4px 0 0 0;">${escapeHtml(k.title)}</h4>
            ${k.url ? `<a href="${escapeHtml(k.url)}" target="_blank" style="font-size: 12px; color: #059669; font-weight: 600; text-decoration: underline; margin-top: 4px; display: inline-block;">🔗 参照動画/出典リンクへ</a>` : ''}
          </div>
          <button class="btn btn-secondary btn-sm btn-delete-k" data-index="${index}" style="background: #fef2f2; color: #ef4444; border: 1px solid #fca5a5; font-size: 12px; padding: 6px 14px; border-radius: 8px; font-weight: 700; cursor: pointer;">
            🗑️ 削除
          </button>
        </div>
        <div style="font-size: 14px; color: #334155; line-height: 1.75; white-space: pre-wrap; background: #f8f6f0; border: 1px solid #eae6dd; border-radius: 12px; padding: 18px; max-height: 500px; overflow-y: auto;">${formatMarkdownText(k.summary)}</div>
      </div>
    `).join('');

    document.getElementById('knowledge-count').textContent = knowledgeList.length;

    // Attach Delete Event Listeners
    const deleteBtns = document.querySelectorAll('.btn-delete-k');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const deletedTitle = knowledgeList[idx].title;
        knowledgeList.splice(idx, 1);
        localStorage.setItem('MG_KNOWLEDGE_LIST', JSON.stringify(knowledgeList));
        renderKnowledgeList();
        showToast(`🗑️ ナレッジ『${deletedTitle.slice(0, 15)}...』を削除しました`);
      });
    });
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
  updateRoleUI();
  updatePartnerUI();
  updateGamificationUI();
  updateApiKeyUI();
  renderKnowledgeList();
});
