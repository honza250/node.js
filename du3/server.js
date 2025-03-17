const http = require("http");
const { getCounter, setCounter } = require("./counter");

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  if (req.url === "/") {
    // Homepage
    res.end("NODE.JS");
  } else if (req.url === "/increase") {
    await modifyCounter(res, 1);
  } else if (req.url === "/decrease") {
    await modifyCounter(res, -1);
  } else if (req.url === "/read") {
    try {
      const counter = await getCounter();
      res.end(counter.toString());
    } catch (error) {
      res.writeHead(500);
      res.end("Chyba serveru");
    }
  } else {
    res.writeHead(404);
    res.end("404 - Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});

// Pomocná funkce pro změnu hodnoty counteru
async function modifyCounter(res, delta) {
  try {
    let counter = await getCounter();
    counter += delta;
    await setCounter(counter);

    if (!res.writableEnded) {
      res.end("OK");
    }
  } catch (error) {
    if (!res.writableEnded) {
      res.writeHead(500);
      res.end("Chyba serveru");
    }
  }
}
