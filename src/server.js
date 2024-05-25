import app from "./app.js"

const PORT = 8080

app.listen(PORT, ()=> {
    console.log(` Servidor Rodando no endereço http://localhost:${PORT}`)

})
