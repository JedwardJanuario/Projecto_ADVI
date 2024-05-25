import {Router} from 'express'
import usuariosController from './app/controllers/usuariosController.js';

const routes = new Router()

// Rotas das Páginas
routes.get("/",(req,res)=>{res.render('login-register/login-register')})
routes.get("/home",(req,res)=>{res.render('index/index')})
routes.get("/cadastro",(req,res)=>{res.render('cadastrar/cadastrar')})
routes.get("/marcacoes",(req,res)=>{res.render('marcacoes/marcacoes')})
routes.get("/carros",usuariosController.readcarrosByType)
routes.get("/hotel",usuariosController.readhotelByPlace)
routes.get("/casas",usuariosController.readcasasByPlace)
routes.get("/associacao",(req,res)=>{res.render('associacao/associacao')})
routes.get('/logado',(req,res)=>{res.render("logado/logado")})
routes.get('/Recuperacao',(req,res)=>{res.render("esqueceuSenha/senhasesquecidas")})
routes.get('/Erro',(req,res)=>{res.render("paginaErro/erro")})
//rotas de recupercao de senha
routes.post('/Recuperarsenhas',usuariosController.recuperarsenha)
// fim rotas da Paginas

// rotas de usuarios
routes.post('/Admin',usuariosController.validate)
routes.post('/criarconta',usuariosController.createUsuarios)
routes.post('/actualizarusuarios',usuariosController.updateUsuarios)
routes.post('/deletarusuarios',usuariosController.deleteUsuarios)
//rotas de viagens
routes.post('/actualizarviagens',usuariosController.updateagendamentos)
routes.post('/deletarviagens/:id',usuariosController.deletaragendamentos)
routes.post('/inserirviagens',usuariosController.createagendamentos)

//rotas do carro
routes.post('/buscarCarros',usuariosController.readcarrosByType)

//rotas do aluguercarros
routes.post('/alugarCarro',usuariosController.createaluguercarro)
routes.post('/deletaraluguercarro/:id',usuariosController.deletaraluguercarros)
routes.post('/actualizaraluguercarro',usuariosController.updatealuguercarro)

//rotas do aluguerhotel
routes.post('/alugarHotel',usuariosController.createaluguerhoteis)
routes.post('/deletaraluguerhotel/:id',usuariosController.deletaraluguerhoteis)
routes.post('/actualizaraluguerhotel',usuariosController.updatealuguerhoteis)

//rotas da casas
routes.post('/Buscarcasas',usuariosController.readcasasByPlace)

//rotas do hotel
routes.post('/BuscarhotelPorLugar',usuariosController.readhotelByPlace)

//rotas do arrendamento
routes.post('/alugarcasas',usuariosController.createarrendamento)
routes.post('/deletaraluguercasa/:id',usuariosController.deletararrendamentos)
routes.post('/actualizaraluguercasa',usuariosController.updatearrendamentos)

export default routes
