import nodemailer from 'nodemailer'
import {email,senha} from './dadosemails.js'

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:email,
        pass:senha
    }
})

/**
 * @param {string} useremail o email do usuário
 * @param {string} senha a senha que tiraremos do banco de dados
 * @param {string} nomeuser o nome do usuário que tiraremos do banco de dados
 * @returns um objecto com os dados do usuário
*/
export function DadosDeEmail(useremail,nomeuser,senha){
    let options = {
        from : email,
        to:useremail,
        subject: "Recuperação de senha ",
        text:` Aqui está os dados para login \n senha : ${senha} \n Nome de usuário : ${nomeuser}`
    }
    return options
}

/**
 * 
 * @param {*} options os parametros para envio do email 
 */
export function EnviarEmail(options){    
    transporter.sendMail(options, function(erro, info){
        if(erro)
            console.log(erro)
        else
            console.log(" Email Enviado !: "+info.response)
    })
}
