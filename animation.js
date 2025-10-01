


let poTentch = document.querySelectorAll(".cardImage").addEventListener('click', animation)

function animation(){
gsap.to('.cardImage', {rotation: 360, x: 100, duration: 1});
}   