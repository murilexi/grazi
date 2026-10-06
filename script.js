// Lista com os nomes dos dois arquivos de foto
const photos = [
    "img/meu_amor.jpeg",
    "img/nois.jpeg",
    "img/2.jpeg",
    "img/3.jpeg",
    "img/4.jpeg",
    "img/5.jpeg",
    "img/7.jpeg",
    "img/9.jpeg",
    "img/10.jpeg",
    "img/11.jpeg",
    "img/12.jpeg"
];
let currentPhotoIndex = 0;

// Contador de cliques e controle do Easter Egg
let clickCount = 0;
let eggActive = false;

// Data do início do relacionamento
const startDate = new Date(2026, 3, 16, 22, 0, 0);

// Mensagem digitada
const message = "fiz esse site enquanto vc tava na aula da USP só pra lembrar o quanto você é especial pra mim. te amo muito meu amorrrr ♥";
let messageIndex = 0;
const typingSpeed = 35;

function typeWriter() {
    if (messageIndex < message.length) {
        document.getElementById("typewriter").innerHTML += message.charAt(messageIndex);
        messageIndex++;
        setTimeout(typeWriter, typingSpeed);
    }
}

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

function togglePhoto() {
    const imgElement = document.getElementById("mainPhoto");
    imgElement.classList.add("fade-out");

    setTimeout(() => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        imgElement.src = photos[currentPhotoIndex];
        imgElement.classList.remove("fade-out");
    }, 200);
}

function createHearts() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.classList.add("heart-particle");
            heart.innerHTML = ["❤️", "💖", "✨", "💕"][Math.floor(Math.random() * 4)];
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 100);
    }
}

// Easter Egg Escondido Interativo
function spawnHiddenRing() {
    if (eggActive) return;
    eggActive = true;

    const ring = document.createElement("div");
    ring.className = "hidden-ring";
    ring.innerHTML = "💍";

    // Posição aleatória na tela
    const randomX = Math.floor(Math.random() * 75) + 10;
    const randomY = Math.floor(Math.random() * 75) + 10;

    ring.style.left = `${randomX}vw`;
    ring.style.top = `${randomY}vh`;

    // Ao clicar na aliança escondida
    ring.addEventListener("click", function handleClick() {
        ring.removeEventListener("click", handleClick);
        ring.classList.add("ring-box");
        
        // Exibe a pergunta e as duas opções
        ring.innerHTML = `
            <span>casa cmg?</span>
            <div class="ring-options">
                <button id="opt1">sim!</button>
                <button id="opt2">com certeza!</button>
            </div>
        `;

        const respond = () => {
            ring.innerHTML = "OBAAAAA YESSSSS 🤘🤘🤘";
            ring.className = "hidden-ring ring-celebration";
            createHearts();

            setTimeout(() => {
                ring.remove();
                eggActive = false;
            }, 3000);
        };

        document.getElementById("opt1").addEventListener("click", respond);
        document.getElementById("opt2").addEventListener("click", respond);
    });

    document.body.appendChild(ring);
}

// Eventos da página
document.addEventListener("DOMContentLoaded", () => {
    typeWriter();
    updateTimer();
    setInterval(updateTimer, 1000);

    const btn = document.getElementById("loveBtn");
    if (btn) {
        btn.addEventListener("click", () => {
            togglePhoto();
            createHearts();

            clickCount++;
            if (clickCount === 5) {
                spawnHiddenRing();
                clickCount = 0;
            }
        });
    }
});

// === INÍCIO DO SCRIPT DAS ESTRELINHAS SECRETAS ===
document.addEventListener('DOMContentLoaded', () => {
    const clues = document.querySelectorAll('.secret-clue');
    const modal = document.getElementById('letterModal'); 
    const closeBtn = document.getElementById('closeLetter'); 
    let foundCount = 0;

    function activateStar(element) {
        if (!element.classList.contains('found')) {
            element.classList.add('found');
            foundCount++;
            
            if (foundCount === 3) {
                // Abre a carta quando achar a 3ª estrela
                setTimeout(() => {
                    modal.classList.add('show');
                }, 600);
            }
        }
    }

    clues.forEach(clue => {
        // Evento garantido para telas de celular (touch)
        clue.addEventListener('touchstart', function(e) {
            e.preventDefault(); 
            activateStar(this);
        }, { passive: false });
        
        // Evento normal de mouse no PC
        clue.addEventListener('click', function(e) {
            e.preventDefault();
            activateStar(this);
        });
    });

    // Fecha a carta
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
});
// === FIM DO SCRIPT DAS ESTRELINHAS SECRETAS ===


// Evento para trocar a foto ao clicar nela
const mainPhoto = document.getElementById("mainPhoto");
mainPhoto.addEventListener("click", () => {
    mainPhoto.classList.add("fade-out");

    setTimeout(() => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        mainPhoto.src = photos[currentPhotoIndex];
        mainPhoto.classList.remove("fade-out");
    }, 200);
});

