import http.server
import socketserver
import os

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Check if the requested file path actually exists
        if os.path.exists(self.translate_path(self.path)) and not os.path.isdir(self.translate_path(self.path)):
            # If it's a real file (like editor.js or a favicon), serve it normally
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        else:
            # If it's *not* a real file (it's your base64url path), serve index.html
            try:
                self.path = 'index.html'
                return http.server.SimpleHTTPRequestHandler.do_GET(self)
            except:
                # Fallback for server errors
                self.send_error(404, "File not found (even index.html)")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"HTTP server: serving at port {PORT} with catch-all routing")
    print(f"HTTP server: 127.0.0.1:{PORT}")
    httpd.serve_forever()