import express from 'express'
import routes from './routes.js'
import bodyParser  from 'body-parser'

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(express.static('public'))
app.use('/css', express.static('public/css'))
app.use('/js', express.static('public/js'))
app.use('/img', express.static('public/img'))
app.use('/marcacoes', express.static('views/marcacoes'))
app.use('/login', express.static('views/login'))
app.use('/index', express.static('views/index'))
app.use('/cadastrar', express.static('views/cadastrar'))
app.use('/casas', express.static('views/casas'))
app.use('/carros', express.static('views/carros'))
app.use('/hotel', express.static('views/hotel'))
app.use('/associacao', express.static('views/associacao'))
app.use('/admin', express.static('views/admin'))
app.use('/logado', express.static('views/logado'))
app.use('/login-register', express.static('views/login-register'))
app.use('/esqueceuSenha', express.static('views/esqueceuSenha'))
app.use('/PaginaErro', express.static('views/paginaErro'))
app.set('view engine','ejs')
app.use(routes)

export default app
