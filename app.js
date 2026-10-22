
const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  // Backend health-check API
  if (url.pathname === "/api/health") {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8"
    });

    res.end(JSON.stringify({
      status: "success",
      message: "Node.js backend is working!",
      timestamp: new Date().toISOString()
    }));
    return;
  }

  let requestedPath;

  try {
    requestedPath = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400);
    res.end("Bad request");
    return;
  }

  if (requestedPath === "/") {
    requestedPath = "/index.html";
  }

  const filePath = path.resolve(PUBLIC_DIR, "." + requestedPath);

  // Prevent requests from accessing files outside public/
  if (!filePath.startsWith(PUBLIC_DIR + path.sep)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(error.code === "ENOENT" ? 404 : 500, {
        "Content-Type": "text/plain; charset=utf-8"
      });

      res.end(error.code === "ENOENT"
        ? "404 - File not found"
        : "Internal server error");
      return;
    }

    const contentType =
      mimeTypes[path.extname(filePath).toLowerCase()] ||
      "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
    console.error("Stop the previous server or use another port.");
  } else {
    console.error(error);
  }
});

server.listen(PORT, () => {
  const siteUrl = `http://localhost:${PORT}`;

  console.log("==================================");
  console.log(" DevOpsFlow is running!");
  console.log(" Website: " + siteUrl);
  console.log(" Health:  " + siteUrl + "/api/health");
  console.log(" Press Ctrl+C to stop");
  console.log("==================================");

  // Open Chrome automatically on Windows.
  // Skip browser opening in CI and Docker.
  if (
    process.platform === "win32" &&
    process.env.OPEN_BROWSER !== "false" &&
    !process.env.CI &&
    !process.env.DOCKER
  ) {
    exec(`start "" chrome "${siteUrl}"`, (error) => {
      if (error) {
        console.log("Could not open Chrome automatically.");
        console.log("Open this URL manually: " + siteUrl);
      }
    });
  }
});
