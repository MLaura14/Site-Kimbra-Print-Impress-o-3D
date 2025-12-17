const track = document.querySelector('.craft-track');

// duplica os cards pra fazer o loop infinito suave
const clone = track.innerHTML;
track.innerHTML += clone;

