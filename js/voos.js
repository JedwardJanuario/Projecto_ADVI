let botaoBilhetes = document.querySelector('#precarios_bilhetes')
let container = document.querySelector('.container')
let botaoX = document.querySelector('.btn_X')

botaoBilhetes.addEventListener('click',()=>{
    container.classList.add('esconde')
})

botaoX.addEventListener('click',()=>{
    container.classList.remove('esconde')
})
let marcarLugar = document.querySelectorAll('#Marcar')
let QuantidadeBilhetes = document.querySelectorAll('.Reservar_Lugar')
let Vagos = document.querySelectorAll('.vagas')

for(let i = 0; i  < 10 ;i++){
    marcarLugar[i].addEventListener('click',()=>{
        if(QuantidadeBilhetes[i].innerText > Vagos[i].innerText){
            window.alert(' Não é Possível , pois Ultrapassa As vagas disponíveis .\n Reserve Um Número de Bilhetes Menor ')
        }else{
            Vagos[i].innerText -= QuantidadeBilhetes[i].value
        }
    })
}