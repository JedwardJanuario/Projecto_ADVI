let botaoLogin = document.querySelector("#botao_login")
let formBox = document.querySelector(".form_box")
let botaoX = document.querySelector(".botaoX")
let botaoXRegister = document.querySelector(".botaoX_register")
let registerLink = document.querySelector(".register_link")
let containerLogin = document.querySelector(".login")
let container = document.querySelector(".container")
let containerLResgiter = document.querySelector(".register")
let loginLink = document.querySelector(".login_link")

registerLink.addEventListener("click",()=>{
    formBox.style.height = "550px";
    containerLogin.classList.add("login_move")
    containerLResgiter.classList.remove("register")
})

loginLink.addEventListener("click",()=>{
    formBox.style.height = "450px";
    containerLogin.classList.remove("login_move")
    containerLResgiter.classList.add("register")
})

let imgBlock = document.querySelector('.img_block');
let inputPassword = document.querySelector('.inputpassword1')
imgBlock.addEventListener('click',()=>{
    if (inputPassword.type === 'password'){
        inputPassword.type = 'text';
        imgBlock.setAttribute('src',"/img/icones/icons8-desbloquear-60.png");
    }
    else{
        inputPassword.type = 'password';
        imgBlock.setAttribute('src','/img/icones/icons8-trancar-60.png');
    }
})
let imgBlock2 = document.querySelector('.img_block2');
let inputPassword2 = document.querySelector('.inputpassword2')
imgBlock2.addEventListener('click',()=>{
    if (inputPassword2.type === 'password'){
        inputPassword2.type = 'text';
        imgBlock2.setAttribute('src',"/img/icones/icons8-desbloquear-60.png");

    }
    else{
        inputPassword2.type = 'password';
        imgBlock2.setAttribute('src','/img/icones/icons8-trancar-60.png');
    }
})

let imgBlock3 = document.querySelector('.img_block3');
let inputPassword3 = document.querySelector('.inputpassword3')
imgBlock3.addEventListener('click',()=>{
    if (inputPassword3.type === 'password'){
        inputPassword3.type = 'text';
        imgBlock3.setAttribute('src',"/img/icones/icons8-desbloquear-60.png");
    }
    else{
        inputPassword3.type = 'password';
        imgBlock3.setAttribute('src','/img/icones/icons8-trancar-60.png');
    }

})


inputPassword3.addEventListener('blur',()=>{

    if(inputPassword2.value != inputPassword3.value)
        alert(" Verifique as suas Senha pois são diferentes ! ")
    
})