// === PARTÍCULAS NO FUNDO ===
document.addEventListener("DOMContentLoaded", () => {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 40 }, // Quantidade de partículas
                "color": { "value": "#ff4b6e" }, // Cor rosa/vermelho do seu layout
                "shape": { "type": "circle" },
                "opacity": { 
                    "value": 0.4, 
                    "random": true 
                },
                "size": { 
                    "value": 2, 
                    "random": true 
                },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#ff4b6e", 
                    "opacity": 0.1, 
                    "width": 1 
                },
                "move": { 
                    "enable": true, 
                    "speed": 0.8, // Bem lentinho e romântico
                    "direction": "top", 
                    "random": true,
                    "out_mode": "out" 
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { 
                    "onhover": { "enable": true, "mode": "bubble" },
                    "onclick": { "enable": true, "mode": "push" }
                },
                "modes": { 
                    "bubble": { "distance": 200, "size": 4, "duration": 2, "opacity": 1 },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }
});


// // === CHEAT CODE: GRAZI (Terminal + Apagão) ===
let inputBuffer = "";
const secretWord = "grazi";

window.addEventListener('keydown', (e) => {
    inputBuffer += e.key.toLowerCase();
    
    if (inputBuffer.length > 20) {
        inputBuffer = inputBuffer.substring(inputBuffer.length - 20);
    }
    
    if (inputBuffer.includes(secretWord)) {
        inputBuffer = ""; // Reseta a memória
        iniciarHackEApagao();
    }
});

function iniciarHackEApagao() {
    // === TOCA A MÚSICA ===
    // O ID aqui tem que ser o mesmo que você colocou no <audio id="..."> lá no HTML!
    const musica = document.getElementById("musicaFundo"); 
    if (musica) {
        musica.currentTime = 0; // Garante que a música comece do zero
        musica.play();          // Dá o play!
    }

    // 1. Cria a tela do terminal por cima de tudo
    const tela = document.createElement('div');
    tela.style.position = 'fixed';
    tela.style.top = '0';
    tela.style.left = '0';
    tela.style.width = '100vw';
    tela.style.height = '100vh';
    tela.style.backgroundColor = '#050505'; // Breu total no início
    tela.style.color = '#ff4b6e';
    tela.style.fontFamily = "'VT323', monospace";
    tela.style.fontSize = '2rem';
    tela.style.padding = '40px';
    tela.style.zIndex = '999999';
    tela.style.display = 'flex';
    tela.style.flexDirection = 'column';
    tela.style.justifyContent = 'center';
    tela.style.alignItems = 'center';
    tela.style.textAlign = 'center';
    document.body.appendChild(tela);

    // Frases do terminal
    const linhas = [
        "> ATIVANDO TONHÃO MASTER...",
        "> VERIFICANDO CREDENCIAIS...",
        "> USUÁRIA 'GRAZI' IDENTIFICADA.",
        "> STATUS: AMOR DA MINHA VIDA. ♡"
    ];

    let delay = 0;
    
    // Digita as frases do terminal uma por uma
    linhas.forEach((linha) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.style.margin = '10px 0';
            p.innerText = linha;
            tela.appendChild(p);
        }, delay);
        delay += 1200;
    });

    // 2. Inicia o Apagão depois que o terminal termina
    setTimeout(() => {
        // Limpa os textos do terminal
        tela.innerHTML = '';
        
        // Fundo 100% preto
        tela.style.background = '#000000';
        tela.style.transition = 'background 2s ease';
        
        // Pega a imagem que está atualmente na tela principal
        const imagemAtual = "img/8.jpeg";
        
        // Cria a foto no centro
        const fotoDestaque = document.createElement('img');
        fotoDestaque.src = imagemAtual;
        fotoDestaque.style.width = '300px';
        fotoDestaque.style.maxWidth = '80vw';
        fotoDestaque.style.borderRadius = '15px';
        fotoDestaque.style.boxShadow = '0 0 40px rgba(255, 75, 110, 0.6)';
        fotoDestaque.style.opacity = '0';
        fotoDestaque.style.transition = 'opacity 2s ease';
        
        // Cria o texto romântico
        const textoDestaque = document.createElement('p');
        textoDestaque.innerText = 'só tenho olhos pra você.';
        textoDestaque.style.color = '#ff4b6e';
        textoDestaque.style.fontFamily = "'VT323', monospace";
        textoDestaque.style.fontSize = '2.5rem';
        textoDestaque.style.marginTop = '20px';
        textoDestaque.style.opacity = '0';
        textoDestaque.style.transition = 'opacity 2s ease 1s'; 
        
        // Dica sutil para voltar ao site
        const dicaSair = document.createElement('p');
        dicaSair.innerText = '(clique em qualquer lugar para voltar)';
        dicaSair.style.color = '#444';
        dicaSair.style.fontSize = '1rem';
        dicaSair.style.marginTop = '40px';
        dicaSair.style.opacity = '0';
        dicaSair.style.transition = 'opacity 2s ease 2s'; 
        dicaSair.style.cursor = 'pointer';
        
        tela.appendChild(fotoDestaque);
        tela.appendChild(textoDestaque);
        tela.appendChild(dicaSair);
        
        // Faz a foto e os textos surgirem
        setTimeout(() => {
            fotoDestaque.style.opacity = '1';
            textoDestaque.style.opacity = '1';
            dicaSair.style.opacity = '1';
        }, 100);

        // === CLIQUE PARA SAIR E PARAR A MÚSICA ===
        tela.addEventListener('click', () => {
            // Pausa a música
            if (musica) {
                musica.pause();         
                musica.currentTime = 0; 
            }
            
            // Faz a tela preta sumir suavemente
            tela.style.transition = "opacity 1s ease";
            tela.style.opacity = "0";
            setTimeout(() => tela.remove(), 1000);
        });

    }, delay + 2000); // Começa 2 segundos depois da última frase do terminal
}