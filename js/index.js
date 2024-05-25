let selector = 1;
vez = true
setInterval(()=>{
    if(vez == true){
        let slider = document.querySelector('#slider'+selector);
        slider.checked = true
        selector++
        if(selector > 4){
            vez = false
            selector = 4
        }                        
        }else {
            let slider = document.querySelector('#slider'+selector);
            slider.checked = true
            selector--
            if(selector < 1){
                vez = true
                selector = 1
        }
    }
},1500);


const leftArrow = document.querySelector('.left_arrow')
const rightArrow = document.querySelector('.right_arrow')
const moveLeft = document.querySelector('.moveleft')
const marginMax = "2860px"    
let valor = 150
let i =  0
let k = 0 
leftArrow.addEventListener('click',()=>{
    i++
    if (k == 0)
        moveLeft.style.marginLeft = "-"+String(valor*i)+"px";
    else{
        moveLeft.style.marginLeft = "-"+String(valor*k-valor*i)+"px";
    }
        

})

rightArrow.addEventListener('click',()=>{
    
    k++
    if(i == 0)
        moveLeft.style.marginLeft = "-"+String(valor*k)+"px"
    else    
        {
            moveLeft.style.marginLeft = "-"+String(valor*i-valor*k)+"px"
        }
})