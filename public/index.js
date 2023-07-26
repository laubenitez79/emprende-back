console.log("Va a ser interpretado por el navegador")

const button = document.querySelector('button')
console.log({button})

button.addEventListener("click" , function () {
    console.log("Presionaste el boton")
    fetch("https://emprende-back-2.onrender.com/users")
})