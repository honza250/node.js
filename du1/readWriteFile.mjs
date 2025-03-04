import fs from 'fs'
import path from 'path'

const instrukceSoubor = 'instrukce.txt'

if (!fs.existsSync(instrukceSoubor)) {
    console.error(`Chyba: Soubor "${instrukceSoubor}" neexistuje.`)
    process.exit(1)
}

const instrukce = fs.readFileSync(instrukceSoubor, 'utf-8').trim().split(/\s+/)

if (instrukce.length < 1 || instrukce.length > 2) {
    console.error('Chyba: Nesprávný formát souboru instrukce.txt. Očekáván jeden nebo dva názvy souborů.');
    process.exit(1)
}

const zdrojovySoubor = instrukce[0]
const cilovySoubor = instrukce[1] || `cilKopie-${path.parse(zdrojovySoubor).name}${path.extname(zdrojovySoubor)}`

if (!fs.existsSync(zdrojovySoubor)) {
    console.error(`Chyba: Zdrojový soubor "${zdrojovySoubor}" neexistuje.`)
    process.exit(1)
}

const obsah = fs.readFileSync(zdrojovySoubor, 'utf-8')

fs.writeFileSync(cilovySoubor, `${obsah}\n`,  { flag: 'a' })

console.log(`Soubor "${cilovySoubor}" byl úspěšně vytvořen a naplněn daty.`)

// Zkontrolujeme, zda již název cílového souboru není v instrukceSoubor
const instrukceObsah = fs.readFileSync(instrukceSoubor, 'utf-8')

if (!instrukceObsah.includes(cilovySoubor)) {
    // Pokud název cílového souboru není v instrukcích, přidáme ho
    fs.appendFileSync(instrukceSoubor, `\n${cilovySoubor}`)
    console.log(`Název cílového souboru "${cilovySoubor}" byl přidán do "${instrukceSoubor}".`)
} else {
    console.log(`Název cílového souboru "${cilovySoubor}" již existuje v "${instrukceSoubor}".`)
}