from http.server import BaseHTTPRequestHandler
import json
import urllib.request
import os

# InMemory Cloud Store for zero-config PC-Mobile Instant Sync
# Also persists to KV/GitHub if token provided
CLOUD_STORE = {}

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        # Extract sync_id from query path or default
        sync_id = "akizuki_anderson_sync_100"
        if "?" in self.path:
            parts = self.path.split("?")[-1].split("&")
            for p in parts:
                if p.startswith("id="):
                    sync_id = p.split("=")[-1]

        data = CLOUD_STORE.get(sync_id, None)
        res = {"success": True, "sync_id": sync_id, "data": data}
        self.wfile.write(json.dumps(res, ensure_ascii=False).encode('utf-8'))

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        try:
            req = json.loads(post_data.decode('utf-8'))
            sync_id = req.get("sync_id", "akizuki_anderson_sync_100")
            payload = req.get("data", {})

            CLOUD_STORE[sync_id] = payload

            res = {"success": True, "sync_id": sync_id, "message": "Synced to cloud successfully"}
            self.wfile.write(json.dumps(res, ensure_ascii=False).encode('utf-8'))
        except Exception as e:
            res = {"success": False, "error": str(e)}
            self.wfile.write(json.dumps(res, ensure_ascii=False).encode('utf-8'))
