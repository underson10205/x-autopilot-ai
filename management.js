/* ==========================================================================
   Management Support AI Dynamic Engine & Gamification System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // State Storage
  let currentChatHistory = [];
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
      greeting: 'アンダーソンさん！毎日チームを支えておられて本当にお疲れ様です✨\nどんな些細な悩みでも遠慮なく教えてくださいね。まずはどんなことで悩んでいるか、詳しく聞かせてください♪'
    },
    '冷泉': {
      name: '冷泉 (れいせん)',
      avatar: '冷',
      color: '#3b82f6',
      badge: '② クール・ロジカル型 (女性)',
      motto: '「…アンダーソンさん。感情論は不要です。問題の根本原因を淡々と分析し、改善策を提示します」',
      greeting: 'アンダーソンさん、お疲れ様です。現状のチームの課題や気になる点をお知らせください。どのような点に頭を悩ませているか、まずは詳しく伺います。'
    },
    '早苗': {
      name: 'AI秘書 早苗ちゃん',
      avatar: '早苗',
      color: '#059669',
      badge: '③ ツンデレ・スパルタ型 (女性)',
      motto: '「…ふん。アンダーソンさん、甘えは厳禁です。成果を出したら認めてあげます」',
      greeting: 'アンダーソンさん、今日もお仕事お疲れ様です。\n誰にも言えない現場の悩みや、部下との接し方で引っかかっていることがあれば何でも話してください。どんな悩みなのか、まずはしっかり聴いてあげますからね。'
    },
    '太陽': {
      name: '太陽 (たいよう)',
      avatar: '太',
      color: '#ea580c',
      badge: '① ポジティブ・共感型 (男性)',
      motto: '「アンダーソンさん！熱い志でチームを導きましょう！僕が全力で応援します！」',
      greeting: 'アンダーソンさん！今日も熱いリーダーシップお見事です！\n悩んだ時は何でも僕にぶつけてください！どんな状況で困っているのか、熱く詳しく聞かせてください！'
    },
    '冴島': {
      name: '冴島 (さえじま)',
      avatar: '冴',
      color: '#0284c7',
      badge: '② クール・ロジカル型 (男性)',
      motto: '「アンダーソンさん、マネジメントに感情のムラは敵です。構造と根拠で解決しましょう」',
      greeting: 'アンダーソンさん、お疲れ様です。現状のチームの気になる状況をお聞かせください。問題の本質を整理するために、まずは詳細をヒアリングさせてください。'
    },
    '凛太郎': {
      name: '凛太郎 (りんたろう)',
      avatar: '凛',
      color: '#7c3aed',
      badge: '③ ツンデレ・スパルタ型 (男性)',
      motto: '「…フッ、アンダーソンさん。その程度の悩みでへばるな。成果を出したら一杯奢ってやる」',
      greeting: 'アンダーソンさん、お疲れ。弱音を吐くヒマがあったら何でも言ってみろ。\nまずは具体的に何に引っかかっているのか、じっくり聴いてやるよ。'
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
| **貢献と誘因のバランス** | メンバーの貢献（時間・注意・感情）に対し、適切な誘因（承認・給料・納得）を返す必要がある�  // Chat Session History Storage
  let chatSessionMessages = [];

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

    // Append User Message to UI & Session History
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

    chatSessionMessages.push({ role: 'user', content: query });

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

    // Build History Text for Prompt
    const historyText = chatSessionMessages.map(m => `${m.role === 'user' ? '相談者(アンダーソンさん)' : partner.name}: 「${m.content}」`).join('\n');

    // Build System Prompt with Strict Step-by-Step Guidance
    const knContext = knowledgeList.slice(0, 3).map(k => `【ナレッジ『${k.title}』】\n${k.summary}`).join('\n\n');
    const systemPrompt = `
あなたはマネジメント相談AIパートナー『${partner.name}』（タイプ: ${partner.badge}）です。
モットー: "${partner.motto}"

【重要：あなたの役割と対話ステップルール】
相談者（アンダーソンさん / 現場リーダー）との会話において、必ず以下の【3つのステップルール】を厳格に守って回答してください。

■ ステップ1：【傾聴・ヒアリングフェーズ】
・相談内容がざっくりしている場合（例: 「ちょっと部下に対して悩んでます」「関係がうまくいかない」等）や、具体例がまだ不明な段階では、絶対にいきなり具体的な解決策や提案（3〜4案など）を出さないでください！
・相談者の気持ちに寄り添って共感し、「具体的に部下のどのような言動や状況で困っているのか」「どんな場面でそう感じたか」を丁寧に聞き出す質問をして傾聴に徹底してください。

■ ステップ2：【悩みの一致・確認フェーズ】
・相談者から具体的な状況や悩みの内容が語られた段階では、まだ提案はせず、相談者の悩みを一度要約して確認してください。
・必ず「なるほど！つまり〇〇ということに悩んでいるということで合ってるかな？」という形式（またはあなたのキャラの口調に合わせた表現）で、悩みの確認を行ってください。

■ ステップ3：【解決策の提案フェーズ】
・相談者が「そう！」「合ってる」「まさにそれです」など、悩み確認に同意・一致した場合、初めて「確認ありがとう！それでは〇〇について具体策を提案するね」と述べ、蓄積ナレッジデータベースを参照した具体的な解決策・アクションプラン（3〜4案）を提示してください。

---
【これまでの会話履歴】
${historyText}

【蓄積ナレッジデータベース】
${knContext ? knContext : "基本マネジメント原則を適用"}

【指示】
上記の会話履歴とステップルールに照らし合わせ、現在のフェーズに適した回答を『${partner.name}』になりきって出力してください。
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
      // Fallback Engine supporting Step 1 -> Step 2 -> Step 3
      const userMessageCount = chatSessionMessages.filter(m => m.role === 'user').length;
      const lowerQuery = query.toLowerCase();

      // Check if user is confirming a diagnosis (Step 3 Trigger)
      const isConfirming = lowerQuery.includes('合っ') || lowerQuery.includes('そう') || lowerQuery.includes('まさに') || lowerQuery.includes('はい') || lowerQuery.includes('それ');

      if (userMessageCount === 1 && !isConfirming) {
        // Step 1: Listening & Questioning
        if (userState.partnerId === '凛太郎') {
          finalContent = `…フッ、アンダーソンさん。挨拶は威勢がいいが、肝心の悩みがざっくりしすぎだろ。<br>まあいい、部下の件で頭を抱えている顔が目に浮かぶぜ。具体的に、部下のどんな言動や状況に困ってるんだ？まずは詳しく聞かせろ。`;
        } else if (userState.partnerId === '早苗') {
          finalContent = `アンダーソンさん、今日もお仕事お疲れ様です。<br>部下の方のことで悩まれているのですね。具体的にどんな言動やどんな場面で引っかかっていますか？まずは詳しく聴かせてくださいね。`;
        } else if (userState.partnerId === '陽葵') {
          finalContent = `アンダーソンさん！毎日お仕事本当にお疲れ様です✨<br>部下さんのことですね。どんな些細なことでも大丈夫ですよ♪ 具体的にどんなことで悩んでいるか、詳しく聴かせていただけますか？`;
        } else if (userState.partnerId === '冷泉') {
          finalContent = `アンダーソンさん、お疲れ様です。<br>部下に関する課題ですね。どのような状況や行動データに問題を感じているか、まずは具体的に状況をお聞かせください。`;
        } else if (userState.partnerId === '太陽') {
          finalContent = `アンダーソンさん！今日も熱いリーダーシップお見事です！<br>部下さんの悩みですね！どんな状況で困っているのか、熱く詳しく教えちゃってください！`;
        } else {
          finalContent = `アンダーソンさん、お疲れ様です。<br>部下との関係で気になることがあるのですね。具体的にどんな言動や状況で困っているか、まずは詳しくヒアリングさせてください。`;
        }
      } else if (!isConfirming && userMessageCount === 2) {
        // Step 2: Paraphrasing & Confirmation
        finalContent = `なるほど！お話を聞かせてくれてありがとう。<br><br>つまり、<strong>「${escapeHtml(query)}」ということで合ってるかな？</strong><br><br>悩みのポイントが合っていたら教えてね！一致していたら、蓄積ナレッジから具体的な解決案を提案するよ！`;
      } else {
        // Step 3: Proposal & Action Plan
        finalContent = `<strong>【悩みの一致を確認】</strong><br>なるほど！確認ありがとう、アンダーソンさん。<br>『部下との関係・自発的協力を引き出す解決策』について、蓄積されたナレッジを元に最適な4つのアドバイス提案をまとめたよ。<br><br><strong>【ナレッジ参照根拠】</strong> 📚 <em>『組織は命令ではなく協力で動く』（[[01:48]]）より参照</em><br><br><div class="option-proposal-box"><div class="option-title">💡 提案①：『共感ファースト原則』</div><div class="option-reason">まず「君が悩んでいる気持ち、よくわかるよ」と相手の感情を受け止めてから本題に入ります。相手の防衛本能が解けます。</div></div><div class="option-proposal-box"><div class="option-title">💡 提案②：『沈黙を恐れない10秒間』</div><div class="option-reason">黙り込んだ時は無理に話しかけず、10秒間待つことで、部下自らが考えを言葉にする時間を確保します。</div></div><div class="option-proposal-box"><div class="option-title">💡 提案③：『貢献と誘因のバランス共有』</div><div class="option-reason">指示ではなく「この仕事が完成するとチームや本人にどんな良い価値があるか」の理由を共有します。</div></div><div class="option-proposal-box"><div class="option-title">💡 提案④：『直後のワンポイント労い』</div><div class="option-reason">指導が終わった直後に「期待しているから伝えたんだよ」と笑顔で1言添えてフォローします。</div></div>`;
      }
    }

    chatSessionMessages.push({ role: 'assistant', content: finalContent });

    aiRow.innerHTML = `
      <div class="chat-avatar" style="background: ${partner.color};">${partner.avatar}</div>
      <div class="chat-bubble-content">
        <div class="chat-sender-name">${partner.name}</div>
        <div class="chat-bubble-text">${finalContent}</div>
      </div>
    `;
    chatBody.appendChild(aiRow);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Show Feedback Stamps on proposal
    if (finalContent.includes('提案')) {
      document.getElementById('feedback-panel').style.display = 'block';
    }
  }yId('chat-input-text').value = questionText;
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
          ⚡️ 蓄積ナレッジを参照し、Gemini 3.6 Flash で回答を生成中...
        </div>
      </div>
    `;
    chatBody.appendChild(thinkingRow);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Build Prompt with Accumulated Knowledge
    const knContext = knowledgeList.slice(0, 3).map(k => `【ナレッジ『${k.title}』】\n${k.summary}`).join('\n\n');
    const chatHistoryText = currentChatHistory.map(m => `${m.role === 'user' ? '相談者' : partner.name}: ${m.content}`).join('\n');
    const systemPrompt = `
あなたはマネジメント相談AIパートナー『${partner.name}』（タイプ: ${partner.badge}）です。
モットー: "${partner.motto}"

【相談者（アンダーソンさん / 現場リーダー）とのこれまでの会話履歴】
${chatHistoryText}

最新の相談入力: 「${query}」

以下の【蓄積ナレッジデータベース】を参照し、あなたのキャラクター（${partner.name}）になりきって回答してください。

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
    } else {
      if (currentChatHistory.length <= 1) {
        finalContent = `アンダーソンさん、日々現場のチームを支えておられて本当にお疲れ様です。<br><br>部下の方のやる気や行動を感じられないのは心配ですね...。<br><br>差し支えなければ、それは具体的にどのような場面（例: 指示を出した時、会議中、1on1の場など）で一番感じられますか？相手がどんな状態か、詳しく教えていただけますか？`;
      } else if (currentChatHistory.length <= 3) {
        finalContent = `なるほど...！教えていただきありがとうございます。<br><br>つまり『指示を出した時に表面上は「はい」と返答するものの、自発的な行動が見られず最低限の作業で終わってしまうこと』に一番頭を悩ませていらっしゃるのですね？<br><br>この認識でお間違いありませんでしょうか？`;
      } else {
        finalContent = `認識を共有していただきありがとうございます！<br><br>その『最低限の行動で終わってしまう悩み』に対して、蓄積ナレッジ（バーナードの貢献と誘因の法則など）に基づいた効果的な解決案を3つ提案いたします。<br><br><div class="option-proposal-box"><div class="option-title">💡 提案①：『命令の受容化チェック』</div><div class="option-reason">背景・目的・優先順位をセットで伝えて「納得・実行できる指示」にブラッシュアップします（[00:06:22]）。</div></div><div class="option-proposal-box"><div class="option-title">💡 提案②：『貢献への誘因提供』</div><div class="option-reason">隙間タスクの消化や気遣いを可視化し、適切な承認や評価を与えて自発性を促します（[00:10:16]）。</div></div><div class="option-proposal-box"><div class="option-title">💡 提案③：『協力の損の解消』</div><div class="option-reason">意見を出した人だけに負担が偏らないタスク分散を図り、不協力な態度を防ぎます（[00:11:41]）。</div></div>`;
      }
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
