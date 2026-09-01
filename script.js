// Lista com os nomes dos dois arquivos de foto
const photos = [
    "meu_amor.jpeg",  // Foto 1 (dela)
    "nois.jpeg"        // Foto 2 (vocês dois)
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
