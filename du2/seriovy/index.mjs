import * as fs from "fs/promises";

async function serialFileCreation() {
    try {
        const data = await fs.readFile("instrukce.txt", "utf8");
        const n = parseInt(data.trim(), 10);

        for (let i = 0; i <= n; i++) {
            await fs.writeFile(`${i}.txt`, `Soubor ${i}`);
        }

        console.log(`Vytvořeno ${n + 1} souborů.`);
    } catch (error) {
        console.error("Chyba:", error);
    }
}

serialFileCreation();
