/* scripts.js
   Controle de abas, typing effect, fundo estrelado, frases interativas e galerias
*/

// ---------- ELEMENTOS QUE APARECEM DEPOIS DA SAUDAÇÃO ----------
const elementosDepoisSaudacao = [
  ...document.querySelectorAll(".center-card"),
  document.querySelector("#tab-coisas .carousel")
];

// Esconder os elementos extras até a saudação terminar
elementosDepoisSaudacao.forEach(el => {
  if (el) el.classList.add("hidden");
});

// ---------- ABAS ----------
const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    panels.forEach(p => p.classList.add("hidden"));
    const panel = document.getElementById("tab-" + tab.dataset.tab);
    if (panel) panel.classList.remove("hidden");

    if (tab.dataset.tab === "coisas") carregarGaleria();
  });
});

// ---------- SAUDAÇÃO ----------
const typingText = document.getElementById("typing-text");
const btnContinuar = document.getElementById("btn-continuar");
let typingIndex = 0;
let fraseIndex = 0;

const hoje = new Date();
let hora = hoje.getHours();
let saudacao = (hora>=5 && hora<12) ? "Bom dia gatinha" :
               (hora>=12 && hora<18) ? "Boa tarde gatinha" : "Boa noite gatinha";

const frases = [
  saudacao,
  "Eu fiquei dias matutando em como fazer algo especial pra ti aqui.",
  "mesmo tão longe...",
  "Queria que tu soubesse o quanto tu é especial pra mim",
  "dai criei esse cantinho",
  "pra guardar mostrar algumas bobeiras minhas",
  "sei que tem poca coisa",
  "mas a gente pode ir colocando mais coisas com o tempo",
  "espero que tu goste",
  "Clique em Continuar"
];

function typeWriter() {
  if (typingIndex < frases[fraseIndex].length) {
    typingText.textContent += frases[fraseIndex][typingIndex];
    typingIndex++;
    setTimeout(typeWriter, 60);
  }
}

typeWriter();

btnContinuar.addEventListener("click", () => {
  if (fraseIndex < frases.length - 1) {
    fraseIndex++;
    typingIndex = 0;
    typingText.textContent = "";
    typeWriter();
  } else {
    document.getElementById("dialog-card").classList.add("hidden");

    elementosDepoisSaudacao.forEach(el => {
      if (el) el.classList.remove("hidden");
    });

    carregarGaleria();
  }
});

// ---------- SISTEMA DE ELEMENTOS LIMITADOS ----------
const ativos = [];
const LIMITE = 50;
const DURACAO = 10000;

function adicionarElemento(el) {
  sky.appendChild(el);
  ativos.push(el);

  if (ativos.length > LIMITE) {
    const velho = ativos.shift();
    velho.style.transition = "transform 1s ease, opacity 1s ease";
    velho.style.transform = "scale(0)";
    velho.style.opacity = "0";
    setTimeout(() => velho.remove(), 1000);
  }

  setTimeout(() => {
    if (el.parentNode) {
      el.style.transition = "transform 1s ease, opacity 1s ease";
      el.style.transform = "scale(0)";
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 1000);
      const index = ativos.indexOf(el);
      if (index !== -1) ativos.splice(index, 1);
    }
  }, DURACAO);
}

// ---------- FUNDO ESTRELADO ----------
const sky = document.getElementById("sky");
const emojis = ["⭐","🌟","✨","💫","🌙","🪐"];

function criarEstrela() {
  const e = document.createElement("div");
  e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  e.style.position = "absolute";
  e.style.left = Math.random() * window.innerWidth + "px";
  e.style.top = "-20px";
  e.style.fontSize = (10 + Math.random() * 15) + "px";
  e.style.opacity = Math.random();

  let top = -20;
  const speed = 0.5 + Math.random();
  function anim() {
    top += speed;
    e.style.top = top + "px";
    if (top < window.innerHeight) {
      requestAnimationFrame(anim);
    }
  }
  anim();

  adicionarElemento(e);
}
setInterval(criarEstrela, 200);

// ---------- CHUVA DE PALAVRINHAS ----------
const toggleChuva = document.getElementById("btn-chuva");
const palavrinhas = ["Gatinha 💖", "Totosa", "✨", "Uiii", "Princesa 👑", "Charmosa 🌸", "Demaaaiss", "Cavalo", "Musa 🎶","Delicia","Dengosa","Deusa do egito","Deusa grega","🌹"];
let intervaloChuva = null;

function criarPalavrinha() {
  const p = document.createElement("div");
  p.textContent = palavrinhas[Math.floor(Math.random()*palavrinhas.length)];
  p.style.position = "absolute";
  p.style.left = Math.random()*window.innerWidth + "px";
  p.style.top = "-20px";
  p.style.fontSize = (14+Math.random()*22)+"px";
  p.style.opacity = 0.9;
  p.style.color = "#fff";

  let top = -20;
  const speed = 0.5 + Math.random()*1.5;
  function anim(){
    top += speed;
    p.style.top = top + "px";
    if(top < window.innerHeight){
      requestAnimationFrame(anim);
    }
  }
  anim();

  adicionarElemento(p);
}

toggleChuva.addEventListener("change", () => {
  if (toggleChuva.checked) intervaloChuva = setInterval(criarPalavrinha, 200);
  else clearInterval(intervaloChuva);
});

