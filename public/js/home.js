
async function getCheese(){
   let res = await fetch('https://cheese-api.onrender.com/random')
   let che = await res.json()
   
   document.querySelector('.cheese').textContent = che.name
  let imag =  document.querySelector('.ranCheese')
 imag.src = che.image
 imag.width = 100
 imag.height = 100
}

getCheese()

