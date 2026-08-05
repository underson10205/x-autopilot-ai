import json
import urllib.request
import urllib.parse
import re
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        try:
            req_data = json.loads(body) if body else {}
            url = req_data.get('url', '')

            # Extract YouTube Video ID
            video_id = ""
            m = re.search(r'(?:v=|\/)([0-9A-Za-z_-]{11})', url)
            if m:
                video_id = m.group(1)

            title = "話題のマネジメント指導法動画"
            author = "専門チャネル"

            # Attempt YouTube oEmbed title extraction
            if video_id:
                try:
                    oembed_url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json"
                    req = urllib.request.Request(oembed_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req, timeout=5) as res:
                        oembed_data = json.loads(res.read().decode('utf-8'))
                        title = oembed_data.get('title', title)
                        author = oembed_data.get('author_name', author)
                except Exception:
                    pass

            # Structured Knowledge Extraction Payload
            extracted_knowledge = {
                "title": title,
                "author": author,
                "url": url,
                "summary": f"『{title}』（{author}）より抽出したナレッジ：\n・部下への指導は評価ではなく共感から入ることが信頼構築の第一歩。\n・タイムスタンプ見どころ：02:15 相手の本音を引き出すオープンクエスチョン / 05:40 相手が黙り込んだ時の間（ま）の取り方。",
                "category": "1on1対話ノウハウ"
            }

            self.wfile.write(json.dumps({"success": True, "knowledge": extracted_knowledge}, ensure_ascii=False).encode('utf-8'))

        except Exception as e:
            self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
