const btnProcurar = document.querySelector('.procurar')
const container = document.querySelector('.carros')
const btnAlugar = document.querySelector('.alugar')
const btnEfectuarAuguer = document.querySelector('.efectuarAluguer')

btnProcurar.addEventListener('click',function(){
  btnAlugar.classList.remove('esconderForm')  
})

btnAlugar.addEventListener('click',()=>{
    const formulario = document.querySelector('.formulario')
    formulario.classList.remove('esconderForm')
})

btnEfectuarAuguer.addEventListener('click',function(){
    container.classList.add('esconderForm')
})