// ---------- FRASES INTERATIVAS ----------
function criarFraseRandom(frasesArray){
  const f = document.createElement("div");
  f.textContent = frasesArray[Math.floor(Math.random()*frasesArray.length)];
  f.style.position = "absolute";
  f.style.left = Math.random()*window.innerWidth + "px";
  f.style.top = "-10px";
  f.style.fontSize = (10+Math.random()*15)+"px";
  f.style.opacity = 0.9;
  f.style.color = "#fff";

  let top = -20;
  const speed = 0.5 + Math.random()*1.5;
  function anim(){
    top += speed;
    f.style.top = top + "px";
    if(top < window.innerHeight){
      requestAnimationFrame(anim);
    }
  }
  anim();

  adicionarElemento(f);
}

document.getElementById("btn-cabelo").addEventListener("click", () =>
  criarFraseRandom(["Não vai cortar na tesoura ","💖","Parece de uma princesa","😍","👍","Usa sabonete?"," ✨","Franjuda"])
);

document.getElementById("btn-sorriso").addEventListener("click", () =>
  criarFraseRandom(["Me deixa todo sem jeito","💖","Mo fofinho","Quero te ver sorrindo sempre"," ✨"])
);

document.getElementById("btn-corpo").addEventListener("click", () =>
  criarFraseRandom(["Que parece até que foi esculpido","Gostosona","ela toda cheia de curva eu todo sem freio","Auau🐺","Delicia, pisa em mim","Rabão espetacular"," ✨", "🌸"])
);

// ---------- EFEITO BOUNCE ----------
function addBounceEffect(buttonId){
  const btn = document.getElementById(buttonId);
  if(!btn) return;
  btn.addEventListener("click", () => {
    btn.classList.remove("bounce");
    void btn.offsetWidth;
    btn.classList.add("bounce");
  });
}
["btn-cabelo","btn-sorriso","btn-corpo"].forEach(addBounceEffect);
// ---------- GALERIA (SEM FORMULÁRIO) ----------

// Só mantemos a referência ao container
const galeriaFull = document.getElementById("galeria-full");

// ---------- ITENS INICIAIS ----------
 const coisasIniciais = [
    
  { titulo: "Jane Doe - Zenless Zone Zero", texto: "Quando dei uma olhada na personagem, a primeira coisa q veio na cabeça foi tu,ja que vcs são poucas ideias e corajosas, mas tem os momentos de frajilidade.Em aparecia, abas tem o cabelo preto, com o peteado um pouco parecido ainda por cima perigosamente atreantes", imagem: "img/jd.jpeg" },
  {titulo: "Kuromi", texto: "Sim, eu sei que tu gosta mais da Hello Kitty, mas, acho que a tua personalidade bate mais com ela " , imagem: "img/kuromi.jpeg" },
  {titulo: "Ahri - League of Legends", texto: "Vcs duas tem um vabelo lindo pra caraca,além de ter aquele olhar que quebra qualquer um facil facil", imagem: "img/ahri.jpeg" },
{titulo: "Velma - Scooby Doo", texto: "Tu havia citado isso quando a gente começou a se falar, dai so levei isso pra mente como verdade", imagem: "img/velma.jpeg" },
{titulo: "Ashley Graves", texto: "Tu ja deve saber o porque", imagem: "img/ashley.jpeg" },
{titulo: "Mimosa - Black Clover", texto: "Mesmo sabendo que tu vai me dar uma facada, sei que debaixo dessa insanidade deliciosa tu é toda fofinha e carinhosa, principalemnet quando assopra na cara de alguém. Alem disso, o cabelo de vocês duas parece um poco", imagem: "img/mimosa.jpeg" },
{titulo: "Anibella - Otherworld Legends", texto: "Other world é o jogo que mais joguei na minha vida, mas um dos herois que tem nele,é ela, além de ambas serem fofinhas, tem o gatinho dela que lembra teu amor por gatos e é toda misteriosa e cheia de segredos, alem de ser incrivelmente linda", imagem: "img/anibella.jpeg" },
{titulo:"Rosas Azuis", texto:"Tu ja sabe o porque", imagem:"img/azul.jpeg"},
{titulo:"Girlfriend - Friday Night Funkin'", texto:"Alem de ser charmosa igual tu, ela tem esse vestido vermelho que parece com o teu que me arrepenta por completo", imagem:"img/Girlfriend.jpeg"}
     ];

let currentSlide = 0;

function carregarGaleria(){
  if (!galeriaFull) return;

  galeriaFull.innerHTML = '';

  coisasIniciais.forEach(item => {
    const slide = document.createElement("div");
    slide.className = "slide-item";
    slide.innerHTML = `
      ${item.imagem ? `<img src="${item.imagem}" alt="${item.titulo}">` : ''} 
      <div class="slide-content">
        <h3>${item.titulo}</h3>
        <p>${item.texto}</p>
      </div>
    `;
    galeriaFull.appendChild(slide);
  });

  mostrarSlide(0);
}

function mostrarSlide(index){
  const slides = document.querySelectorAll('.slide-item');
  
  if(!slides.length) return;

  if(index < 0) currentSlide = slides.length - 1;
  else if(index >= slides.length) currentSlide = 0;
  else currentSlide = index;

  slides.forEach((s, i) => {
    s.style.display = (i === currentSlide) ? 'flex' : 'none';
  });
}

// Prev / Next
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');

if (btnPrev) btnPrev.addEventListener('click', () => mostrarSlide(currentSlide - 1));
if (btnNext) btnNext.addEventListener('click', () => mostrarSlide(currentSlide + 1));



