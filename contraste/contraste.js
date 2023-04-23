const FUNDOS = ['#000', '#fff'];
const TEXTOS = ['#222', '#444', '#666', '#888', '#aaa', '#ccc', '#eee'];

function conteudo() {
  const main = document.querySelector('main');
  for (let f = 0; f < FUNDOS.length; f++) {
    const fundo = FUNDOS[f];
    for (let t = 0; t < TEXTOS.length; t++) {
      const texto = TEXTOS[t];
      const contraste = tinycolor.readability(texto, fundo);
      const div = document.createElement('div');
      div.style.backgroundColor = fundo;
      div.style.color = texto;
      div.innerHTML = `
        <div>fg: ${texto}</div>
        <div>bg: ${fundo}</div>
        <div>taxa: ${contraste.toFixed(1)}</div>
      `;
      main.appendChild(div);
    }
  }
}
