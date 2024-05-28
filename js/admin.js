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

buttonControl[5].addEventListener('click',()=>{
    containers[0].style.marginLeft ="-400vw"
    
})

buttonControl[6].addEventListener('click',()=>{
    containers[0].style.marginLeft ="-480vw"  
})

buttonControl[7].addEventListener('click',()=>{
    containers[0].style.marginLeft ="-560vw"  
})

buttonControl[8].addEventListener('click',()=>{
    containers[0].style.marginLeft ="-640vw" 
})

buttonControl[9].addEventListener('click',()=>{
    containers[0].style.marginLeft ="-720vw" 
})

function alterarCor(indice){
    buttonControl[indice].style.backgroundColor ="white"
    buttonControl[indice].style.color ="black"
    for(let i = 0 ; i < 10 ;i++){
        if(i == indice){
            continue
        }else {
            buttonControl[i].style.backgroundColor ="black"
            buttonControl[i].style.color ="white"
        }
    }
}

const buttonActualizar1 = document.querySelector('.btnupdate1')
const formulario1 = document.querySelector('.form1')

buttonActualizar1.addEventListener('click',()=>{
    formulario1.style.display ="block";
})


const buttonAdd1 = document.querySelector('.btnadd1')
const formularioadd1 = document.querySelector('.formadd1')

buttonAdd1.addEventListener('click',()=>{
    formularioadd1.style.display ="block";
})


const buttonActualizar2 = document.querySelector('.btnupdate2')
const formulario2 = document.querySelector('.form2')

buttonActualizar2.addEventListener('click',()=>{
    formulario2.style.display ="block";
})
const buttonAdd2 = document.querySelector('.btnadd2')
const formularioadd2 = document.querySelector('.formadd2')

buttonAdd2.addEventListener('click',()=>{
    formularioadd2.style.display ="block";
})


const buttonActualizar3 = document.querySelector('.btnupdate3')
const formulario3 = document.querySelector('.form3')

buttonActualizar3.addEventListener('click',()=>{
    formulario3.style.display ="block";
})


const buttonAdd3 = document.querySelector('.btnadd3')
const formularioadd3 = document.querySelector('.formadd3')

buttonAdd3.addEventListener('click',()=>{
    formularioadd3.style.display ="block";
})



const buttonActualizar4 = document.querySelector('.btnupdate4')
const formulario4 = document.querySelector('.form4')

buttonActualizar4.addEventListener('click',()=>{
    formulario4.style.display ="block";
})


const buttonAdd4 = document.querySelector('.btnadd4')
const formularioadd4 = document.querySelector('.formadd4')

buttonAdd4.addEventListener('click',()=>{
    formularioadd4.style.display ="block";
})