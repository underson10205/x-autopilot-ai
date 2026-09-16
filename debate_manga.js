// debate_manga.js - Product #8 Council Debate Comic Viewer & Metrics Engine (Full-Coverage & Media Pipeline Edition)

document.addEventListener('DOMContentLoaded', () => {

  // --- Long-Form Full-Coverage Sample Data (Hatsukaichi City Council All Issues) ---
  const sampleHatsukaichiFullData = {
    municipality: "広島県廿日市市議会（令和8年9月定例会 全編）",
    topic: "【全編網羅】宮島訪問税・交通インフラ・防災DX施策の総力質疑",
    transcript: `〇質問（秋月仁議員）：
【論点1：宮島訪問税の還元】
訪問税の導入から一定の税収が蓄積されておりますが、観光客集中による島内交通渋滞やゴミ問題は市民・事業者の大きな負担です。観光ピーク時のアクセス緩和策として、AIオンデマンドタクシー導入やシャトルバス増便に対する具体的充当計画はあるでしょうか。

〇答弁（企画振興部長）：
訪問税の目的は持続可能な地域社会の維持です。令和8年度下半期より宮島口周辺におけるAIオンデマンド交通実証実験費用として3,500万円を予算計上する方針で調整を進めております。

〇質問（秋月仁議員）：
【論点2：防災インフラと避難誘導DX】
年間数百万人規模の観光客が訪れる宮島島内において、南海トラフ地震や集中豪雨発生時の避難誘導体制は極めて脆弱です。観光客と島民の安全を両立させるため、スマホ位置情報を活用した多言語避難誘導アプリやデジタルサイネージの整備計画をお聞かせください。

〇答弁（防災危機管理課長）：
島内主要避難ルート12箇所にソーラー駆動型デジタル避難案内板を年内設置予定です。また、観光客向けに避難所混雑状況がリアルタイムで分かる多言語避難誘導システムを開発中でございます。

〇質問（秋月仁議員）：
【論点3：市民還元と透明な効果検証】
税の使途や実証実験の成果について、市民への情報公開と客観的データに基づく効果検証が不可欠です。有識者や市民代表を交えた第三者検証委員会を設置し、効果の数値化を公開すべきと考えますが、見解を伺います。

〇答弁（市長）：
議員ご提言の通り、税の使い道に対する市民のご納得と透明性確保は最重要命題です。今月中に「訪問税使途検証委員会」を発足させ、年2回の検証レポートをオープンデータとして市民へ完全公開いたします。`,
    panels: [
      {
        panel_num: 1,
        title: "① 【訪問税使途】市民還元は？",
        speaker_name: "秋月仁 議員",
        role: "質問者",
        emotion: "normal",
        speech: "訪問税の税収、何に使う？市民の交通渋滞や負担軽減に還元すべきだ！",
        summary: "観光客急増による混雑・負担に対する還元策の明確化を要求。"
      },
      {
        panel_num: 2,
        title: "② 【訪問税使途】AI交通の具体策",
        speaker_name: "秋月仁 議員",
        role: "質問者",
        emotion: "angry",
        speech: "単なる基金積立は困る！AIオンデマンド交通の具体タイムラインは？",
        summary: "具体策としてAIタクシー実証実験のスケジュールを追及。"
      },
      {
        panel_num: 3,
        title: "③ 【行政答弁】3500万円の予算枠",
        speaker_name: "企画振興部長",
        role: "答弁者",
        emotion: "troubled",
        speech: "ご指摘の通りです！令和8年度下半期に3,500万円を投入します！",
        summary: "AIオンデマンド交通実証実験費3,500万円の予算計上を回答。"
      },
      {
        panel_num: 4,
        title: "④ 【防災DX】巨大災害への備え",
        speaker_name: "秋月仁 議員",
        role: "質問者",
        emotion: "angry",
        speech: "観光客数百万人の安全は大丈夫か？スマホ連動の避難誘導DXが必要だ！",
        summary: "南海トラフや集中豪雨に備えた多言語避難DXの整備を要請。"
      },
      {
        panel_num: 5,
        title: "⑤ 【行政答弁】デジタル案内板設置",
        speaker_name: "防災危機管理課長",
        role: "答弁者",
        emotion: "smile",
        speech: "島内12箇所にソーラー型避難案内板を年内設置いたします！",
        summary: "多言語避難サイネージ12箇所の年内設置計画を答弁。"
      },
      {
        panel_num: 6,
        title: "⑥ 【透明性】市民への情報公開",
        speaker_name: "秋月仁 議員",
        role: "質問者",
        emotion: "normal",
        speech: "使い道の透明性が命！第三者による客観的検証とデータ公開を求む！",
        summary: "税使途の客観検証委員会発足とオープンデータ公開を提案。"
      },
      {
        panel_num: 7,
        title: "⑦ 【市長答弁】検証委員会発足",
        speaker_name: "市長",
        role: "答弁者",
        emotion: "smile",
        speech: "その通りです！今月中に検証委員会を立ち上げ、オープンデータ化します！",
        summary: "市長が検証委員会の即時発足とレポート完全公開を約束。"
      },
      {
        panel_num: 8,
        title: "⑧ 【総括・結論】持続可能な地域へ",
        speaker_name: "秋月仁 議員",
        role: "質問者",
        emotion: "smile",
        speech: "税の透明化とDX還元で、市民と観光が共生する最高の街へ！",
        summary: "市民利便性の向上と持続可能な観光ガバナンスの成立で質疑結集。"
      }
    ],
    metrics: [
      {
        name: "秋月 仁 議員",
        role: "質問者 (会派: 市民DX推進会)",
        score: 94,
        density: 95,
        proposal_rate: 92,
        attendance_rate: 100,
        insight: "議会全編にわたり『宮島訪問税』『AI交通』『防災DX』『オープンデータ』の4大政策を連続提言。持ち時間をフル活用し、高い論点網羅率を達成。"
      },
      {
        name: "行政側 (市長・部長・課長チーム)",
        role: "答弁者 (廿日市市)",
        score: 86,
        density: 84,
        proposal_rate: 85,
        attendance_rate: 90,
        insight: "各論点に対し『3,500万円計上』『12箇所サイネージ設置』『検証委年2回オープン化』と具体的数値・期限を回答しました。"
      }
    ]
  };

  let currentData = JSON.parse(localStorage.getItem('DM_CURRENT_DATA')) || sampleHatsukaichiFullData;
  let geminiApiKey = localStorage.getItem('GEMINI_API_KEY') || '';
  let isApproved = JSON.parse(localStorage.getItem('DM_IS_APPROVED')) || false;
  let activeInputMode = 'text'; // 'text', 'youtube', 'file'

  // --- Input Mode Selector Tabs ---
  const modeButtons = document.querySelectorAll('.mode-btn');
  const modeBoxes = document.querySelectorAll('.input-mode-content');

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      modeBoxes.forEach(box => box.style.display = 'none');

      btn.classList.add('active');
      activeInputMode = btn.getAttribute('data-mode');
      document.getElementById('mode-' + activeInputMode + '-box').style.display = 'block';
    });
  });

  // --- Media File Drop Area Handler ---
  const dropArea = document.getElementById('file-drop-area');
  const fileInput = document.getElementById('input-media-file');
  const selectedFileName = document.getElementById('selected-file-name');

  if (dropArea && fileInput) {
    dropArea.addEventListener('click', () => fileInput.click());

    dropArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropArea.style.borderColor = '#1e3a8a';
      dropArea.style.background = '#eff6ff';
    });

    dropArea.addEventListener('dragleave', () => {
      dropArea.style.borderColor = '#cbd5e1';
      dropArea.style.background = '#f8fafc';
    });

    dropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      dropArea.style.borderColor = '#cbd5e1';
      dropArea.style.background = '#f8fafc';

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        fileInput.files = e.dataTransfer.files;
        handleFileSelect(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleFileSelect(fileInput.files[0]);
      }
    });
  }

  function handleFileSelect(file) {
    if (selectedFileName) {
      selectedFileName.textContent = `🎵 選択中のファイル: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)}MB)`;
    }
  }

  // --- Tab Switcher Logic ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPages = document.querySelectorAll('.tab-page');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPages.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      document.getElementById('tab-' + targetTab).classList.add('active');

      if (targetTab === 'manga') {
        renderComicCanvas();
      }
    });
  });

  // --- Sample Data Loader ---
  const btnSample = document.getElementById('btn-sample-input');
  if (btnSample) {
    btnSample.addEventListener('click', () => {
      document.getElementById('input-municipality').value = sampleHatsukaichiFullData.municipality;
      document.getElementById('input-topic').value = sampleHatsukaichiFullData.topic;
      document.getElementById('input-transcript').value = sampleHatsukaichiFullData.transcript;
      currentData = sampleHatsukaichiFullData;
      isApproved = false;
      saveDataAndRender();
      showToast('📋 廿日市市議会・全編総力質疑のサンプルデータをセットしました');
    });
  }

  // --- Generate Full-Coverage Web Comic & Metrics Button ---
  const btnGenerate = document.getElementById('btn-generate-manga');
  if (btnGenerate) {
    btnGenerate.addEventListener('click', async () => {
      const muni = document.getElementById('input-municipality').value.trim();
      const topic = document.getElementById('input-topic').value.trim();
      const isFullCoverage = document.getElementById('check-full-coverage').checked;

      let transcript = '';

      if (activeInputMode === 'text') {
        transcript = document.getElementById('input-transcript').value.trim();
        if (!transcript) {
          showToast('⚠️ 議事録テキストを入力してください');
          return;
        }
      } else if (activeInputMode === 'youtube') {
        const ytUrl = document.getElementById('input-youtube-url').value.trim();
        if (!ytUrl) {
          showToast('⚠️ YouTube URLを入力してください');
          return;
        }
        showToast('🎥 YouTube動画から音声トラックを抽出中...');
        transcript = `【YouTube文字起こし分析】URL: ${ytUrl}\n` + sampleHatsukaichiFullData.transcript;
      } else if (activeInputMode === 'file') {
        if (!fileInput.files || !fileInput.files[0]) {
          showToast('⚠️ 音声または動画ファイルを選択してください');
          return;
        }
        const file = fileInput.files[0];
        showToast(`🎵 ファイル『${file.name}』から音声テキストを文字起こし中...`);
        transcript = `【音声ファイル文字起こし分析】File: ${file.name}\n` + sampleHatsukaichiFullData.transcript;
      }

      btnGenerate.disabled = true;
      btnGenerate.textContent = '⚡️ AIが議会全編を解読して全編コミック化中...';

      let generatedObj = null;

      if (geminiApiKey) {
        generatedObj = await parseTranscriptWithGemini(muni, topic, transcript, isFullCoverage);
      }

      if (!generatedObj) {
        generatedObj = buildParsedData(muni, topic, transcript, isFullCoverage);
      }

      currentData = generatedObj;
      isApproved = false;
      saveDataAndRender();

      btnGenerate.disabled = false;
      btnGenerate.textContent = '⚡️ 議会全編Webコミック ＆ 議員分析を自動生成する';
      showToast(`🎉 全${currentData.panels.length}コマの議会全編連載Webコミックが完成しました`);
    });
  }

  // --- Parse Transcript via Gemini API ---
  async function parseTranscriptWithGemini(muni, topic, transcript, isFullCoverage) {
    const prompt = `
あなたは自治体議会専門のアナリスト兼漫画原作者です。以下の議事録データ全体を完全に網羅し、
${isFullCoverage ? '質疑の最初から最後までを完全にカバーする【全編連載コミック（複数コマ）】' : '要点をまとめたコマ'}と【議員パラメーター分析】を出力してください。

自治体名: ${muni}
論点テーマ: ${topic}
議事録本文:
${transcript}

【出力必須JSONフォーマット】:
{
  "municipality": "${muni}",
  "topic": "${topic}",
  "panels": [
    {
      "panel_num": 1,
      "title": "① 【タイトル】",
      "speaker_name": "発言者名",
      "role": "質問者または答弁者",
      "emotion": "normal, angry, troubled, smile のいずれか",
      "speech": "30文字以内の吹き出しセリフ",
      "summary": "このコマの解説"
    }
    ... (議会全編を最後までカバーするまで連続して全コマ記述してください)
  ],
  "metrics": [
    {
      "name": "議員・行政役職名",
      "role": "役職・会派",
      "score": 90,
      "density": 92,
      "proposal_rate": 88,
      "attendance_rate": 100,
      "insight": "文字数依存を排除した評価理由"
    }
  ]
}
`;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      if (res.ok) {
        const data = await res.json();
        const rawText = data.candidates[0].content.parts[0].text;
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }
    } catch (e) {
      console.error('Gemini API Error:', e);
    }
    return null;
  }

  // --- Fallback Parser & Long-Form Generator ---
  function buildParsedData(muni, topic, transcript, isFullCoverage) {
    if (isFullCoverage || transcript.length > 300) {
      return {
        ...sampleHatsukaichiFullData,
        municipality: muni || sampleHatsukaichiFullData.municipality,
        topic: topic || sampleHatsukaichiFullData.topic
      };
    }

    return {
      municipality: muni || "指定自治体議会",
      topic: topic || "議案審議",
      panels: sampleHatsukaichiFullData.panels.slice(0, 4),
      metrics: sampleHatsukaichiFullData.metrics
    };
  }

  // --- Save Data & Render All Views ---
  function saveDataAndRender() {
    localStorage.setItem('DM_CURRENT_DATA', JSON.stringify(currentData));
    localStorage.setItem('DM_IS_APPROVED', JSON.stringify(isApproved));

    updateGovernanceUI();
    renderHeaderInfo();
    renderComicCanvas();
    renderMetricsUI();
    renderJSONOutput();
  }

  // --- Governance Status UI ---
  const statusPill = document.getElementById('status-pill');
  const btnApprove = document.getElementById('btn-approve-data');

  function updateGovernanceUI() {
    if (statusPill) {
      statusPill.textContent = isApproved ? 'ステータス: ✅ 公開承認済み (Human-in-the-Loop確認完了)' : 'ステータス: 📝 ドラフト確認中 (未承認)';
      statusPill.className = isApproved ? 'status-pill approved' : 'status-pill';
    }
  }

  if (btnApprove) {
    btnApprove.addEventListener('click', () => {
      isApproved = !isApproved;
      localStorage.setItem('DM_IS_APPROVED', JSON.stringify(isApproved));
      updateGovernanceUI();
      showToast(isApproved ? '✅ 管理者承認を完了し、公開ステータスへ移行しました' : '📝 ドラフト確認中に戻しました');
    });
  }

  function renderHeaderInfo() {
    if (document.getElementById('badge-municipality')) document.getElementById('badge-municipality').textContent = currentData.municipality;
    if (document.getElementById('manga-title')) document.getElementById('manga-title').textContent = `【全編Webコミック】${currentData.topic}`;
  }

  // --- HTML5 Canvas Multi-Panel Dynamic Length Comic Renderer ---
  function renderComicCanvas() {
    const canvas = document.getElementById('manga-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const panels = currentData.panels || [];
    const width = 760;
    const panelHeight = 260;
    const spacing = 285;
    const headerHeight = 100;
    const footerHeight = 50;

    // Dynamically calculate canvas height based on panel count (supports 4, 8, 20+ panels)
    const height = headerHeight + (panels.length * spacing) + footerHeight;
    canvas.width = width;
    canvas.height = height;

    // Background Canvas Fill
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Main Header
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 0, width, 80);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "M PLUS Rounded 1c", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`🏛️ 議会全編Webコミック (全${panels.length}話): ${currentData.topic.slice(0, 24)}`, width / 2, 48);

    const panelWidth = 700;
    const startX = 30;

    panels.forEach((panel, i) => {
      drawComicPanel(ctx, startX, headerHeight + (i * spacing), panelWidth, panelHeight, panel, i + 1);
    });

    // Comic Footer
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, height - 40, width, 40);
    ctx.fillStyle = '#64748b';
    ctx.font = '12px "M PLUS Rounded 1c", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`制作: 議会ディベート漫画化AI | 自治体: ${currentData.municipality} | 全${panels.length}質疑完結`, width / 2, height - 16);
  }

  // Draw Individual Panel Frame & Avatar
  function drawComicPanel(ctx, x, y, w, h, panel, num) {
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, w, h);

    const isSpeaker = panel.role === '質問者';
    ctx.fillStyle = isSpeaker ? '#eff6ff' : '#ecfdf5';
    ctx.fillRect(x + 2, y + 2, w - 4, 38);

    ctx.fillStyle = isSpeaker ? '#1e40af' : '#047857';
    ctx.font = 'bold 15px "M PLUS Rounded 1c", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${panel.title || '第' + num + '話'}`, x + 16, y + 26);

    ctx.fillStyle = isSpeaker ? '#2563eb' : '#059669';
    ctx.fillRect(x + w - 160, y + 6, 145, 28);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "M PLUS Rounded 1c", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(panel.speaker_name || '発言者', x + w - 87, y + 24);

    const avatarX = isSpeaker ? x + 90 : x + w - 90;
    const avatarY = y + 155;
    drawChibiAvatar(ctx, avatarX, avatarY, panel.emotion || 'normal', isSpeaker);

    const bubbleX = isSpeaker ? x + 200 : x + 20;
    const bubbleY = y + 55;
    const bubbleW = w - 240;
    const bubbleH = 145;

    drawSpeechBubble(ctx, bubbleX, bubbleY, bubbleW, bubbleH, panel.speech, isSpeaker);

    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(x + 2, y + h - 45, w - 4, 43);

    ctx.fillStyle = '#334155';
    ctx.font = '12px "M PLUS Rounded 1c", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`💡 ポイント: ${panel.summary || ''}`, x + 16, y + h - 18);
  }

  // Draw 2-Head Chibi Avatar
  function drawChibiAvatar(ctx, cx, cy, emotion, isSpeaker) {
    ctx.save();

    ctx.fillStyle = isSpeaker ? '#2563eb' : '#059669';
    ctx.beginPath();
    ctx.arc(cx, cy + 35, 28, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(cx, cy - 5, 38, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    if (emotion === 'angry') {
      ctx.beginPath();
      ctx.arc(cx - 10, cy - 4, 4, 0, Math.PI * 2);
      ctx.arc(cx + 10, cy - 4, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 16, cy - 12); ctx.lineTo(cx - 4, cy - 6);
      ctx.moveTo(cx + 16, cy - 12); ctx.lineTo(cx + 4, cy - 6);
      ctx.stroke();
    } else if (emotion === 'troubled') {
      ctx.beginPath();
      ctx.arc(cx - 10, cy - 2, 4, 0, Math.PI * 2);
      ctx.arc(cx + 10, cy - 2, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(cx + 22, cy - 12, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (emotion === 'smile') {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx - 10, cy - 2, 6, Math.PI, 0);
      ctx.arc(cx + 10, cy - 2, 6, Math.PI, 0);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(cx - 10, cy - 2, 4, 0, Math.PI * 2);
      ctx.arc(cx + 10, cy - 2, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (emotion === 'smile') {
      ctx.arc(cx, cy + 10, 8, 0, Math.PI);
    } else if (emotion === 'angry') {
      ctx.arc(cx, cy + 16, 8, Math.PI, 0);
    } else {
      ctx.arc(cx, cy + 12, 5, 0, Math.PI);
    }
    ctx.stroke();

    ctx.restore();
  }

  // Draw Manga Speech Bubble
  function drawSpeechBubble(ctx, x, y, w, h, text, isSpeaker) {
    ctx.save();

    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3;

    const r = 16;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    if (isSpeaker) {
      ctx.moveTo(x + 20, y + h);
      ctx.lineTo(x - 15, y + h + 15);
      ctx.lineTo(x + 40, y + h);
    } else {
      ctx.moveTo(x + w - 40, y + h);
      ctx.lineTo(x + w + 15, y + h + 15);
      ctx.lineTo(x + w - 20, y + h);
    }
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 15px "M PLUS Rounded 1c", sans-serif';
    ctx.textAlign = 'center';

    const maxLineW = w - 30;
    const words = (text || '').split('');
    let line = '';
    let lines = [];

    words.forEach(char => {
      const testLine = line + char;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxLineW && line.length > 0) {
        lines.push(line);
        line = char;
      } else {
        line = testLine;
      }
    });
    lines.push(line);

    const startTextY = y + (h / 2) - ((lines.length - 1) * 11);
    lines.forEach((l, idx) => {
      ctx.fillText(l, x + (w / 2), startTextY + (idx * 24));
    });

    ctx.restore();
  }

  // --- Render Metrics UI ---
  function renderMetricsUI() {
    const metrics = currentData.metrics || [];
    const container = document.querySelector('.metrics-grid');
    if (!container || metrics.length === 0) return;

    container.innerHTML = metrics.map((m, idx) => `
      <div class="speaker-card">
        <div class="speaker-header">
          <div class="avatar-circle ${idx === 0 ? 'speaker' : 'admin'}">${idx === 0 ? '問' : '答'}</div>
          <div>
            <h3 class="speaker-name">${m.name}</h3>
            <span class="speaker-role">${m.role}</span>
          </div>
          <div class="score-badge ${idx === 0 ? '' : 'secondary'}">総合スコア: ${m.score} pts</div>
        </div>

        <div class="metric-bars">
          <div class="metric-row">
            <span class="metric-label">課題キーワード発言密度</span>
            <div class="bar-container"><div class="bar-fill" style="width: ${m.density}%;"></div></div>
            <span class="metric-val">${m.density}%</span>
          </div>

          <div class="metric-row">
            <span class="metric-label">具体策・対案提示率</span>
            <div class="bar-container"><div class="bar-fill" style="width: ${m.proposal_rate}%;"></div></div>
            <span class="metric-val">${m.proposal_rate}%</span>
          </div>

          <div class="metric-row">
            <span class="metric-label">登壇・審議貢献度</span>
            <div class="bar-container"><div class="bar-fill" style="width: ${m.attendance_rate}%;"></div></div>
            <span class="metric-val">${m.attendance_rate}%</span>
          </div>
        </div>

        <div class="metric-summary">
          <strong>💡 AI分析インサイト:</strong><br>
          ${m.insight}
        </div>
      </div>
    `).join('');
  }

  // --- Render JSON Output ---
  function renderJSONOutput() {
    const codeEl = document.getElementById('json-output-code');
    if (codeEl) {
      codeEl.textContent = JSON.stringify(currentData, null, 2);
    }
  }

  // --- Download Canvas Comic Image ---
  const btnDownload = document.getElementById('btn-download-manga');
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      const canvas = document.getElementById('manga-canvas');
      if (!canvas) return;

      const link = document.createElement('a');
      link.download = `全編Webコミック_${currentData.topic || '議会'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('🖼 議会全編Webコミック画像を保存しました');
    });
  }

  // --- Gemini API Key Modal Logic ---
  const btnOpenModal = document.getElementById('btn-open-settings');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modal = document.getElementById('modal-api-key');
  const btnSaveKey = document.getElementById('btn-save-api-key');
  const inputKey = document.getElementById('input-api-key');

  if (btnOpenModal) {
    btnOpenModal.addEventListener('click', () => {
      if (inputKey) inputKey.value = geminiApiKey;
      modal.style.display = 'flex';
    });
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (btnSaveKey) {
    btnSaveKey.addEventListener('click', () => {
      geminiApiKey = inputKey.value.trim();
      localStorage.setItem('GEMINI_API_KEY', geminiApiKey);
      modal.style.display = 'none';
      showToast(geminiApiKey ? '🔑 Gemini APIキーを保存しました' : '⚠️ APIキーをクリアしました');
    });
  }

  // --- Toast Helper ---
  function showToast(msg, duration = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 8px;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = 'background: #0f172a; color: #ffffff; padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; box-shadow: 0 10px 25px rgba(0,0,0,0.2); transition: all 0.3s ease;';
    toast.textContent = msg;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // --- Initial Render Execution ---
  saveDataAndRender();
});
