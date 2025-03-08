import { error } from "console"
import fs  from "fs"

const readFile = (name) => {
    return new Promise((resolve,reject)=>{
        fs.readFile(name, (error,data) =>{
            if(error){
                reject(error)
            }else{
                resolve(data.toString())
            }
        })
    })
}

const writeFile = (name, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(name, data, (err) => {
            if (error) {
                reject(error)
            } else{
                resolve()
            }
        })
    })
}

readFile("instrukce.txt").then((instrukce)=>{
    const [vstup, vystup] = instrukce.trim().split(" ")

    return readFile(vstup).then((obsahVstupu) => {
        return writeFile(vystup, obsahVstupu)
    })
})
