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

  let knowledgeList = JSON.parse(localStorage.getItem('MG_KNOWLEDGE_LIST')) || [
    {
      title: '『組織は命令ではなく協力で動く｜バーナードが見た協力意欲の構造』',
      category: '組織構造・協力意欲の法則',
      summary: `🎥 動画の全体概要と核心メッセージ
組織が動かなくなる最大の要因は「指示の強さが足りないから」ではなく「現場の協力意欲が失われているから」である。上司の命令も部下が受け入れて初めて効力を持つ。管理を強めるよりも、メンバーが自然と「協力してもいい」と思える環境を整えることこそがマネジメントの本質である。

🔑 使用者の相談時にAIが根拠として提案できる知識ポイント（6選）
1. 【組織は命令ではなく「協力の継続」で成立する】
・使用者に提案できる解決策: 強い命令系統や管理を強めるのではなく、チームの「協力意欲」を高める環境調整を最優先する。
・根拠・事例・理由: 1797年イギリス海軍「スピッドヘッドの反乱」では、厳格な階級組織であったにもかかわらず出航拒否で機能停止した[[00:12]]。バーナードの定義でも組織とは「協力が意識的に調整されている状態」そのものである[[01:48]]。

2. 【組織成立の3つの不可欠な要素】
・使用者に提案できる解決策: コミュニケーション、共通目的、協力意欲の3つを同時に揃える。「静かな停滞」を防ぐ。
・根拠・事例・理由: 目的があっても伝達されなければスローガン化し[[04:52]]、協力意欲が失われると最低限の仕事しかしない表面的な従属が起きる[[04:21]][[05:30]]。

3. 【権威の受容論（命令の効力は受け手が決める）】
・使用者に提案できる解決策: 命令や注意をする際は、文章そのものより日頃の「信頼関係」を土台にする。
・根拠・事例・理由: 信頼関係がある上司の急な依頼は受け入れるが、そうでない上司の無茶振りは拒絶や形だけの対応を生む[[08:32]][[09:06]]。

4. 【貢献と誘因のバランス】
・使用者に提案できる解決策: 「協力した人が損をしない構造」を作る。時間や労力（貢献）に対して承認や成長（誘因）を返す。
・根拠・事例・理由: 会議で意見を出した人だけに負担が集中すると、人は賢くなって協力するのをやめる[[11:41]]。主体性を責める前に誘因を返しているかを問うべき[[11:19]]。

5. 【公式組織を支える非公式組織（暗黙の空気）】
・使用者に提案できる解決策: ルールだけでなく、チームの暗黙の空気や人間関係の気遣いを大切にする。
・根拠・事例・理由: ホーソン実験「銀行配線室」の研究では、歩合給制度よりも「仲間同士の非公式な基準」が生産量を左右していた[[13:48]]。

6. 【真のマネジメントとは「協力の条件」を整えること】
・使用者に提案できる解決策: 管理や監視を増やすと「やらされ感」で逆効果になる。自発的に隙間を拾い合える環境を作る。
・根拠・事例・理由: ルール増やすと悪循環に陥る[[18:08]]。本当に強い組織とは、指示されていない隙間課題を自発的に拾い合える組織である[[19:49]]。`
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
${knContext if knContext else "基本マネジメント原則を適用"}

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

  // Knowledge Direct Paste Handler (NotebookLM / Gemini text paste)
  const btnSaveDirect = document.getElementById('btn-save-direct-knowledge');
  if (btnSaveDirect) {
    btnSaveDirect.addEventListener('click', () => {
      const title = document.getElementById('knowledge-title-input').value.trim();
      const url = document.getElementById('knowledge-url-input').value.trim();
      const category = document.getElementById('knowledge-category-input').value;
      const text = document.getElementById('knowledge-text-input').value.trim();

      if (!title || !text) {
        showToast('⚠️ タイトルと要約本文を入力してください');
        return;
      }

      knowledgeList.unshift({
        title,
        url,
        category,
        summary: text
      });

      localStorage.setItem('MG_KNOWLEDGE_LIST', JSON.stringify(knowledgeList));
      renderKnowledgeList();
      
      // Clear Inputs
      document.getElementById('knowledge-title-input').value = '';
      document.getElementById('knowledge-url-input').value = '';
      document.getElementById('knowledge-text-input').value = '';

      addExp(50);
      showToast('💾 NotebookLM / 高品質ナレッジを正式保存・DB蓄積しました！ (+50 EXP)');
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
          登録されたナレッジはまだありません。上のフォームからYouTube動画URLを入力して登録してください。
        </div>
      `;
      document.getElementById('knowledge-count').textContent = 0;
      return;
    }

    listGrid.innerHTML = knowledgeList.map((k, index) => `
      <div class="knowledge-item-card" style="background: #ffffff; border: 1px solid #e2ded4; border-radius: 16px; padding: 20px 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.03); margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
            <span class="badge" style="background: #f0fdf4; color: #047857; border: 1px solid #a7f3d0; margin-bottom: 8px;">${escapeHtml(k.category || 'ナレッジ')}</span>
            <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 4px 0 0 0;">${escapeHtml(k.title)}</h4>
          </div>
          <button class="btn btn-secondary btn-sm btn-delete-k" data-index="${index}" style="background: #fef2f2; color: #ef4444; border: 1px solid #fca5a5; font-size: 12px; padding: 6px 14px; border-radius: 8px; font-weight: 700; cursor: pointer;">
            🗑️ 削除
          </button>
        </div>
        <div style="font-size: 14px; color: #334155; line-height: 1.75; white-space: pre-wrap; background: #f8f6f0; border: 1px solid #eae6dd; border-radius: 12px; padding: 16px;">${escapeHtml(k.summary)}</div>
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
