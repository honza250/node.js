import * as fs from "fs/promises";

async function parallelFileCreation() {
    try {
        const data = await fs.readFile("instrukce.txt", "utf8");
        const n = parseInt(data.trim(), 10);

        const tasks = Array.from({ length: n + 1 }, (_, i) =>
            fs.writeFile(`${i}.txt`, `Soubor ${i}`)
        );

        await Promise.all(tasks);

        console.log(`Vytvořeno ${n + 1} souborů.`);
    } catch (error) {
        console.error("Chyba:", error);
    }
}

parallelFileCreation();
