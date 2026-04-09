const http = require("http");

http
  .createServer((req, res) => {
    // These headers are mandatory for SSE
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*", // Allows Angular to talk to it
    });

    console.log("Client connected!");

    // Send a message every 2 seconds
    const interval = setInterval(() => {
      res.write(`data: Message at ${new Date().toLocaleTimeString()}\n\n`);
    }, 2000);

    req.on("close", () => clearInterval(interval));
  })
  .listen(3000, () =>
    console.log("SSE Server running at http://localhost:3000/events"),
  );
