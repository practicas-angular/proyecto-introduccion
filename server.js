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

    const interval = setInterval(() => {
      // 1. Create a proper object
      const dataObject = {
        message: `Message at ${new Date().toLocaleTimeString()}`,
        timestamp: new Date()
      };
      
      // 2. Stringify it and wrap it in the SSE 'data:' format
      res.write(`data: ${JSON.stringify(dataObject)}\n\n`);
    }, 2000);

    req.on("close", () => clearInterval(interval));
  })
  .listen(3001, () =>
    console.log("SSE Server running at http://localhost:3001/events"),
  );
