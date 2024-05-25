const buttonControl = document.querySelectorAll('button.btn1');
const containers = document.querySelectorAll('div.painel');

buttonControl[0].addEventListener('click',()=>{
    containers[0].style.marginLeft ="0vw"
    
})

buttonControl[1].addEventListener('click',()=>{
    containers[0].style.marginLeft ="-80vw"
    
})

buttonControl[2].addEventListener('click',()=>{
    containers[0].style.marginLeft ="-160vw"
    
})

buttonControl[3].addEventListener('click',()=>{
    containers[0].style.marginLeft ="-240vw"
    
})

buttonControl[4].addEventListener('click',()=>{
    containers[0].style.marginLeft ="-320vw"
    
})

function alterarCor(indice){
    buttonControl[indice].style.backgroundColor ="white"
    buttonControl[indice].style.color ="black"
    for(let i = 0 ; i < 6 ;i++){
        if(i == indice){
            continue
        }else {
            buttonControl[i].style.backgroundColor ="black"
            buttonControl[i].style.color ="white"
        }
    }
}

const buttonActualizar = document.querySelector('.buttonActualizar')
const formulario = document.querySelector('.formulario')

buttonActualizar.addEventListener('click',()=>{
    formulario.style.display ="block";
})

const buttonActualizars = document.querySelector('.buttonActualizars')
const formularios = document.querySelector('.formularios')

buttonActualizars.addEventListener('click',()=>{
    formularios.style.display ="block";
})

const buttonActualizar1 = document.querySelector('.btnupdate1')
const formulario1 = document.querySelector('.form1')

buttonActualizar1.addEventListener('click',()=>{
    formulario1.style.display ="block";
})


const buttonActualizar2 = document.querySelector('.btnupdate2')
const formulario2 = document.querySelector('.form2')

buttonActualizar2.addEventListener('click',()=>{
    formulario2.style.display ="block";
})

const buttonActualizar3 = document.querySelector('.btnupdate3')
const formulario3 = document.querySelector('.form3')

buttonActualizar3.addEventListener('click',()=>{
    formulario3.style.display ="block";
})