const emojis = ['🦁', '🦄', '🐶', '🐭', '🦊', '🐼', '🐯', '🦕'];
let cartas = [...emojis, ...emojis];
let primeiraCarta = null;
let bloqueado = false;

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function criarCarta(emoji) {
  const carta = document.createElement('div');
  carta.classList.add('carta');
  carta.dataset.valor = emoji;
  carta.innerText = emoji;

  carta.addEventListener('click', () => {
    if (bloqueado || carta.classList.contains('virada') || carta.classList.contains('pareada')) return;

    carta.classList.add('virada');

    if (!primeiraCarta) {
      primeiraCarta = carta;
    } else {
      bloqueado = true;
      if (carta.dataset.valor === primeiraCarta.dataset.valor) {
        carta.classList.add('pareada');
        primeiraCarta.classList.add('pareada');
        primeiraCarta = null;
        bloqueado = false;
      } else {
        setTimeout(() => {
          carta.classList.remove('virada');
          primeiraCarta.classList.remove('virada');
          primeiraCarta = null;
          bloqueado = false;
        }, 1000);
      }
    }
  });

  return carta;
}

function iniciarJogo() {
  const tabuleiro = document.getElementById('tabuleiro');
  embaralhar(cartas);
  cartas.forEach(emoji => {
    const carta = criarCarta(emoji);
    tabuleiro.appendChild(carta);
  });
}

iniciarJogo();
