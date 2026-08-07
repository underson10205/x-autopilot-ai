document.addEventListener('DOMContentLoaded', () => {

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
      if (c.id === 'tab-' + tabId) {
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

  // Partner Personas Data
  const partnerData = {
    '早苗': {
      name: 'AI秘書 早苗ちゃん',
      avatar: '早苗',
      color: '#059669',
      badge: 'ツンデレ・スパルタ型 (女性)',
      motto: '「…ふん。アンダーソンさん、甘えは厳禁です。成果を出したら認めてあげます」',
      greeting: 'アンダーソンさん、今日もお仕事お疲れ様です。\n誰にも言えない現場の悩みや、部下との接し方で引っかかっていることがあれば何でも話してください。厳しく、ですが合理的な解決策を提示いたします。'
    },
    '陽葵': {
      name: '陽葵 (ひまり)',
      avatar: '陽',
      color: '#d97706',
      badge: '① ポジティブ・共感型 (女性)',
      motto: '「アンダーソンさん！毎日本当によく頑張ってます！一緒に最高のチーム作りましょう！」',
      greeting: 'アンダーソンさん、今日もお疲れ様です！私でよければ何でも話してくださいね！いつも応援しています！'
    },
    '冷泉': {
      name: '冷泉 (れいせん)',
      avatar: '冷',
      color: '#2563eb',
      badge: '② クール・ロジカル型 (女性)',
      motto: '「感情論は横に置きましょう。データとナレッジに基づいた最善手を計算します」',
      greeting: 'アンダーソンさん、お疲れ様です。現状のボトルネックとデータを提示してください。即座に構造的課題を抽出します。'
    },
    '太陽': {
      name: '太陽 (たいよう)',
      avatar: '太',
      color: '#ea580c',
      badge: '① ポジティブ・共感型 (男性)',
      motto: '「アンダーソンさん！熱い志でチームを導きましょう！僕が全力で応援します！」',
      greeting: 'アンダーソンさん！今日も熱いリーダーシップお見事です！悩んだ時は何でも僕にぶつけてください！'
    },
    '冴島': {
      name: '冴島 (さえじま)',
      avatar: '冴',
      color: '#0284c7',
      badge: '② クール・ロジカル型 (男性)',
      motto: '「アンダーソンさん、マネジメントに感情のムラは敵です。構造と根拠で解決しましょう」',
      greeting: 'アンダーソンさん、お疲れ様です。現状の数字や部下の行動データをお聞かせください。'
    },
    '凛太郎': {
      name: '凛太郎 (りんたろう)',
      avatar: '凛',
      color: '#7c3aed',
      badge: '③ ツンデレ・スパルタ型 (男性)',
      motto: '「…フッ、アンダーソンさん。その程度の悩みでへばるな。成果を出したら一杯奢ってやる」',
      greeting: 'アンダーソンさん、お疲れ。弱音を吐くヒマがあったら相談に乗ってやる。結果を出すための提案を叩き込んでやるよ。'
    }
  };

  const sampleBernardText = `【タイトル / テーマ】
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
      showToast(isAdminMode ? '👑 管理者モードを有効化しました' : '👤 一般利用者モードに切り替えました');
    });
  }

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

  const btnChangeP = document.getElementById('btn-change-partner');
  if (btnChangeP) {
    btnChangeP.addEventListener('click', () => {
      switchTab('settings');
    });
  }

  function updatePartnerUI() {
    const p = partnerData[userState.partnerId] || partnerData['早苗'];
    if (document.getElementById('partner-avatar')) document.getElementById('partner-avatar').textContent = p.avatar;
    if (document.getElementById('partner-avatar')) document.getElementById('partner-avatar').style.background = p.color;
    if (document.getElementById('partner-name')) document.getElementById('partner-name').textContent = p.name;
    if (document.getElementById('partner-type-badge')) document.getElementById('partner-type-badge').textContent = p.badge;
    if (document.getElementById('partner-motto')) document.getElementById('partner-motto').textContent = p.motto;
  }

  // Session Chat History for 3-Step Dialog Flow
  let currentChatHistory = [];

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

    // Append User Message to UI
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

    // Record User Query in History
    currentChatHistory.push({ role: 'user', content: query });

    // Show AI Partner Thinking State
    const thinkingRow = document.createElement('div');
    thinkingRow.className = 'chat-bubble-row partner';
    thinkingRow.id = 'thinking-row';
    thinkingRow.innerHTML = `
      <div class="chat-avatar" style="background: ${partner.color};">${partner.avatar}</div>
      <div class="chat-bubble-content">
        <div class="chat-sender-name">${partner.name}</div>
        <div class="chat-bubble-text" style="color: #64748b;">
          ⚡️ 蓄積ナレッジを参照し、Gemini 3.6 Flash で対話中...
        </div>
      </div>
    `;
    chatBody.appendChild(thinkingRow);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Build History Text for Prompt
    const chatHistoryText = currentChatHistory.map(m => `${m.role === 'user' ? '相談者' : partner.name}: ${m.content}`).join('\n');
    const knContext = knowledgeList.slice(0, 3).map(k => `【ナレッジ『${k.title}』】\n${k.summary}`).join('\n\n');

    const systemPrompt = `
あなたはマネジメント相談AIパートナー『${partner.name}』（タイプ: ${partner.badge}）です。
モットー: "${partner.motto}"

【相談者（アンダーソンさん / 現場リーダー）との会話履歴】
${chatHistoryText}

最新の相談入力: 「${query}」

【蓄積ナレッジデータベース】
${knContext ? knContext : "基本マネジメント原則を適用"}

【あなたの必須対話行動ルール】
過去の会話の流れ（対話ステップ）に応じて、絶対に以下の手順を守って回答してください：

■【ステップ1：初回のご相談・聞き出しフェーズ】（会話が始まったばかり、または相談内容がまだ大まかな場合）
・いきなり長文の提案や解決策を出してはいけません。回答が無駄に長くなるのを防ぎます。
・まずは相談者の苦労や悩みに温かく共感・労いを行ってください。
・その上で「具体的にどのような場面（例: 指示を出した時、会議中、1on1の場など）で一番それを感じますか？」といった、相手のボトルネック・本音を引き出す【短い深掘り質問（1〜2個）】のみを行って回答を終えてください。

■【ステップ2：悩み確認フェーズ】（相談者が質問に答えて具体的な状況を教えてくれた場合）
・いきなり提案をせず、「なるほど...！つまり『〇〇』という点に一番頭を悩ませていらっしゃるのですね？」と、相手の悩みの本質を短く要約して【悩みと認識の合わせ】を行ってください。

■【ステップ3：認識一致後の提案フェーズ】（相談者が「そう、まさにそこ！」と認めた後、または悩みの本質が完全に確定している場合）
・「認識を共有していただきありがとうございます！」と述べた上で、上記の【蓄積ナレッジデータベース】を参照し、相手の悩みに直結する【具体的で刺さるアドバイス（3案）】を分かりやすく提示してください。
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
      currentChatHistory.push({ role: 'assistant', content: aiResponseText });
    } else {
      if (currentChatHistory.length <= 1) {
        finalContent = `アンダーソンさん、日々現場のチームを支えておられて本当にお疲れ様です。<br><br>部下の方のやる気や行動を感じられないのは心配ですね...。<br><br>差し支えなければ、それは具体的にどのような場面（例: 指示を出した時、会議中、1on1の場など）で一番感じられますか？相手がどんな状態か、詳しく教えていただけますか？`;
      } else if (currentChatHistory.length <= 3) {
        finalContent = `なるほど...！教えていただきありがとうございます。<br><br>つまり『指示を出した時に表面上は「はい」と返答するものの、自発的な行動が見られず最低限の作業で終わってしまうこと』に一番頭を悩ませていらっしゃるのですね？<br><br>この認識でお間違いありませんでしょうか？`;
      } else {
        finalContent = `認識を共有していただきありがとうございます！<br><br>その『最低限の行動で終わってしまう悩み』に対して、蓄積ナレッジ（バーナードの貢献と誘因の法則など）に基づいた効果的な解決案を3つ提案いたします。<br><br><div class="option-proposal-box"><div class="option-title">💡 提案①：『命令の受容化チェック』</div><div class="option-reason">背景・目的・優先順位をセットで伝えて「納得・実行できる指示」にブラッシュアップします（[00:06:22]）。</div></div><div class="option-proposal-box"><div class="option-title">💡 提案②：『貢献への誘因提供』</div><div class="option-reason">隙間タスクの消化や気遣いを可視化し、適切な承認や評価を与えて自発性を促します（[00:10:16]）。</div></div><div class="option-proposal-box"><div class="option-title">💡 提案③：『協力の損の解消』</div><div class="option-reason">意見を出した人だけに負担が偏らないタスク分散を図り、不協力な態度を防ぎます（[00:11:41]）。</div></div>`;
      }
      currentChatHistory.push({ role: 'assistant', content: finalContent });
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

    if (currentChatHistory.length >= 4 || (aiResponseText && aiResponseText.includes("提案"))) {
      document.getElementById('feedback-panel').style.display = 'block';
    }
  }

  // Stamp Feedback Handler
  const stampButtons = document.querySelectorAll('.stamp-btn');
  stampButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      stampButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const expGain = parseInt(btn.getAttribute('data-exp'), 10);
      const actionType = btn.getAttribute('data-action');

      addExp(expGain);
      document.getElementById('feedback-panel').style.display = 'none';

      let msg = '';
      if (actionType === 'success') msg = '🎉 実践成果のフィードバックありがとうございます！素晴らしい前進です！';
      else if (actionType === 'subtle') msg = '🤔 振り返りありがとうございます！PDCAを回して次へ活かしましょう！';
      else msg = '⏳ 振り返り記録完了です！焦らず自分のペースで実践してみましょう！';

      showToast(`${msg} (+${expGain} EXP)`);
    });
  });

  // Gamification User State
  let userState = JSON.parse(localStorage.getItem('MG_USER_STATE')) || {
    level: 1,
    exp: 40,
    maxExp: 100,
    streak: 3,
    partnerId: '早苗'
  };

  function addExp(amount) {
    userState.exp += amount;
    if (userState.exp >= userState.maxExp) {
      userState.level += 1;
      userState.exp -= userState.maxExp;
      userState.maxExp = Math.floor(userState.maxExp * 1.3);
      showToast(`🎉 レベルアップ！ Lv.${userState.level} リーダーに成長しました！`, 6000);
    }
    saveUserState();
    updateGamificationUI();
  }

  function updateGamificationUI() {
    if (document.getElementById('user-level-label')) document.getElementById('user-level-label').textContent = `Lv.${userState.level} リーダー`;
    const pct = Math.min(100, Math.floor((userState.exp / userState.maxExp) * 100));
    if (document.getElementById('user-exp-bar')) document.getElementById('user-exp-bar').style.width = `${pct}%`;
  }

  // Gemini API Key Local Storage
  let geminiApiKey = localStorage.getItem('GEMINI_API_KEY') || '';
  const apiKeyInput = document.getElementById('gemini-api-key-input');
  const apiKeyStatus = document.getElementById('api-key-status');
  const btnSaveApiKey = document.getElementById('btn-save-api-key');

  function updateApiKeyUI() {
    if (apiKeyInput && geminiApiKey) apiKeyInput.value = geminiApiKey;
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
      showToast(geminiApiKey ? '🔑 Gemini APIキーを安全にブラウザ保存しました！' : '⚠️ APIキーが消去されました');
    });
  }

  // Sample Template Assistant Handler
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

      let title = "一括入力ナレッジ";
      let url = "";
      let category = "マネジメントナレッジ";
      let bodyText = rawText;

      const titleMatch = rawText.match(/【タイトル\s*[\/／]?\s*テーマ】\s*\n?([^\n]+)/);
      if (titleMatch && titleMatch[1].trim()) {
        title = titleMatch[1].trim();
      } else {
        const firstLine = rawText.split('\n')[0].replace(/^#*\s*/, '').trim();
        if (firstLine) title = firstLine;
      }

      const urlMatch = rawText.match(/(https?:\/\/[^\s]+)/);
      if (urlMatch) url = urlMatch[1].trim();

      const catMatch = rawText.match(/【カテゴリタグ】\s*\n?([^\n]+)/);
      if (catMatch && catMatch[1].trim()) category = catMatch[1].trim();

      const bodyMatch = rawText.match(/【要約・ノウハウ本文】\s*\n?([\s\S]+)/);
      if (bodyMatch && bodyMatch[1].trim()) bodyText = bodyMatch[1].trim();

      knowledgeList.unshift({
        title,
        url,
        category,
        summary: bodyText
      });

      localStorage.setItem('MG_KNOWLEDGE_LIST', JSON.stringify(knowledgeList));
      renderKnowledgeList();
      
      document.getElementById('knowledge-bulk-input').value = '';
      showToast(`💾 ナレッジ『${title.slice(0, 15)}...』を一括解析・蓄積保存しました！`);
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
      if (document.getElementById('knowledge-count')) document.getElementById('knowledge-count').textContent = 0;
      return;
    }

    if (document.getElementById('knowledge-count')) document.getElementById('knowledge-count').textContent = knowledgeList.length;

    function formatMarkdownText(str) {
      if (!str) return '';
      let formatted = escapeHtml(str);
      formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" style="color: #059669; font-weight: 700; text-decoration: underline;">$1</a>');
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

    const deleteButtons = listGrid.querySelectorAll('.btn-delete-k');
    deleteButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        if (confirm(`ナレッジ『${knowledgeList[idx].title}』を削除してよろしいですか？`)) {
          knowledgeList.splice(idx, 1);
          localStorage.setItem('MG_KNOWLEDGE_LIST', JSON.stringify(knowledgeList));
          renderKnowledgeList();
          showToast('🗑️ ナレッジを削除しました');
        }
      });
    });
  }

  function saveUserState() {
    localStorage.setItem('MG_USER_STATE', JSON.stringify(userState));
  }

  function showToast(msg, duration = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 8px;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = 'background: #0f172a; color: #fff; padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 600; box-shadow: 0 10px 25px rgba(0,0,0,0.2); transition: all 0.3s ease;';
    toast.textContent = msg;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

  // Initial UI Render Calls
  updateRoleUI();
  updatePartnerUI();
  updateGamificationUI();
  updateApiKeyUI();
  renderKnowledgeList();
});
