const fs = require("fs").promises;
const FILE_PATH = "counter.txt";

// Načte aktuální hodnotu counteru, pokud soubor neexistuje, vytvoří ho s nulou
async function getCounter() {
  try {
    const data = await fs.readFile(FILE_PATH, "utf8");
    return parseInt(data, 10);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(FILE_PATH, "0", "utf8");
      return 0;
    }
    throw error;
  }
}

// Uloží novou hodnotu counteru
async function setCounter(value) {
  await fs.writeFile(FILE_PATH, value.toString(), "utf8");
}

module.exports = { getCounter, setCounter };
