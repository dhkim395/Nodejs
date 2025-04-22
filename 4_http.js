const http = require("http");
const server = http.createServer((req, res) => {
  const url = req.url;
  //127.0.0.1:3000/ 같이 들어왔다면
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("home");
    // 127.0.0.1:3000/about
  } else if (url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("my page");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("not found");
  }
});

// 127.0.0.1 , http://localhost:3000/
server.listen(3000, () => {
  console.log("서버 실행 중");
});
