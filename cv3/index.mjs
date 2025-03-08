import fs from "fs/promises"
import util from "util"

const readFile = util.promisify(fs.readFile)

readFile