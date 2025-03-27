import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { logger } from "hono/logger"
import { serveStatic } from "@hono/node-server/serve-static"
import { renderFile } from "ejs"

const todos = [
    {
        id:1,
        title: "pivo",
        done: false,
    },
    {
        id: 2,
        title: "skripty",
        done:false,
    },
]

const app = new Hono()

app.use(logger())
app.use(serveStatic({ root: "public" }))

app.get("/", async (c) => {
    const rendered = await renderFile("views/index.html",{
        title: "my todos list",
        todos,
    })

    return c.html(rendered)
})

app.post("/todos", async(c) =>{
    const formBody = await c.req.formData()

    todos.push({
        id:todos.length + 1,
        title: form.get("title"),
        done:false,
    })

    return c.redirect("/")
})

serve (app, (info) => {
    console.log("App started on http://localhost:" + info.port)
})