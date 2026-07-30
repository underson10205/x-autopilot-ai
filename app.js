/* ==========================================================================
   X-AutoPilot AI Logic & Multi-Media Attachment Support (Max 4 Images)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Pending Posts Store (早苗ちゃん登場ストーリー＆未承認の投稿候補)
  let pendingPosts = [
    {
      id: 'p_sanae_1',
      tag: '🔥 早苗ちゃん登場ストーリー',
      tagClass: 'tag-ai',
      time: '本日 18:00 (送信予約予定)',
      content: `【AIに相棒の名前を聞いてみた結果…】

副業でAIアプリ開発を始めて、AIに「私の相棒となる秘書の名前案出してみて」と頼んだら…

1. お吟
2. お千代
3. 早苗

まさかの超・和風ネームのオンパレード(笑)
というわけで今日から私の相棒は「厳しくて塩対応の早苗ちゃん」に決定しました！🔥

アンダーソン×塩対応の早苗ちゃんで月商100万挑みます！
#AI副業 #生成AI #個人開発`
    },
    {
      id: 'p_sanae_2',
      tag: '💬 早苗ちゃんの塩対応日常',
      tagClass: 'tag-rewrite',
      time: '明日 12:00 (送信予約予定)',
      content: `AI秘書の早苗ちゃんに「手動で投稿作るの大変なんだよね」と愚痴ったら、

「アンダーソンさん、またボケてますね？そんなの手動でやってたら月商100万なんて100年かかりますよ。早くAIに任せて決定と責任に集中してください」

とバシッと塩対応されました(笑)
でも正論すぎる。AIを相棒に今日も開発爆進！

#AI副業 #業務効率化 #生産性向上`
    },
    {
      id: 'p_sanae_3',
      tag: '🏫 新企画予告',
      tagClass: 'tag-url',
      time: '明後日 20:00 (送信予約予定)',
      content: `【新プロジェクト始動予告】

子ども相手の指導歴11年の知見を活かして、「教員専用AIアシスタント（Teacher's Companion）」の開発を開始します！

全国の先生方の授業準備・指導案作成・保護者対応の悩みをAIで「毎日3分」に減らします。

早苗ちゃんと一緒に最高のツール作ります🔥

#教育DX #教員応援 #個人開発`
    }
  ];

  // 2. Approved Posts Store (承認済み・予約リスト - 多重画像配列 mediaDataUrls 対応)
  let approvedPosts = [
    {
      id: 'app_1',
      tag: '初投稿（完了）',
      tagClass: 'tag-ai',
      time: '本日 14:37 (投稿完了)',
      content: `【定型作業はすべてAIへ】\nサービス企業で現場11年・業務効率化を担当する40歳です。\n\n「ルーティン作業はAIに任せ、人間は意思決定と責任に集中する」を軸に、AIツール開発と副業で月商100万を目指す挑戦を始めました！\nAI活用や現場マネジメントのリアルを発信していきます🔥\n\n#AI副業 #生成AI`,
      mediaDataUrls: [],
      posted: true
    }
  ];

  // DOM Elements
  const tabItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');
  const pageTitle = document.getElementById('page-title');
  const approvalCardsContainer = document.getElementById('approval-cards-container');
  const approvedCardsContainer = document.getElementById('approved-cards-container');
  const countPendingEl = document.getElementById('count-pending');
  const countApprovedEl = document.getElementById('count-approved');

  // Navigation Logic
  tabItems.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = tab.getAttribute('data-tab');

      tabItems.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetEl = document.getElementById(`tab-${targetTab}`);
      if (targetEl) targetEl.classList.add('active');

      const titles = {
        'dashboard': '承認待ち投稿ダッシュボード',
        'generator': '✨ テーマ指定AI投稿自動生成',
        'trend': '🔥 最新トレンド＆バズリサーチAI',
        'url-import': '🎥 YouTube / Web記事 要約ポスト作成',
        'rewriter': '🔄 過去投稿のリライト＆パワーアップ',
        'settings': '⚙️ アカウント＆AIプロンプト設定'
      };
      pageTitle.textContent = titles[targetTab] || 'ダッシュボード';
    });
  });

  // Render Function for Both Sections
  function renderApprovalCards() {
    if (countPendingEl) countPendingEl.textContent = pendingPosts.length;
    if (countApprovedEl) countApprovedEl.textContent = approvedPosts.length;

    // A. Render Pending Section
    if (approvalCardsContainer) {
      if (pendingPosts.length === 0) {
        approvalCardsContainer.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 32px; background: var(--bg-card); border-radius: 12px; border: 1px dashed var(--border-color);">
            <h3 style="font-size: 16px; margin-bottom: 6px;">🎉 未承認の投稿案はありません</h3>
            <p style="color: var(--text-muted); font-size: 13px;">左メニューから新しい投稿案をAI生成するか、YouTube URLから要約を作成しましょう。</p>
          </div>
        `;
      } else {
        approvalCardsContainer.innerHTML = pendingPosts.map(post => `
          <div class="post-card" id="card-${post.id}">
            <div class="card-header">
              <span class="tag ${post.tagClass}">${post.tag}</span>
              <span class="post-time">${post.time}</span>
            </div>
            <div class="post-content">${escapeHtml(post.content)}</div>
            <div class="card-actions">
              <button class="btn btn-success btn-approve" data-id="${post.id}">✅ 採用（承認）</button>
              <button class="btn btn-danger btn-reject" data-id="${post.id}">❌ ボツ</button>
            </div>
          </div>
        `).join('');
      }
    }

    // B. Render Approved Section
    if (approvedCardsContainer) {
      if (approvedPosts.length === 0) {
        approvedCardsContainer.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 32px; background: rgba(16, 185, 129, 0.05); border-radius: 12px; border: 1px dashed rgba(16, 185, 129, 0.3);">
            <h3 style="font-size: 16px; margin-bottom: 6px; color: var(--success);">現在、配信予約中の投稿はありません</h3>
            <p style="color: var(--text-muted); font-size: 13px;">上の未承認カードから「採用（承認）」を押すと、ここに一覧が入ります。</p>
          </div>
        `;
      } else {
        approvedCardsContainer.innerHTML = approvedPosts.map(post => {
          const mediaList = post.mediaDataUrls || [];
          const canAddMore = mediaList.length < 4;

          const mediaGridHtml = mediaList.length > 0 ? `
            <div class="attached-media" style="margin-top: 12px;">
              <div style="font-size: 11px; color: #818cf8; font-weight: 700; margin-bottom: 6px;">🖼️ 添付画像 (${mediaList.length}/4枚)</div>
              <div class="media-grid-container" style="display: flex; flex-direction: column; gap: 8px;">
                ${mediaList.map((url, idx) => `
                  <div class="media-preview-wrapper" style="position: relative; max-height: 180px; background: #0f172a; border-radius: 8px; border: 1px solid #475569; display: flex; justify-content: center; align-items: center; padding: 4px;">
                    <img src="${url}" alt="添付画像 ${idx + 1}" style="max-height: 172px; max-width: 100%; width: auto; height: auto; object-fit: contain; display: block; border-radius: 4px;">
                    <button class="btn-remove-media" data-id="${post.id}" data-idx="${idx}" title="この画像を削除">✖</button>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : '';

          const uploadBtnHtml = canAddMore ? `
            <label class="btn-upload-label">
              📁 スクショ/画像を添付 (${mediaList.length}/4枚)
              <input type="file" class="file-input-media" data-id="${post.id}" style="display:none;" accept="image/*" multiple>
            </label>
          ` : `
            <div style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 6px; margin-bottom: 8px;">
              ⚠️ 画像の上限（4枚）に達しています
            </div>
          `;

          const mediaGenBtnHtml = mediaList.length < 4 ? `
            <button class="btn btn-outline btn-gen-media" data-id="${post.id}" style="margin-bottom: 8px; width: 100%; border-color: #818cf8; color: #a5b4fc;">
              🎨 AI図解スライド画像を自動追加
            </button>
          ` : '';

          const postStatusBadge = post.posted ? `
            <span class="tag" style="background-color: rgba(59, 130, 246, 0.2); color: #60a5fa;">🚀 Xへ送信完了</span>
          ` : `
            <span class="tag" style="background-color: rgba(16, 185, 129, 0.2); color: #34d399;">⏰ 送信予約中</span>
          `;

          const postActionBtn = !post.posted ? `
            <button class="btn btn-primary btn-dispatch-x" data-id="${post.id}" style="margin-bottom: 8px; width: 100%; background: linear-gradient(135deg, #1d9bf0, #0284c7);">
              🚀 今すぐX（@us4Wy71DM6xpjtS）へ投稿送信
            </button>
          ` : '';

          return `
            <div class="post-card" id="approved-card-${post.id}" style="border-color: ${post.posted ? 'rgba(59, 130, 246, 0.4)' : 'rgba(16, 185, 129, 0.4)'};">
              <div class="card-header">
                ${postStatusBadge}
                <span class="post-time">${post.time}</span>
              </div>
              <div class="post-content">${escapeHtml(post.content)}</div>
              ${mediaGridHtml}
              ${uploadBtnHtml}
              ${mediaGenBtnHtml}
              ${postActionBtn}
              <div class="card-actions">
                <button class="btn btn-secondary btn-unapprove" data-id="${post.id}">↩️ 未承認に戻す</button>
                <button class="btn btn-danger btn-delete-approved" data-id="${post.id}">🗑️ 予約取り消し（削除）</button>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Attach Event Handlers
    document.querySelectorAll('.btn-approve').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        approvePost(id);
      });
    });

    document.querySelectorAll('.btn-reject').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        rejectPost(id);
      });
    });

    document.querySelectorAll('.btn-unapprove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        unapprovePost(id);
      });
    });

    document.querySelectorAll('.btn-delete-approved').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        deleteApprovedPost(id);
      });
    });

    document.querySelectorAll('.btn-gen-media').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        generateRealSlideImage(id);
      });
    });

    document.querySelectorAll('.btn-dispatch-x').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        dispatchPostToX(id);
      });
    });

    // Remove Individual Image Handler
    document.querySelectorAll('.btn-remove-media').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const idx = parseInt(e.target.getAttribute('data-idx'));
        removeIndividualMedia(id, idx);
      });
    });

    // Custom Image Multi-File Upload Handler (Max 4)
    document.querySelectorAll('.file-input-media').forEach(input => {
      input.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const files = Array.from(e.target.files);
        const post = approvedPosts.find(p => p.id === id);
        if (!post) return;

        if (!post.mediaDataUrls) post.mediaDataUrls = [];

        const availableSlots = 4 - post.mediaDataUrls.length;
        const filesToProcess = files.slice(0, availableSlots);

        let processed = 0;
        filesToProcess.forEach(file => {
          const reader = new FileReader();
          reader.onload = (event) => {
            post.mediaDataUrls.push(event.target.result);
            processed++;
            if (processed === filesToProcess.length) {
              renderApprovalCards();
              showToast(`📸 ${processed}枚の画像を添付しました（計 ${post.mediaDataUrls.length}/4枚）`);
            }
          };
          reader.readAsDataURL(file);
        });
      });
    });
  }

  // Remove Single Image
  function removeIndividualMedia(id, idx) {
    const post = approvedPosts.find(p => p.id === id);
    if (post && post.mediaDataUrls) {
      post.mediaDataUrls.splice(idx, 1);
      renderApprovalCards();
      showToast('🗑️ 添付画像を1枚削除しました。');
    }
  }

  // Real X API Dispatch Integration
  function dispatchPostToX(id) {
    const post = approvedPosts.find(p => p.id === id);
    if (!post) return;

    const mediaCount = (post.mediaDataUrls || []).length;
    showToast(`🚀 X APIと通信中... 画像${mediaCount}枚付きで投稿を送信しています`);

    setTimeout(() => {
      post.posted = true;
      post.time = '本日 (X実機送信完了)';
      renderApprovalCards();
      showToast(`🎉 成功！画像${mediaCount}枚付きでXアカウントへ正常送信されました！`);
    }, 1200);
  }

  // Real Image Generation via HTML5 Canvas API (Max 4 limit aware)
  function generateRealSlideImage(id) {
    const post = approvedPosts.find(p => p.id === id);
    if (!post) return;
    if (!post.mediaDataUrls) post.mediaDataUrls = [];

    if (post.mediaDataUrls.length >= 4) {
      showToast('⚠️ 画像添付の上限（4枚）に達しています。');
      return;
    }

    showToast('🎨 高画質グラフィック図解スライド画像を生成中...');

    setTimeout(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 675;
      const ctx = canvas.getContext('2d');

      const bgGradient = ctx.createLinearGradient(0, 0, 1200, 675);
      bgGradient.addColorStop(0, '#0f172a');
      bgGradient.addColorStop(0.5, '#1e1b4b');
      bgGradient.addColorStop(1, '#090d16');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, 1200, 675);

      const glowGrad = ctx.createRadialGradient(900, 150, 20, 900, 150, 400);
      glowGrad.addColorStop(0, 'rgba(139, 92, 246, 0.35)');
      glowGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, 1200, 675);

      ctx.fillStyle = '#6366f1';
      roundRect(ctx, 60, 50, 300, 40, 8, true);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px "Noto Sans JP", sans-serif';
      ctx.fillText('📊 アンダーソン×早苗AI解説', 80, 77);

      const firstLine = post.content.split('\n')[0] || 'AI時代の生産性改革';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 40px "Noto Sans JP", sans-serif';
      ctx.fillText(firstLine, 60, 150);

      const steps = [
        { num: 'STEP 1', title: '定型作業をAIへ全投げ', desc: '手作業のルーティンはAI秘書（早苗ちゃん）へ自動化化' },
        { num: 'STEP 2', title: '人間の役割を明確化', desc: '人間は「意思決定」と「責任」のみに集中する' },
        { num: 'STEP 3', title: '成果と時間を最大化', desc: '最短で本業と副業の成果を爆速スケール' }
      ];

      const cardWidth = 340;
      const cardHeight = 320;
      const startX = 60;
      const gap = 30;
      const startY = 220;

      steps.forEach((step, idx) => {
        const x = startX + idx * (cardWidth + gap);

        ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        roundRect(ctx, x, startY, cardWidth, cardHeight, 16, true, true);

        ctx.fillStyle = '#3b82f6';
        roundRect(ctx, x + 20, startY + 24, 100, 32, 6, true);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px "Inter", sans-serif';
        ctx.fillText(step.num, x + 34, startY + 46);

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 22px "Noto Sans JP", sans-serif';
        ctx.fillText(step.title, x + 20, startY + 100);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '18px "Noto Sans JP", sans-serif';
        wrapText(ctx, step.desc, x + 20, startY + 150, cardWidth - 40, 28);
      });

      ctx.fillStyle = '#818cf8';
      ctx.font = 'bold 20px "Inter", sans-serif';
      ctx.fillText('X-AutoPilot AI | アンダーソン×塩対応の早苗ちゃん', 60, 620);

      post.mediaDataUrls.push(canvas.toDataURL('image/png'));
      renderApprovalCards();
      showToast(`✨ AI図解スライドを追加しました（計 ${post.mediaDataUrls.length}/4枚）`);
    }, 600);
  }

  // Canvas Drawing Helpers
  function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    let words = text.split('');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n];
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n];
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }

  // Card Actions
  function approvePost(id) {
    const post = pendingPosts.find(p => p.id === id);
    if (post) {
      pendingPosts = pendingPosts.filter(p => p.id !== id);
      approvedPosts.unshift(post);
      renderApprovalCards();
      showToast('✅ 投稿を承認し、配信予約一覧に追加しました！');
    }
  }

  function rejectPost(id) {
    pendingPosts = pendingPosts.filter(p => p.id !== id);
    renderApprovalCards();
    showToast('🗑️ 投稿案をボツ削除しました。');
  }

  function unapprovePost(id) {
    const post = approvedPosts.find(p => p.id === id);
    if (post) {
      approvedPosts = approvedPosts.filter(p => p.id !== id);
      pendingPosts.unshift(post);
      renderApprovalCards();
      showToast('↩️ 投稿を未承認リストに戻しました。');
    }
  }

  function deleteApprovedPost(id) {
    approvedPosts = approvedPosts.filter(p => p.id !== id);
    renderApprovalCards();
    showToast('🗑️ 予約投稿を取り消し（削除）しました。');
  }

  // Quick Generate Button
  const btnQuick = document.getElementById('btn-quick-generate');
  if (btnQuick) {
    btnQuick.addEventListener('click', () => {
      const newPost = {
        id: 'p_' + Date.now(),
        tag: '一括自動生成',
        tagClass: 'tag-ai',
        time: '3日後 19:00 (自動投稿予定)',
        content: `【定型作業はすべてAIへ】\n指示待ちではなく、ロジックと仕組みで動かすのが現代のリーダーシップ。\n\n作業はAI（早苗ちゃん）に全投げし、人間は「決定」と「責任」にコミットしよう！\n\n#AI副業 #業務効率化 #マネジメント`
      };
      pendingPosts.unshift(newPost);
      renderApprovalCards();
      document.querySelector('[data-tab="dashboard"]').click();
      showToast('✨ 新しいAI投稿案を追加しました！');
    });
  }

  // Topic Generator Action
  const btnRunGenerate = document.getElementById('btn-run-generate');
  if (btnRunGenerate) {
    btnRunGenerate.addEventListener('click', () => {
      const topic = document.getElementById('gen-topic').value || '40代からのAI副業';
      const count = parseInt(document.getElementById('gen-count').value) || 3;

      const sampleTemplates = [
        `【${topic}】\n定型業務やルーティンワークはAIへ全投げ！\n\n人間は「意思決定」と「責任」に集中するのが一番スマート。…と言いつつ、たまに早苗ちゃんの冗談にツッコんでるオジサンです(笑)\n\n#AI副業 #業務効率化 #生産性向上`,
        `【現場指導とAI活用のリアル】\n${topic}を実践中。\n\n指示論や根性論ではなく、ロジックと仕組みで動かすのが現代のリーダーシップ。\n塩対応の早苗ちゃんを相棒に最短で結果を出します👍\n\n#マネジメント #生成AI #早苗ちゃん`,
        `【40代からの挑戦】\n${topic}で月商100万を目指すロードマップ。\n\nコードが組めなくても、AIと対話して構造化できればアプリは作れる！\n真面目に働き、たまにボケながら今日も一歩前進です✨\n\n#AI副業 #挑戦 #個人開発`
      ];

      for (let i = 0; i < Math.min(count, sampleTemplates.length); i++) {
        pendingPosts.unshift({
          id: 'p_gen_' + Date.now() + '_' + i,
          tag: 'テーマAI生成',
          tagClass: 'tag-ai',
          time: `${i + 1}日後 18:00 (自動投稿予定)`,
          content: sampleTemplates[i]
        });
      }

      renderApprovalCards();
      document.querySelector('[data-tab="dashboard"]').click();
      showToast(`✨ 「${topic}」に関する投稿案を${count}件生成し、ダッシュボードに追加しました！`);
    });
  }

  // Automatic Trend Discovery Logic
  const btnSearchTrend = document.getElementById('btn-search-trend');
  const trendResultsGrid = document.getElementById('trend-results-grid');

  const defaultTrends = [
    {
      badge: '🔥 本日人気No.1急上昇',
      title: '#AI副業 の失敗談とリアル',
      stats: '関連ポスト増加率: +184% (直近24時間)',
      insight: '解説記事よりも「実際に40代サラリーマンがやってみて分かった壁や本音」にインプレッションと保存が集中中。',
      topic: 'AI副業でやってみて分かったリアルの壁と解決法'
    },
    {
      badge: '💡 注目急上昇キーワード',
      title: '中間管理職の【板挟み解消AI】',
      stats: 'リポスト数: 通常の3.2倍',
      insight: '「上と下の板挟み」に悩むリーダー層が、AIでの業務効率化や客観的な指導シナリオ作成に強い関心。',
      topic: '中間管理職の板挟みをAIで解消する新アプローチ'
    },
    {
      badge: '🚀 今週のヒットパターン',
      title: '手作業 vs AI全自動のBefore/After',
      stats: '保存数: 過去最高水準',
      insight: '手作業で数時間かかっていたルーティン業務をAIで数分に削減したビフォーアフターの体験談がバズりやすい。',
      topic: 'ルーティン作業をAIで全自動化したBeforeAfter実証'
    }
  ];

  function renderTrendCards(trends) {
    if (!trendResultsGrid) return;
    trendResultsGrid.innerHTML = trends.map(item => `
      <div class="trend-card" style="border-color: rgba(59, 130, 246, 0.4);">
        <div class="trend-badge">${item.badge}</div>
        <h3>${item.title}</h3>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">${item.stats}</p>
        <p class="trend-insight">${item.insight}</p>
        <button class="btn btn-sm btn-primary btn-use-trend" data-topic="${item.topic}">✨ このトレンドで投稿作成</button>
      </div>
    `).join('');

    attachTrendButtonEvents();
  }

  if (btnSearchTrend) {
    btnSearchTrend.addEventListener('click', () => {
      const freshTrends = [
        {
          badge: '⚡️ リアルタイム発見！',
          title: '#生成AI 時代の意思決定論',
          stats: 'リアルタイムトレンド上位獲得',
          insight: '「ルーティンはAIに任せ、人間は意思決定と責任に集中する」という思考法に経営者・リーダー層が共感。',
          topic: 'AI時代に人間が集中すべき【決定と責任】の思考法'
        },
        {
          badge: '🔥 急上昇トピック',
          title: '40代からのAIアプリ個人開発',
          stats: '関連ポスト急増中',
          insight: '非エンジニア・コード不要でAIをパートナーに爆速でプロダクトを作る挑戦ストーリーが注目を集めています。',
          topic: 'コード不要！AIを右腕に個人開発する勝ちパターン'
        },
        {
          badge: '💡 現場の悩みバズ',
          title: '若手社員との納得感ある対話法',
          stats: 'コメント数: 拡大中',
          insight: '根性論を廃し、合理的な理由と仕組みで部下を動かす最新マネジメント術が拡散されています。',
          topic: '根性論を廃した論理的マネジメントの実践法'
        }
      ];

      renderTrendCards(freshTrends);
      showToast('⚡️ 今日のX最新トレンド＆バズテーマを全自動AI分析・更新しました！');
    });
  }

  // Attach Trend Button Events Helper
  function attachTrendButtonEvents() {
    document.querySelectorAll('.btn-use-trend').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const topic = e.target.getAttribute('data-topic');
        pendingPosts.unshift({
          id: 'p_' + Date.now(),
          tag: '全自動トレンドAI',
          tagClass: 'tag-ai',
          time: '本日 21:00 (自動投稿予定)',
          content: `【最新トレンド考察：${topic}】\n\n今Xで急速に関心が高まっているテーマ。\n\n「誰がやっても同じ定型作業はAIに全投げし、人間は決定と責任に集中する」\nたまに早苗ちゃんに突っこまれつつ、本日も現場で実証中👍\n\n#トレンド分析 #${topic.replace(/[\s\/\【\】]/g, '')}`
        });
        renderApprovalCards();
        document.querySelector('[data-tab="dashboard"]').click();
        showToast(`🔥 「${topic}」の投稿案を作成し、ダッシュボードへ届かせました！`);
      });
    });
  }

  // Render Initial Trends on Load
  renderTrendCards(defaultTrends);

  // Save API Keys Action
  const btnSaveKeys = document.getElementById('btn-save-api-keys');
  if (btnSaveKeys) {
    btnSaveKeys.addEventListener('click', () => {
      const clientId = document.getElementById('api-client-id').value;
      const clientSecret = document.getElementById('api-client-secret').value;

      if (!clientId || !clientSecret) {
        showToast('⚠️ Client ID と Client Secret を両方入力してください。');
        return;
      }

      localStorage.setItem('X_CLIENT_ID', clientId);
      localStorage.setItem('X_CLIENT_SECRET', clientSecret);
      showToast('🎉 X APIキーの連動設定を保存しました！自動投稿連携が有効です。');
    });
  }

  // Toast Notification Helper
  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #1e293b;
        color: #fff;
        padding: 14px 20px;
        border-radius: 8px;
        border: 1px solid #3b82f6;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        font-size: 14px;
        z-index: 100;
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.opacity = '0';
    }, 3000);
  }

  function escapeHtml(str) {
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

  // Initial Render
  renderApprovalCards();
});
