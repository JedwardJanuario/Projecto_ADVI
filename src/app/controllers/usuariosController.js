import { DadosDeEmail, EnviarEmail } from "../../emails.js";
import conexao from "../database/conexao.js"
let listaderesultados = []
let id_usuario
let viagensCd;
let usuariosCd
let user
let voos
let arrendamentos
let arrendamento
let aluguercarros
let aluguercarro
let aluguerhoteis
let aluguerhotel
let empresas
let hoteis
let carros
let casas
let funcionarios
let nomeuser
let senhauser
class usuariosController {

    async validate(req,res){
       
        const nome = req.body.nome
        const senha = req.body.senha
        nomeuser = nome
        senhauser = senha
        const sql = ` select * from usuarios where nome='${nome}' and senha='${senha}' limit 1`
        const sql_funcionarios = ` select * from funcionarios where nome='${nome} ' and senha='${senha}' `
        
        conexao.query(sql,(erro,dadosUsuario)=>{
            if(erro)
                res.send(erro)
            else if (dadosUsuario == 0){
                
                conexao.query(sql_funcionarios,(erro,dadosfunccionarios)=>{
                    if(erro)
                        res.send(erro)
                    else if(dadosfunccionarios == 0){
                        res.render("paginaErro/erro")
                    }else{
                        const sqlhoteis =  ` select * from hoteis `
                        conexao.query(sqlhoteis,(erro,resultado)=>{                     
                            hoteis = resultado
                            if(erro)
                                console.log(erro)
                            else{
                                const sqlcasas =  ` select * from casas `
                                conexao.query(sqlcasas,(erro,resultado)=>{                     
                                    casas = resultado
                                    if(erro)
                                        console.log(erro)
                                    else{
                                        const sqlcarros =  ` select * from carros `
                                        conexao.query(sqlcarros,(erro,resultado)=>{                     
                                        carros = resultado
                                        console.log(carros)
                                        if(erro)
                                            console.log(erro)
                                        else{

                                            const sqlcadastro =  ` select * from cadastros `
                                            conexao.query(sqlcadastro,(erro,resultado)=>{                     
                                                funcionarios = resultado
                                                if(erro){
                                                    console.log(erro)                                                }
                                                else{
                                                    const sqlempresas = "Select * from empresas"
                                                    conexao.query(sqlempresas,(erro,resultado)=>{                     
                                                        empresas = resultado
                                                        if(erro){
                                                            console.log(erro)
                                                        }
                                                        else{
                                                            const sqlcasasalugadas = `
                                                            select u.nome as nome , u.email as email , c.pais as pais , c.cidade as cidade ,  c.preco as preco , r.data_reserva as datareserva 
                                                            , r.num_dias  as dias
                                                            from arrendamentos r join casas c on r.idcasa = c.id join usuarios u on r.id_usuario = u.id order by nome;`
                                                            conexao.query(sqlcasasalugadas,(erro,resultado)=>{
                                                                arrendamento  = resultado
                                                                if(erro)
                                                                    console.log(erro)
                                                                else{
                                                                    const sqlvoos = `select u.nome as nome , u.email as email , a.classe as classe, a.cidade as cidade , a.pais as pais ,
                                                                     a.data as data ,a.tipoBilhete as tipoBilhete 
                                                                    from agendamentos a join usuarios u on a.id_usuario = u.id order by nome `
                                                                    conexao.query(sqlvoos,(erro,resultado)=>{
                                                                        voos = resultado
                                                                        if(erro)
                                                                            console.log(erro)
                                                                        else{
                                                                            const sqlhoteisalugados = `
                                                                            select u.nome as nome , u.email as email , h.pais as pais , h.nome as hotel , h.cidade as cidade ,a.preco as preco  , a.num_dias  as dias
                                                                            from aluguerhoteis a join hoteis h on a.id_hotel = h.id join usuarios u on a.id_usuario = u.id order by nome; `
                                                                            conexao.query(sqlhoteisalugados,(erro,resultado)=>{
                                                                                aluguerhotel = resultado 
                                                                                if(erro)
                                                                                    console.log(erro)
                                                                                else{
                                                                                    const sqlcarrosalugadas = `
                                                                                    select u.nome as nome , u.email as email , c.marca as marca , c.modelo as modelo , c.valor as valor ,c.tipo as tipo,
                                                                                     a.local_entrega as entrega , a.local_devolucao  as devolucao
                                                                                    from aluguercarros a join carros c on a.id_carro = c.id join usuarios u on a.id_usuario = u.id order by nome; `
                                                                                    
                                                                                    conexao.query(sqlcarrosalugadas,(erro,resultado)=>{
                                                                                        aluguercarro = resultado
                                                                                        console.log(aluguercarro)
                                                                                        if(erro)
                                                                                            console.log(erro)
                                                                                        else{
                                                                                            const sqlusuarios = "select * from usuarios"
                                                                                            conexao.query(sqlusuarios,(erro,resultado)=>{
                                                                                                user = resultado
                                                                                                if(erro)
                                                                                                    console.log(erro)
                                                                                                else{
                                                                                                    
                                                                                                    let listadecomandos = [`select  count(id) total from usuarios `,
                                                                                                    `select count(a.id) total from carros c join aluguercarros a on a.id_carro = c.id join usuarios u on u.id = a.id_usuario`,
                                                                                                    `select  count(id) total from carros`,
                                                                                                    `select  count(id) total from cadastros `,
                                                                                                    `select  count(id) total from hoteis `,
                                                                                                    `select count(a.id) total from hoteis h join aluguerhoteis a on a.id_hotel = h.id join usuarios u on u.id = a.id_usuario `,
                                                                                                    `select  count(id) total from empresas `,
                                                                                                    `select count(a.id) total from casas c join arrendamentos a on a.idcasa = c.id join usuarios u on u.id = a.id_usuario `,
                                                                                                    `select  count(id) total from casas `,
                                                                                                    `select count(a.id) total from agendamentos a join usuarios u on u.id = a.id_usuario `]
                                                                                                    for(let i = 0 ; i < 10 ; i++){    
                                                                                                        conexao.query(listadecomandos[i],(erro,resultado)=>{
                                                                                                            if(erro) 
                                                                                                                console.log(erro)
                                                                                                            listaderesultados[i] = resultado 
                                                                                                            if(i == 9){
                                                                                                                // listaderesultados[0] = [{total:1000}]
                                                                                                                res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados})                                           
                                                            
                                                                                                            }

                                                                                                        })
                                                                                                    
                                                                                                        }
                                                                                                    }
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    })      
                                                                }
                                                            }) 
                                                        }
                                                    })
                                                    
                                                }
                                            })
                                        }
                                    })

                                    }
                                })
                            }
                        })
                        
                    }
                })

            }else{
                usuariosCd = dadosUsuario
                id_usuario = dadosUsuario[0].id
                const sqlviagens = ` select * from agendamentos where id_usuario='${id_usuario}'`
                conexao.query(sqlviagens,(erro,dadosviagens)=>{
                    viagensCd = dadosviagens
                    if(erro)
                        res.send(erro)
                    else {
                        const sqlarrendmentos = `select a.id as id ,a.data_reserva as dataReserva , a.num_dias as dias , c.cidade as cidade  ,c.pais as pais , a.preco as preco from arrendamentos a join casas c on a.idcasa=c.id where id_usuario='${id_usuario}'`
                        console.log("chegeui")
                        conexao.query(sqlarrendmentos,(erro,dadosarrendamentos)=>{
                            arrendamentos = dadosarrendamentos
                            if(erro)
                                res.render("paginaErro/erro")
                            else{
                                const sqlcarros = ` select a.id as id ,a.local_entrega as entrega , a.local_devolucao as devolucao , c.marca as marca , c.modelo as modelo , c.valor as preco from aluguercarros a join carros c on a.id_carro = c.id where id_usuario='${id_usuario}'`
                                conexao.query(sqlcarros,(erro,dadoscarros)=>{
                                    aluguercarros = dadoscarros
                                    if(erro)
                                         res.render("paginaErro/erro")
                                    else  {                
                                        const sqlhoteis = `select a.id as id ,h.nome as hotel,h.pais as pais,h.cidade as cidade,a.num_dias as dias,a.preco as preco 
                                        from aluguerhoteis a join hoteis h on a.id_hotel = h.id 
                                        join usuarios u  on a.id_usuario = u.id where id_usuario='${id_usuario}'`
                                        conexao.query(sqlhoteis,(erro,dadoshoteis)=>{
                                            aluguerhoteis = dadoshoteis
                                            if(erro)
                                                res.send(erro)
                                            else{
                                                res.render('logado/logado',{usuario:usuariosCd,viagens:viagensCd,aluguerhotel:aluguerhoteis,casa:arrendamentos,carro:aluguercarros})
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                   
                })
            }
        })
        
    }


    async deleteUsuarios(req,res){
        const sql = `delete from usuarios where id = ${id_usuario} `
        conexao.query(sql,(erro,result)=>{
            if(erro)
                console.log(erro)
            let listadecomandos=[`delete from agendamentos where id_usuario= ${id_usuario} `
            ,`delete from arrendamentos where id_usuario= ${id_usuario} `,`delete from aluguerhoteis where id_usuario = ${id_usuario} `
             ,`delete from aluguercarros where id_usuario= ${id_usuario} `,`delete from empresas where id_usuario = ${id_usuario} `]
            for(let i = 0 ;i < 5 ; i++){
                conexao.query(listadecomandos[i],(erro,resultado)=>{
                    if(erro)
                        console.log(erro)
                    })
            } 
            res.render("login-register/login-register")
        })
    }
    
    async readUsuarios(req,res){
        const sql = `select * from usuarios`
        conexao.query(sql,(erro,result)=>{if(erro) console.log(erro)})
        res.render('admin/admin')
    }

    async createUsuarios(req,res){
        const nome  = req.body.cnome 
        const senha = req.body.csenha 
        const email = req.body.cemail
        const sql = `insert into usuarios (nome,senha,email) values ('${nome}','${senha}','${email}')`
        conexao.query(sql,(erro,result)=>{if(erro) console.log(erro)})
        res.render('login-register/login-register')
    }
    
    async updateUsuarios(req,res){
        const nome  = req.body.nome 
        const senha = req.body.senha 
        const email = req.body.email
        const sql = `update usuarios set nome='${nome}', senha='${senha}',email='${email}' where id='${id_usuario}' `
        conexao.query(sql,(erro,result)=>{
            if(erro) 
                console.log(erro)
            else {
                const sqlAll = `select * from usuarios where id='${id_usuario}' `
                conexao.query(sqlAll,(erro,resultado)=>{
                    console.log(resultado)
                    usuariosCd = resultado
                    if(erro)
                        res.send(erro)
                        res.render('logado/logado',{usuario:usuariosCd,viagens:viagensCd,aluguerhotel:hoteis,casa:arrendamentos,carro:aluguercarros})
                })
            }
        })
    }

    async readagendamentos(req,res){
        const sql = `select * from agendamentos`
        conexao.query(sql,(erro,result)=>{
            viagensCd = result
            if(erro) 
                console.log(erro)})
            res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:usuario_admin,arrendamento:casas_admin,voos:voos_admin,aluguerhotel:hoteis_admin,aluguercarro:carros_admin})
    }

    async readagendamentosById(req,res){
        const sql = `select * from agendamentos where id='${id_usuario}'`
        conexao.query(sql,(erro,result)=>{
            viagensCd = result
            if(erro) console.log(erro)})
        res.render('admin/admin')        
    }

    createagendamentos(req,res){
        const tipoBilhete = req.body.tipoBilhete
        const num_pessoas = req.body.num_pessoas
        const classe = req.body.classe
        const data = req.body.data 
        const cidade = req.body.cidade 
        const pais = req.body.pais
        const sql = `insert into agendamentos
        (tipoBilhete,num_pessoas,classe,data,cidade,pais,id_usuario) values 
        ('${tipoBilhete}','${num_pessoas}','${classe}','${data}','${cidade}','${pais}','${id_usuario}')`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
                res.render('marcacoes/marcacoes')          
            }
        })             
    }

    deletaragendamentos(req,res){
        const idviagem = req.params.id
        const sql = `delete from agendamentos where id='${idviagem}'`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
                console.log("Sucesso !")
            const sqlAllviagens = `select * from agendamentos where id_usuario='${id_usuario}'`
               conexao.query(sqlAllviagens,(erro,resultado)=>{
                    viagensCd = resultado
                    if(erro)
                        console.log(erro)
                    res.render('logado/logado',{usuario:usuariosCd,viagens:viagensCd,aluguerhotel:hoteis,casa:arrendamentos,carro:aluguercarros})
               })          
            }
        }) 
    
    }

    updateagendamentos(req,res){
        const tipoBilhete = req.body.tipoBilhete
        const num_pessoas = req.body.num_pessoas
        const classe = req.body.classe
        const data = req.body.data 
        const cidade = req.body.cidade 
        const pais = req.body.pais
        const id = req.body.id
        const sql = `update agendamentos set tipoBilhete = '${tipoBilhete}' , num_pessoas = '${num_pessoas}', classe = '${classe}' ,data='${data}',cidade = '${cidade}' ,pais='${pais}' where id='${id}'`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
                const sqlAllviagens = `select * from agendamentos where id_usuario='${id_usuario}'`
                conexao.query(sqlAllviagens,(erro,resultado)=>{
                    viagensCd = resultado
                    if(erro)
                        console.log(erro)
                        res.render('logado/logado',{usuario:usuariosCd,viagens:viagensCd,aluguerhotel:aluguerhoteis,casa:arrendamentos,carro:aluguercarros})
                })          
            }
        })
    }
    
    async readcarros(req,res){
        const sql = `select * from carros`
        conexao.query(sql,(erro,result)=>{
            carros = result
            if(erro)
                console.log(erro)})        
            res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados})
        }

    readcarrosByType(req,res){
        const tipo = req.body.tipo
        const sql = `select * from carros where tipo='${tipo}' and estado='livre'`
        let carrosType
        conexao.query(sql,(erro,result)=>{
            carrosType = result
            if(erro) 
                console.log(erro)
            res.render('carros/carros',{carros:carrosType})
        })         
    }

    createcarros(req,res){
        const marca = req.body.marca
        const modelo = req.body.modelo
        const matricula = req.body.matricula
        const tipo = req.body.tipo 
        const estado = req.body.estado 
        const valor = req.body.valor 
        const sql = `insert into carros
        (marca,modelo,matricula,tipo,estado,valor) values 
        ('${marca}','${modelo}','${matricula}','${tipo}','${estado}','${valor}')`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
                const sqlAllCarros = `select * from carros`
                conexao.query(sqlAllCarros,(erro,resultado)=>{
                    carros = resultado
                    if(erro)
                        console.log(erro)
                    else{
                        const sqlCount = `select  count(id) total from carros `
                        conexao.query(sqlCount , (erro,resultado)=>{
                            if(erro) console.log(erro)
                            console.log("Aqui")
                            console.log(resultado)
                            listaderesultados[2] = [{total:resultado[0].total}];
                    
                            res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados}) 
                        })
                 
                    }
                })          
            }
        })             
    }

    deletarcarro(req,res){
        const idcarro = req.params.id
        const sql = `delete from carros  where id='${idcarro}'`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
            const sqlAllCarros = `select * from carros`
               conexao.query(sqlAllCarros,(erro,resultado)=>{
                    carros = resultado
                    if(erro)
                        console.log(erro)    
                    else{
                        const sqlCount = `select  count(id) total from carros `
                        conexao.query(sqlCount , (erro,resultado)=>{
                            if(erro) console.log(erro)
                            console.log("Aqui")
                            console.log(resultado)
                            listaderesultados[2] = [{total:resultado[0].total}];
                            res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados}) 
                        })
                 
                    }       
                })          
            }
        }) 
    
    }

    updateacarro(req,res){
        const marca = req.body.marca
        const modelo = req.body.modelo
        const matricula = req.body.matricula
        const tipo = req.body.tipo 
        const estado = req.body.estado 
        const valor = req.body.valor 
        const id = req.body.id 
        const sql = `update carros set marca='${marca}' , modelo='${modelo}', matricula='${matricula}' ,tipo='${tipo}',estado='${estado}',valor='${valor}' where id='${id}'`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
                const sqlAllCarros = `select * from carros`
                conexao.query(sqlAllCarros,(erro,resultado)=>{
                    carros = resultado
                    if(erro)
                        console.log(erro)
                        res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados}) 
    
                })          
            }
        })
    }

    
    async readhotel(req,res){
        const sql = `select * from hoteis`
        conexao.query(sql,(erro,result)=>{
            hoteis = result
            if(erro) console.log(erro)})
        res.render('admin/admin')        
    }

    
    readhotelByPlace(req,res){
        const lugar = req.body.lugar
        const sql = `select * from hoteis where pais like '%${lugar}%' or cidade like '%${lugar}%'`
        conexao.query(sql,(erro,result)=>{
            const hoteisType = result
            if(erro) 
                console.log(erro)
            res.render('hotel/hotel',{hoteis:hoteisType})
        })        
    }

    createhotel(req,res){
        const nome = req.body.nome
        const pais = req.body.pais
        const cidade = req.body.cidade
        const num_quartos = req.body.num_quartos
        const preco = req.body.preco
        const sql = `insert into hoteis
        (nome,pais,cidade,num_quartos,preco) values 
        ('${nome}','${pais}','${cidade}','${num_quartos}','${preco}')`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
            const sqlAllHoteis = `select * from hoteis`
               conexao.query(sqlAllHoteis,(erro,resultado)=>{
                    hoteis = resultado
                    if(erro)
                        console.log(erro)
                        else{
                            const sqlCount = `select  count(id) total from hoteis `
                            conexao.query(sqlCount , (erro,resultado)=>{
                                if(erro) console.log(erro)
                                console.log("Aqui")
                                console.log(resultado)
                                listaderesultados[4] = [{total:resultado[0].total}];
                                res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados}) 
                            })
                        }    
                })          
            }
        })             
    }

    deletarhoteis(req,res){
        const idhotel = req.params.id
        const sql = `delete from hoteis  where id='${idhotel}'`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
            const sqlAllHoteis = `select * from hoteis`
               conexao.query(sqlAllHoteis,(erro,resultado)=>{
                    hoteis = resultado
                    if(erro)
                        console.log(erro)
                        else{
                            const sqlCount = `select  count(id) total from hoteis `
                            conexao.query(sqlCount , (erro,resultado)=>{
                                if(erro) console.log(erro)
                                console.log("Aqui")
                                console.log(resultado)
                                listaderesultados[4] = [{total:resultado[0].total}];
                                res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados}) 
                            })
                     
                        }
               })          
            }
        }) 
    }

    updatehoteis(req,res){
        
        const nome = req.body.nome
        const pais = req.body.pais
        const cidade = req.body.cidade
        const num_quartos = req.body.num_quartos
        const preco = req.body.preco
        const idhotel = req.body.id
        const sql = `update hoteis set preco='${preco}' ,nome='${nome}' , pais='${pais}', cidade='${cidade}' ,num_quartos='${num_quartos}' 
        where id='${idhotel}' `
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
                const sqlAllHoteis = `select * from hoteis`
                conexao.query(sqlAllHoteis,(erro,resultado)=>{
                    hoteis = resultado
                    if(erro)
                        console.log(erro)
                    res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados}) 
    
                })          
            }
        })
    }
    
    async readcasas(req,res){
        const sql = `select * from casas`
        conexao.query(sql,(erro,result)=>{
            casas = result
            if(erro) console.log(erro)})
        res.render('admin/admin')        
    }

    readcasasByPlace(req,res){
        const lugar = req.body.lugar
        const sql = `select * from casas where (pais='${lugar}' or cidade='${lugar}') and estado="livre" `
        conexao.query(sql,(erro,result)=>{
            const casasType = result
            if(erro) 
                console.log(erro)
            res.render('casas/casas',{casas:casasType})
        })        
    }
   
    createcasa(req,res){
        const pais = req.body.pais
        const cidade = req.body.cidade
        const preco = req.body.preco
        const sql = `insert into casas (pais,cidade,preco) values ('${pais}','${cidade}','${preco}')`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
                const sqlAllCasas = `select * from casas`
                conexao.query(sqlAllCasas,(erro,resultado)=>{
                    casas = resultado
                    if(erro)
                        console.log(erro)
                        else{
                            const sqlCount = `select  count(id) total from casas `
                            conexao.query(sqlCount , (erro,resultado)=>{
                                if(erro) console.log(erro)
                                console.log("Aqui")
                                console.log(resultado)
                                listaderesultados[8] = [{total:resultado[0].total}];
                                res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados}) 
                            })
                     
                        }
                })
            }
        })             
    }

    deletarcasa(req,res){
        const idcasa = req.params.id
        const sql = `delete from casas  where id='${idcasa}'`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
            const sqlAllCasas = `select * from casas`
               conexao.query(sqlAllCasas,(erro,resultado)=>{
                    casas = resultado
                    if(erro)
                        console.log(erro)
                        else{
                            const sqlCount = `select  count(id) total from casas `
                            conexao.query(sqlCount , (erro,resultado)=>{
                                if(erro) console.log(erro)
                                console.log("Aqui")
                                console.log(resultado)
                                listaderesultados[8] = [{total:resultado[0].total}];
                                res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados}) 
                            })
                     
                        }
               })          
            }
        }) 
    
    }

    updatecasas(req,res){
        const pais = req.body.pais
        const cidade = req.body.cidade
        const idcasa = req.body.id
        const preco = req.body.preco
        const sql = `update casas set pais='${pais}' , cidade='${cidade}' , preco='${preco}' where id='${idcasa}'`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
                const sqlAllCasas = `select * from casas`
                conexao.query(sqlAllCasas,(erro,resultado)=>{
                    casas = resultado
                    if(erro)
                        console.log(erro)
                    res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados}) 
    
                })          
            }
        })
    }

    readcadastro(req,res){
        const sql = `select * from cadastros`
        conexao.query(sql,(erro,resultado)=>{
            funcionarios = resultado
            if(erro)
                console.log(erro)
            res.render('admin/admin')
        })             
    }

    createcadastro(req,res){
        const nome = req.body.nome
        const bi = req.body.bi
        const dataNascimento = req.body.datanascimento
        const formacao = req.body.formacao
        const workYears = req.body.workyears
        const skills = req.body.skills
        const sql = `insert into cadastros
        (nome,bi,datanascimento,formacao,anosDeTrabalho,competencias) 
        values ('${nome}','${bi}','${dataNascimento}','${formacao}','${workYears}','${skills}')`
        conexao.query(sql,(erro,resultado)=>{
            if(erro)
                console.log(erro)
            res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados}) 
    
            })             
    }

    
    createcadastroByAdmin(req,res){
        const nome = req.body.nome
        const bi = req.body.bi
        const dataNascimento = req.body.datanascimento
        const formacao = req.body.formacao
        const workYears = req.body.workyears
        const skills = req.body.skills
        const sql = `insert into cadastros
        (nome,bi,datanascimento,formacao,anosDeTrabalho,competencias) 
        values ('${nome}','${bi}','${dataNascimento}','${formacao}','${workYears}','${skills}')`
        conexao.query(sql,(erro,resultado)=>{
            if(erro)
                console.log(erro)
            else {
                const sqlfunc = "Select * from cadastros"
                conexao.query(sqlfunc,(erro,resultado)=>{
                    funcionarios = resultado
                    if(erro)
                        console.log(erro)
                        else{
                            const sqlCount = `select  count(id) total from cadastros `
                            conexao.query(sqlCount , (erro,resultado)=>{
                                if(erro) console.log(erro)
                                console.log("Aqui")
                                console.log(resultado)
                                listaderesultados[3] = [{total:resultado[0].total}];
                                res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados}) 
                            })
                     
                        }
                })
            }
        })             
    }
    deletarcadastro(req,res){
        const idcadastro = req.params.id
        const sql = `delete from cadastros  where id='${idcadastro}'`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
            const sqlAllCadastro = `select * from cadastros`
               conexao.query(sqlAllCadastro,(erro,resultado)=>{
                    funcionarios = resultado
                    if(erro)
                        console.log(erro) 
                        else{
                            const sqlCount = `select  count(id) total from cadastros `
                            conexao.query(sqlCount , (erro,resultado)=>{
                                if(erro) console.log(erro)
                                console.log("Aqui")
                                console.log(resultado)
                                listaderesultados[3] = [{total:resultado[0].total}];
                                res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados}) 
                            })
                     
                        }
               })          
            }
        }) 
    
    }

    updatecadastro(req,res){
        const nome = req.body.nome
        const bi = req.body.bi
        const dataNascimento = req.body.datanascimento
        const formacao = req.body.formacao
        const workYears = req.body.workyears
        const skills = req.body.skills
        const idcadastro = req.body.id
        const sql = `update cadastros set 
        nome='${nome}', bi='${bi}',datanascimento='${dataNascimento}',formacao='${formacao}'
        , anosDeTrabalho ='${workYears}', competencias='${skills}' where id='${idcadastro}' `
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
                const sqlAllCadastro = `select * from cadastros`
                conexao.query(sqlAllCadastro,(erro,resultado)=>{
                    funcionarios = resultado
                    if(erro)
                        console.log(erro)
                    res.render('admin/admin',{empresa:empresas,hotel:hoteis,casa:casas,carro:carros,funcionario:funcionarios,user:user,arrendamentos:arrendamento,voos:voos,aluguerhoteis:aluguerhotel,aluguercarros:aluguercarro ,lista:listaderesultados}) 
                })          
            }
        })
    }

    readempresa(req,res){
        const sql = `select * from empresas`
        conexao.query(sql,(erro,resultado)=>{
            empresas = resultado
            if(erro)
                console.log(erro)
            res.render('admin/admin')
        })             
    }

    createempresa(req,res){
        const nome = req.body.nome
        const duracao = req.body.duracao
        const servico = req.body.servico
        const localizacao = req.body.localizacao
        const idusuario = id_usuario
        const sql = `insert into cadastros
        (nome,duracao,servico,localizacao,id_usuario) 
        values ('${nome}','${duracao}','${servico}','${localizacao}','${idusuario}')`
        conexao.query(sql,(erro,resultado)=>{
            if(erro)
                console.log(erro)
            res.render('index/index')
        })             
    }

    deletarempresa(req,res){
        const idempresa = req.body.id
        const sql = `delete from cadrastos  where id='${idempresa}'`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
            const sqlAllEmpresas = `select * from empresas`
               conexao.query(sqlAllEmpresas,(erro,resultado)=>{
                    empresas = resultado
                    if(erro)
                        console.log(erro)
                    res.render('admin/admin',{usuario:usuariosCd,viagens:viagensCd})
               })          
            }
        }) 
    
    }    

    async readagendamentosById(req,res){
        const sql = `select * from arrendamentos where id='${id_usuario}'`
        conexao.query(sql,(erro,result)=>{
            viagensCd = result
            if(erro) console.log(erro)})
        res.render('admin/admin')        
    }

    async readarrendamentos(req,res){
        const sql = `select * from arrendamentos`
        conexao.query(sql,(erro,result)=>{
            arrendamentos = result
            if(erro) console.log(erro)})
        res.render('admin/admin')        
    }

    createarrendamento(req,res){
        const data_reserva = req.body.data_reserva
        const num_dias = req.body.num_dias
        const idcasa = req.body.idcasa
        const sql = `update casas set estado='Ocupado' where id='${idcasa}'` 
        conexao.query(sql,(erro,resultado)=>{
            if(erro)
                console.log(erro)
            else {
                const sql3 = `select * from casas where id='${idcasa}'`
                conexao.query(sql3,function(erro,casas){
                    const preco = casas[0].preco * num_dias
                    const sql2 = `insert into arrendamentos (data_reserva,num_dias,idcasa,id_usuario,preco) values('${data_reserva}'
                    ,'${num_dias}','${idcasa}','${id_usuario}','${preco}')`
                    conexao.query(sql2,(erro,resultado)=>{
                    if(erro)
                        console.log(erro)
                    res.render('casas/casas',{casas:0})
                    })
                })
            }
        })            
    }

    deletararrendamentos(req,res){
        const idarrendamento = req.params.id
        const sql = `delete from arrendamentos  where id='${idarrendamento}'`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
            const sqlAllArrendamentos =`
            select a.id as id ,a.data_reserva as dataReserva , a.num_dias as dias ,
             c.cidade as cidade  ,c.pais as pais , a.preco as preco 
            from arrendamentos a join casas c on a.idcasa=c.id where id_usuario='${id_usuario}'`
                conexao.query(sqlAllArrendamentos,(erro,resultado)=>{
                    arrendamentos = resultado
                    if(erro)
                        console.log(erro)
                    res.render('logado/logado',{usuario:usuariosCd,viagens:viagensCd,aluguerhotel:aluguerhoteis,casa:arrendamentos,carro:aluguercarros})
               })          
            }
        })

    }

    updatearrendamentos(req,res){
        const data_reserva = req.body.data_reserva
        const num_dias = req.body.num_dias
        const idarrendamento = req.body.id
        const sql = `update arrendamentos set data_reserva='${data_reserva}' , num_dias='${num_dias}'
        where id='${idarrendamento}'`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
                const sqlAllArrendamentos = `
                select a.id as id ,a.data_reserva as dataReserva , a.num_dias as dias ,
                c.cidade as cidade  ,c.pais as pais , a.preco as preco 
                from arrendamentos a join casas c on a.idcasa=c.id where id_usuario='${id_usuario}' `
                conexao.query(sqlAllArrendamentos,(erro,resultado)=>{
                    arrendamentos = resultado
                    if(erro)
                        console.log(erro)
                    res.render('logado/logado',{usuario:usuariosCd,viagens:viagensCd,aluguerhotel:aluguerhoteis,casa:arrendamentos,carro:aluguercarros})
                })          
            }
        })
    }
    
    async readaluguercarrosById(req,res){
        const sql = `select * from aluguercarros where id='${id_usuario}'`
        conexao.query(sql,(erro,result)=>{
            viagensCd = result
            if(erro) console.log(erro)})
        res.render('admin/admin')        
    }

    async readaluguercarros(req,res){
        const sql = `select * from aluguercarros`
        conexao.query(sql,(erro,result)=>{
            aluguercarros = result
            if(erro) console.log(erro)})
        res.render('admin/admin')        
    }

    createaluguercarro(req,res){
        const local_entrega = req.body.localEntrega
        const estado = "ocupado"
        const idcarro = req.body.idcarro
        const local_devolucao = req.body.localDevolucao
        const sql = `insert into aluguercarros (id_carro,id_usuario,local_entrega,local_devolucao) 
        values('${idcarro}','${id_usuario}','${local_entrega}','${local_devolucao}')`
        conexao.query(sql,(erro,resultado)=>{
            if(erro)
                console.log(erro)
            else {
                const sql2 = `update carros set estado='${estado}' where id='${idcarro}'`
                conexao.query(sql2,(erro,resultado)=>{
                    if(erro)
                        console.log(erro)
                    res.render('carros/carros',{carros:0})
                })
            }
        })            
    }

    updatealuguercarro(req,res){
        const idaluguer = req.body.id
        const local_entrega = req.body.localEntrega
        const local_devolucao = req.body.localDevolucao
        const sql = `update aluguercarros set local_entrega='${local_entrega}' , local_devolucao='${local_devolucao}' where id='${idaluguer}'`
        conexao.query(sql,(erro,resultado)=>{
            if(erro)
                console.log(erro)
            else {
                res.render('logado/logado',{usuario:usuariosCd,viagens:viagensCd,aluguerhotel:aluguerhoteis,casa:arrendamentos,carro:aluguercarros})
            }
        })            
    }

    deletaraluguercarros(req,res){
        const idaluguercarros = req.params.id
        const sql = `delete from aluguercarros  where id='${idaluguercarros}'`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
            const sqlAllaluguercarros = `select * from aluguercarros where id_usuario='${id_usuario}'`
               conexao.query(sqlAllaluguercarros,(erro,resultado)=>{
                    aluguercarros = resultado
                    if(erro)
                        console.log(erro)
                    res.render('logado/logado',{usuario:usuariosCd,viagens:viagensCd,aluguerhotel:aluguerhoteis,casa:arrendamentos,carro:aluguercarros})
               })          
            }
        }) 
    }
    
    async readaluguerhoteisById(req,res){
        const sql = `select * from aluguerhoteis where id='${id_usuario}'`
        conexao.query(sql,(erro,result)=>{
            aluguerhoteis = result
            if(erro) console.log(erro)})
        res.render('admin/admin',{usuario:usuariosCd,viagens:viagensCd,hotel:hoteis,casa:arrendamentos,carro:aluguercarros})        
    }

    async readaluguerhoteis(req,res){
        const sql = `select * from aluguerhoteis`
        conexao.query(sql,(erro,result)=>{
            aluguerhoteis = result
            if(erro) console.log(erro)})
        res.render('admin/admin')        
    }

    
    createaluguerhoteis(req,res){
        const idhotel = req.body.idhotel
        const num_dias = req.body.num_dias
        const sql = `select * from hoteis where id='${idhotel}' `
        conexao.query(sql,(erro,hotel)=>{
            if(erro)
                console.log(erro)
            else{
                const preco = num_dias * hotel[0].preco 
                const sql3 = `insert into aluguerhoteis (id_hotel,id_usuario,num_dias,preco) values ('${idhotel}','${id_usuario}','${num_dias}','${preco}') `
                conexao.query(sql3,function(erro,resultado){
                    if(erro)
                        console.log(erro)
                    res.render('hotel/hotel',{hoteis:0})
                })
            }
        })            
    }

    
    updatealuguerhoteis(req,res){
        const idaluguer = req.body.id
        const num_dias = req.body.num_dias
        const sql3 = `update aluguerhoteis set num_dias='${num_dias}' where id='${idaluguer}' `
        conexao.query(sql3,function(erro,resultado){
            if(erro)
                console.log(erro)
            else {
                const sql2 = ` select a.id as id ,h.nome as hotel,h.pais as pais,h.cidade as cidade,a.num_dias as dias,a.preco as preco from aluguerhoteis a join hoteis h on a.id_usuario = h.id where id_usuario='${id_usuario}' `
                conexao.query(sql2,(erro,resultadohotel)=>{
                    aluguerhoteis = resultadohotel
                    if(erro)
                        console.log(erro)
                    else {
                        res.render('logado/logado',{usuario:usuariosCd,viagens:viagensCd,aluguerhotel:aluguerhoteis,casa:arrendamentos,carro:aluguercarros})
                    }
                })
            }
        })
    }
          
    deletaraluguerhoteis(req,res){
        const idaluguerhoteis = req.params.id
        const sql = `delete from aluguerhoteis  where id='${idaluguerhoteis}'`
        conexao.query(sql,(erro,result)=> {
            if (erro){
                res.send(erro)
                console.log(erro)
            }else{
            const sqlAllaluguerhoteis = `select * from aluguerhoteis where id_usuario='${id_usuario}'`
               conexao.query(sqlAllaluguerhoteis,(erro,resultado)=>{
                    aluguerhoteis = resultado
                    if(erro)
                        console.log(erro)
                    res.render('logado/logado',{usuario:usuariosCd,viagens:viagensCd,aluguerhotel:aluguerhoteis,casa:arrendamentos,carro:aluguercarros,hoteis:hoteis})
               })          
            }
        }) 
    }

    recuperarsenha(req,res){
        const email = req.body.email
        const sql = `select * from usuarios where email='${email}'`
        conexao.query(sql,(erro,resultado)=>{
            if(erro)
                console.log(erro)
            else {
                const nome = resultado[0].nome
                const senha = resultado[0].senha
                EnviarEmail(DadosDeEmail(email,nome,senha))
                res.render('login-register/login-register')
            }
        })
    }
}

export default new usuariosController