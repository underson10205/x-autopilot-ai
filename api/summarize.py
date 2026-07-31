from http.server import BaseHTTPRequestHandler
import json
import urllib.request
import re
import os

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        try:
            req = json.loads(post_data.decode('utf-8'))
            url = req.get("url", "")
            memo = req.get("memo", "")
            api_key = req.get("api_key", "") or os.environ.get("GEMINI_API_KEY", "")
            persona = req.get("persona", "40代、現場指導歴11年・元SE。論理的だが親しみやすいAI副業挑戦者")

            # Extract basic URL info
            is_youtube = "youtube.com" in url or "youtu.be" in url

            # 1. Fetch Real Title & Metadata from YouTube / Web Page
            title = ""
            author = ""
            
            if is_youtube:
                try:
                    oembed_url = f"https://www.youtube.com/oembed?url={urllib.parse.quote(url)}&format=json"
                    req_oembed = urllib.request.Request(oembed_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req_oembed, timeout=3) as resp_o:
                        oembed_data = json.loads(resp_o.read().decode('utf-8'))
                        title = oembed_data.get('title', '')
                        author = oembed_data.get('author_name', '')
                except Exception as ex_y:
                    print("oEmbed fetch failed:", ex_y)
            else:
                try:
                    req_web = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req_web, timeout=3) as resp_w:
                        html_text = resp_w.read().decode('utf-8', errors='ignore')
                        title_match = re.search(r'<title[^>]*>(.*?)</title>', html_text, re.IGNORECASE)
                        if title_match:
                            title = title_match.group(1).strip()
                except Exception as ex_w:
                    print("Web fetch failed:", ex_w)

            # Fallback title if scraping fails
            if not title:
                title = "話題の動画・記事"

            # 2. Build High-Density Prompt (Learned persona from @underson_____)
            learned_persona = "うぃるそん/アンダーソン（40代兼業トレーダー＆AI副業挑戦者）。「家族と一緒に自由を手に入れること」を目的に挑戦中！検証とリアルの差や損切りの悔しさも『(;´∀｀)』『😢』と素直に共有する誠実で等身大の語り口。ルールとリスクリワード（R:R）を徹底重視。"
            
            if is_youtube:
                prompt_task = f"""
以下のYouTube動画について、動画タイトル『{title}』（投稿者: {author}）とメモから、
【発信者ペルソナ】: {learned_persona}
のスタンスで、X（旧Twitter）用の投稿文（130文字以内、改行あり、ハッシュタグ含む）を作成してください。

動画タイトル: {title}
メモ/感想: {memo}

【絶対ルール】
- 上から目線ではなく「この動画観てすごく勉強になった(;´∀｀)」「こんなことまで解説されてて感謝です✨」という謙虚で素直な感心・学びの口調にする。
- 絵文字として『(;´∀｀)』『😢』『✨』『🔥』を自然に使用すること。
- 改行を含めて120〜130文字以内にぴったり納めること。
- 文字数オーバー厳禁。
- ハッシュタグ3つ（#AI副業 #生成AI #個人開発 など）を含めること。
"""
            else:
                prompt_task = f"""
以下のWeb記事『{title}』について、初心者AI副業挑戦者（40代・素直な驚きと感動ストーリー）のスタンスで、X用の投稿文（130文字以内、改行あり、ハッシュタグ含む）を作成してください。

記事タイトル: {title}
メモ/感想: {memo}

【絶対ルール】
- 「この記事のここが凄かった…！」「初心者だけど勉強になった！」という素直な驚き・感心スタンスにする。
- 改行を含めて120〜130文字以内に納めること。
- ハッシュタグ3つを含めること。
"""

            # 3. Call Gemini API if Key available, else use Real Title Dynamic Generator
            result_post = ""
            if api_key:
                try:
                    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
                    payload = { "contents": [{"parts": [{"text": prompt_task}]}] }
                    headers = {'Content-Type': 'application/json'}
                    req_obj = urllib.request.Request(gemini_url, data=json.dumps(payload).encode('utf-8'), headers=headers)
                    with urllib.request.urlopen(req_obj, timeout=5) as resp:
                        resp_data = json.loads(resp.read().decode('utf-8'))
                        result_post = resp_data['candidates'][0]['content']['parts'][0]['text'].strip()
                except Exception as ex_g:
                    print("Gemini API call failed:", ex_g)

            if not result_post:
                # Real Title Dynamic Generator (Humble Amazed Beginner Stance)
                short_title = title[:35] + ("…" if len(title) > 35 else "")
                memo_snippet = f"\n\n『{memo[:30]}』" if memo else ""
                
                if is_youtube:
                    result_post = f"【動画を観て大感動…！📺】\n『{short_title}』{memo_snippet}\n\nこの動画の解説が凄すぎて初心者の自分には目から鱗でした…！無料動画でここまで学べる時代感謝です✨\n\n#AI副業 #生成AI #個人開発"
                else:
                    result_post = f"【この記事が刺さった…！📰】\n『{short_title}』{memo_snippet}\n\n40代からのAI副業挑戦中ですが、この記事の考え方にすごく共感！勉強になります✨\n\n#業務効率化 #生成AI #AI副業"

            # Strict Length Safety Guard (<= 130 chars)
            if len(result_post) > 130:
                result_post = result_post[:120] + "…✨\n\n#AI副業 #生成AI"

            res = {"success": True, "result": result_post, "title": title}
            self.wfile.write(json.dumps(res, ensure_ascii=False).encode('utf-8'))
        except Exception as e:
            res = {"success": False, "error": str(e)}
            self.wfile.write(json.dumps(res, ensure_ascii=False).encode('utf-8'))
