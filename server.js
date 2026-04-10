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

    let progressValue = 0;

    const interval = setInterval(() => {
      const dataObject = {
        message: `Message at ${new Date().toLocaleTimeString()}`,
        timestamp: new Date(),
      };
      res.write(`data: ${JSON.stringify(dataObject)}\n\n`);

      progressValue = (progressValue + 10) % 110; // Loop 0 to 100
      res.write(`event: progress\n`); // Name the event
      res.write(`data: ${JSON.stringify({ value: progressValue })}\n\n`);

      if (progressValue === 100) {
        res.write(`event: alert\n`);
        res.write(`data: Cycle completed successfully!\n\n`);
      }
    }, 2000);

    req.on("close", () => clearInterval(interval));
  })
  .listen(3001, () =>
    console.log("SSE Server running at http://localhost:3001/events"),
  );
