import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { logger } from "hono/logger"
import { serveStatic } from "@hono/node-server/serve-static"
import { renderFile } from "ejs"

const todos = [
  { id: 1, title: "Zajít na pivo", done: false },
  { id: 2, title: "Doplnit skripty", done: false },
]

const app = new Hono()

app.use(logger())
app.use(serveStatic({ root: "public" }))

// 🏠 Hlavní stránka se seznamem Todoček
app.get("/", async (c) => {
  const rendered = await renderFile("views/index.html", {
    title: "My Todo App",
    todos,
  })
  return c.html(rendered)
})

// 🆕 Přidání nového Todočka (OPRAVENO)
app.post("/todos", async (c) => {
  const form = await c.req.formData()
  const title = String(form.get("title")) // Oprava: správný formát

  if (!title.trim()) {
    return c.text("Chyba: Titulek nemůže být prázdný!", 400)
  }

  todos.push({
    id: todos.length + 1,
    title,
    done: false,
  })

  return c.redirect("/")
})

// 📝 Detail jednoho Todočka
app.get("/todo/:id", async (c) => {
  const id = Number(c.req.param("id"))
  const todo = todos.find((t) => t.id === id)

  if (!todo) return c.notFound()

  const rendered = await renderFile("views/todo.html", { todo })
  return c.html(rendered)
})

// ✏️ Úprava titulku Todočka
app.post("/todo/:id/edit", async (c) => {
  const id = Number(c.req.param("id"))
  const form = await c.req.formData()
  const newTitle = String(form.get("title"))

  const todo = todos.find((t) => t.id === id)
  if (!todo) return c.notFound()

  if (!newTitle.trim()) {
    return c.text("Chyba: Titulek nemůže být prázdný!", 400)
  }

  todo.title = newTitle
  return c.redirect(`/todo/${id}`)
})

// 🔄 Přepnutí stavu Todočka
app.get("/todo/:id/toggle", async (c) => {
  const id = Number(c.req.param("id"))
  const todo = todos.find((t) => t.id === id)
  if (!todo) return c.notFound()

  todo.done = !todo.done
  return c.redirect(`/todo/${id}`)
})

// ❌ Smazání Todočka
app.get("/todo/:id/remove", async (c) => {
  const id = Number(c.req.param("id"))
  const index = todos.findIndex((t) => t.id === id)
  if (index === -1) return c.notFound()

  todos.splice(index, 1)
  return c.redirect("/")
})

serve(app, (info) => {
  console.log("App started on http://localhost:" + info.port)
})
