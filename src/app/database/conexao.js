import mysql from "mysql"

const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'agenciaviagens',
    password:'',
    port:'3306'
})

conexao.connect(function(erro){
    if(erro)
        console.log(erro)
    else
        console.log(" Conectado a Base de Dados ")
})

/**
 * 
 * @param {string} sql comando sql 
 * @param {string} mensagemDeErro mensagem de erro 
 * @returns Query | Mensagem de Erro
 */

export const query = (sql,mensagemDeErro)=> {
    conexao.query(sql,(erro,resultado)=>{
        if(erro) 
            return mensagemDeErro
        
        return resultado            
    })
}

export default conexao
