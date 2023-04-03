const temas = ['auto', 'claro', 'escuro'];
const nomes = ['Automático', 'Claro', 'Escuro'];

/** Define o tema atual */
function defineTema(tema) {
    if (!tema) {
        // Primeiro tenta recuperar o que estava salvo
        tema = localStorage.getItem('tema') || 'auto';
    }
    // Armazena para a próxima visita
    localStorage.setItem('tema', tema);

    // Se o tema for automático, usa o media query
    let temaFinal = tema;
    if (temaFinal === 'auto') {
        const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
        temaFinal = prefereEscuro ? 'escuro' : 'claro';
    }
    
    // Define os estilos no elemento <body>
    if (temaFinal === 'claro') {
        document.body.classList.add('claro');
        document.body.classList.remove('escuro');
    } else {
        document.body.classList.add('escuro');
        document.body.classList.remove('claro');
    }

    // Atualiza o nome do tema
    document.getElementById('nome-tema').innerHTML =
        nomes[temas.indexOf(tema)];
    // Atualiza o ícone do tema
    document.getElementById('icone-tema').innerHTML = 
        document.getElementById(`icone-${tema}`).innerHTML;

}

/** Alterna o tema atual */
function alternaTema() {
    const atual = localStorage.getItem('tema') || 'auto';
    let proximo = temas.indexOf(atual) + 1;
    if (proximo >= temas.length) {
        proximo = 0;
    }
    defineTema(temas[proximo]);
}

/** Quando o usuário muda a preferência, ajustar */
window.matchMedia('(prefers-color-scheme: dark)').onchange = e => {
    const atual = localStorage.getItem('tema') || 'auto';
    if (atual === 'auto') {
        defineTema(atual);
    }
};