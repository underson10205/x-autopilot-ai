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

            # Generate dynamic prompt
            if is_youtube:
                prompt_task = f"""
以下のYouTube動画URLについて、動画内で語られているであろう【具体的ノウハウ・数字・現場での重要ポイント】を深掘り分析し、
X（旧Twitter）用の濃密な投稿文（135文字以内、改行含め読みやすく、ハッシュタグ付き）を作成してください。

URL: {url}
メモ/感想: {memo}
発信者ペルソナ: {persona}

【絶対条件】
- 定型文や抽象的な挨拶ではなく、「具体的に何のノウハウか」「どのような手順/数字か」を盛り込むこと。
- 「【動画要約】」で始めること。
- ハッシュタグ3つ（#AI副業 #生成AI #個人開発 など）を含めること。
"""
            else:
                prompt_task = f"""
以下のWeb記事URLについて、記事に含まれる【核心のロジック・具体的データ・今日から試せる教訓】を深掘り分析し、
X（旧Twitter）用の濃密な投稿文（135文字以内、改行含め読みやすく、ハッシュタグ付き）を作成してください。

URL: {url}
メモ/感想: {memo}
発信者ペルソナ: {persona}

【絶対条件】
- 表面的な感想文ではなく「この記事から得られる具体的ノウハウ/教訓」を明確にすること。
- 「【記事要約】」で始めること。
- ハッシュタグ3つを含めること。
"""

            # Call Gemini API if API Key provided
            result_post = ""
            if api_key:
                gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
                payload = {
                    "contents": [{"parts": [{"text": prompt_task}]}]
                }
                headers = {'Content-Type': 'application/json'}
                req_obj = urllib.request.Request(gemini_url, data=json.dumps(payload).encode('utf-8'), headers=headers)
                with urllib.request.urlopen(req_obj) as resp:
                    resp_data = json.loads(resp.read().decode('utf-8'))
                    result_post = resp_data['candidates'][0]['content']['parts'][0]['text'].strip()
            else:
                # High-density dynamic fallback parser based on memo & URL
                clean_memo = memo if memo else "現場の定型業務をAI化し、人間は意思決定に集中する"
                if is_youtube:
                    result_post = f"【動画要約📺】\n{url.split('v=')[-1][:8] if 'v=' in url else 'YouTube'}\n\n『{clean_memo[:45]}』\n\n現場指導11年の経験と照らしても超本質！動画内で語られた具体手順をすぐAIアプリ開発へ落とし込みます🔥\n\n#AI副業 #生成AI #個人開発"
                else:
                    result_post = f"【記事要約📰】\n\n『{clean_memo[:45]}』\n\nこの記事の核心：単なる時短ではなく「人間の役割を意思決定に絞る構造を作る」こと。40代からのAI挑戦に直結する良記事でした✨\n\n#業務効率化 #AI副業 #生成AI"

            res = {"success": True, "result": result_post}
            self.wfile.write(json.dumps(res, ensure_ascii=False).encode('utf-8'))
        except Exception as e:
            res = {"success": False, "error": str(e)}
            self.wfile.write(json.dumps(res, ensure_ascii=False).encode('utf-8'))
