// === VARIÁVEIS GLOBAIS ===
const photos = [
    "img/meu_amor.jpeg", "img/nois.jpeg", "img/2.jpeg", 
    "img/3.jpeg", "img/4.jpeg", "img/5.jpeg", "img/7.jpeg", 
    "img/9.jpeg", "img/10.jpeg", "img/11.jpeg", "img/12.jpeg"
];
let currentPhotoIndex = 0;
let clickCount = 0;
let eggActive = false;

// Atenção: Mês 3 no JS é ABRIL. Se o namoro começou em Março, mude para 2.
const startDate = new Date(2026, 3, 16, 22, 0, 0); 

const message = "fiz esse site enquanto vc tava na aula da USP só pra lembrar o quanto você é especial pra mim.";
let messageIndex = 0;
const typingSpeed = 35;

// === FUNÇÕES PRINCIPAIS ===
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

function spawnHiddenRing() {
    if (eggActive) return;
    eggActive = true;

    const ring = document.createElement("div");
    ring.className = "hidden-ring";
    ring.innerHTML = "💍";

    const randomX = Math.floor(Math.random() * 75) + 10;
    const randomY = Math.floor(Math.random() * 75) + 10;

    ring.style.left = `${randomX}vw`;
    ring.style.top = `${randomY}vh`;

    ring.addEventListener("click", function handleClick() {
        ring.removeEventListener("click", handleClick);
        ring.classList.add("ring-box");
        
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

// === HELPER PARA CARREGAR O SCRIPT DO MOSAICO COM SEGURANÇA ===
function carregarScriptMosaico(callback) {
    if (typeof Pmframe !== "undefined") {
        callback();
        return;
    }

    const scriptExistente = document.querySelector('script[src*="mosaicEmbed.js"]');
    if (scriptExistente) {
        scriptExistente.addEventListener("load", callback, { once: true });
        return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.picturemosaics.com/photo-mosaic-tool/js/mosaicEmbed.js";
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
}

// === EASTER EGG 3: MOSAICO ("euteamo" / 10 toques) ===
function iniciarMosaicoAmor() {
    // Evita abrir duas telas de mosaico ao mesmo tempo
    if (document.getElementById("overlayMosaicoAmor")) return;

    const musica = document.getElementById("musicaFundo");
    if (musica) {
        musica.currentTime = 0;
        musica.play().catch(() => {});
    }

    const tela = document.createElement("div");
    tela.id = "overlayMosaicoAmor";
    tela.style.position = "fixed";
    tela.style.top = "0";
    tela.style.left = "0";
    tela.style.width = "100vw";
    tela.style.height = "100vh";
    tela.style.backgroundColor = "#050505";
    tela.style.color = "#ff4b6e";
    tela.style.fontFamily = "'VT323', monospace";
    tela.style.zIndex = "999999";
    tela.style.display = "flex";
    tela.style.flexDirection = "column";
    tela.style.justifyContent = "center";
    tela.style.alignItems = "center";
    tela.style.textAlign = "center";
    tela.style.padding = "20px";
    tela.style.boxSizing = "border-box";
    tela.style.overflowY = "auto";
    tela.style.opacity = "0";
    tela.style.transition = "opacity 0.6s ease";

    const titulo = document.createElement("p");
    titulo.innerText = "> COMPILANDO NOSSAS MEMÓRIAS... EU TE AMO ♡";
    titulo.style.fontSize = "1.8rem";
    titulo.style.margin = "0 0 16px 0";

    const mosaicBox = document.createElement("div");
    mosaicBox.id = "pictureMosaicsEmbed";
    mosaicBox.style.width = "100%";
    mosaicBox.style.maxWidth = "680px";
    mosaicBox.style.minHeight = "320px";
    mosaicBox.style.borderRadius = "14px";
    mosaicBox.style.overflow = "hidden";
    mosaicBox.style.boxShadow = "0 0 35px rgba(255, 75, 110, 0.35)";
    mosaicBox.style.backgroundColor = "#0d0d12";

    const btnVoltar = document.createElement("button");
    btnVoltar.innerText = "[ fechar e voltar ]";
    btnVoltar.style.marginTop = "20px";
    btnVoltar.style.padding = "10px 22px";
    btnVoltar.style.background = "transparent";
    btnVoltar.style.color = "#ff4b6e";
    btnVoltar.style.border = "1px solid #ff4b6e";
    btnVoltar.style.borderRadius = "8px";
    btnVoltar.style.fontFamily = "'VT323', monospace";
    btnVoltar.style.fontSize = "1.4rem";
    btnVoltar.style.cursor = "pointer";

    tela.appendChild(titulo);
    tela.appendChild(mosaicBox);
    tela.appendChild(btnVoltar);
    document.body.appendChild(tela);

    requestAnimationFrame(() => {
        tela.style.opacity = "1";
    });

    carregarScriptMosaico(() => {
        try {
            const pmFrame = new Pmframe({
                element: "pictureMosaicsEmbed",
                uid: "M1484961",
                pid: "p0",
                stor: "s7/v136"
            });
            pmFrame.init();
        } catch (err) {
            mosaicBox.innerHTML = `<p style="padding: 24px; font-size: 1.4rem;">não consegui carregar o mosaico agora :(</p>`;
        }
    });

    btnVoltar.addEventListener("click", (e) => {
        e.stopPropagation();
        if (musica) {
            musica.pause();
            musica.currentTime = 0;
        }
        tela.style.opacity = "0";
        setTimeout(() => tela.remove(), 600);
    });
}

// === LÓGICA DO TERMINAL / APAGÃO ("grazi" / "murilo") ===
function iniciarHackEApagao(nomeAlvo) {
    const isGrazi = nomeAlvo === "grazi";
    
    const audioId = isGrazi ? "musicaFundo" : "musicaFundo2";
    const textoTerminalFinal = isGrazi ? "> STATUS: AMOR DA MINHA VIDA. ♡" : "> APRESENTANDO O TONHO:";
    const textoDestaqueFinal = isGrazi ? "só tenho olhos pra você." : "será que você me ama?";
    
    // COLOQUE O NOME DAS FOTOS CERTAS AQUI EMBAIXO:
    const imagemAtual = isGrazi ? "img/8.jpeg" : "img/foto_do_murilo.jpeg"; 
    
    const musica = document.getElementById(audioId); 
    if (musica) {
        musica.currentTime = 0;
        musica.play().catch(() => {});         
    }

    const tela = document.createElement('div');
    tela.style.position = 'fixed';
    tela.style.top = '0';
    tela.style.left = '0';
    tela.style.width = '100vw';
    tela.style.height = '100vh';
    tela.style.backgroundColor = '#050505';
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

    const linhas = [
        "> ATIVANDO TONHÃO MASTER...",
        "> VERIFICANDO CREDENCIAIS...",
        `> USUÁRIO '${nomeAlvo.toUpperCase()}' IDENTIFICADO.`,
        textoTerminalFinal
    ];

    let delay = 0;
    linhas.forEach((linha) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.style.margin = '10px 0';
            p.innerText = linha;
            tela.appendChild(p);
        }, delay);
        delay += 1200;
    });

    setTimeout(() => {
        tela.innerHTML = '';
        tela.style.background = '#000000';
        tela.style.transition = 'background 2s ease';
        
        const fotoDestaque = document.createElement('img');
        fotoDestaque.src = imagemAtual;
        fotoDestaque.style.width = '300px';
        fotoDestaque.style.maxWidth = '80vw';
        fotoDestaque.style.borderRadius = '15px';
        fotoDestaque.style.boxShadow = '0 0 40px rgba(255, 75, 110, 0.6)';
        fotoDestaque.style.opacity = '0';
        fotoDestaque.style.transition = 'opacity 2s ease';
        
        const textoDestaque = document.createElement('p');
        textoDestaque.innerText = textoDestaqueFinal;
        textoDestaque.style.color = '#ff4b6e';
        textoDestaque.style.fontFamily = "'VT323', monospace";
        textoDestaque.style.fontSize = '2.5rem';
        textoDestaque.style.marginTop = '20px';
        textoDestaque.style.opacity = '0';
        textoDestaque.style.transition = 'opacity 2s ease 1s'; 
        
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
        
        setTimeout(() => {
            fotoDestaque.style.opacity = '1';
            textoDestaque.style.opacity = '1';
            dicaSair.style.opacity = '1';
        }, 100);

        tela.addEventListener('click', () => {
            if (musica) {
                musica.pause();         
                musica.currentTime = 0; 
            }
            tela.style.transition = "opacity 1s ease";
            tela.style.opacity = "0";
            setTimeout(() => tela.remove(), 1000);
        });
    }, delay + 2000);
}

// === EVENTOS GLOBAIS DA PÁGINA ===
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

    const mainPhoto = document.getElementById("mainPhoto");
    if (mainPhoto) {
        mainPhoto.addEventListener("click", () => {
            togglePhoto();
        });
    }

    const clues = document.querySelectorAll('.secret-clue');
    const modal = document.getElementById('letterModal'); 
    const closeBtn = document.getElementById('closeLetter'); 
    let foundCount = 0;

    function activateStar(element) {
        if (!element.classList.contains('found')) {
            element.classList.add('found');
            foundCount++;
            
            if (foundCount === 3) {
                setTimeout(() => {
                    modal.classList.add('show');
                }, 600);
            }
        }
    }

    clues.forEach(clue => {
        clue.addEventListener('touchstart', function(e) {
            e.preventDefault(); 
            activateStar(this);
        }, { passive: false });
        
        clue.addEventListener('click', function(e) {
            e.preventDefault();
            activateStar(this);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    // Cheat Code Mobile (5 = grazi | 8 = murilo | 10+ = euteamo)
    const textoMensagem = document.getElementById("typewriter");
    let contagemToques = 0;
    let timerToque;

    if (textoMensagem) {
        textoMensagem.style.cursor = "pointer";
        textoMensagem.style.touchAction = "manipulation";
        
        textoMensagem.addEventListener("click", () => {
            contagemToques++;
            clearTimeout(timerToque);
            
            timerToque = setTimeout(() => {
                if (contagemToques >= 10) {
                    iniciarMosaicoAmor();
                } else if (contagemToques >= 8) {
                    iniciarHackEApagao("murilo");
                } else if (contagemToques >= 5) {
                    iniciarHackEApagao("grazi");
                }
                contagemToques = 0;
            }, 650); 
        });
    }

    // Partículas do Fundo
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 40 }, 
                "color": { "value": "#ff4b6e" }, 
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": true },
                "size": { "value": 2, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#ff4b6e", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 0.8, "direction": "top", "random": true, "out_mode": "out" }
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

// === CHEAT CODE TECLADO (PC) ===
let inputBuffer = "";
window.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return; // Ignora Shift, Enter, Backspace, etc.
    inputBuffer += e.key.toLowerCase();
    
    if (inputBuffer.length > 20) {
        inputBuffer = inputBuffer.substring(inputBuffer.length - 20);
    }
    
    if (inputBuffer.includes("euteamo")) {
        inputBuffer = "";
        iniciarMosaicoAmor();
    } else if (inputBuffer.includes("grazi")) {
        inputBuffer = ""; 
        iniciarHackEApagao("grazi");
    } else if (inputBuffer.includes("murilo")) {
        inputBuffer = ""; 
        iniciarHackEApagao("murilo");
    }
});