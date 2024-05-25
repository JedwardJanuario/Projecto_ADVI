const senha1 = document.querySelector('input#senha1')
const senha2 = document.querySelector('input#senha2')


senha2.addEventListener('blur',()=> {

    if(senha1.innerText != senha2.innerText)
        alert(' São diferentes')

}) 