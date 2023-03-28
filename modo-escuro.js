/** Define o tema atual */
function defineTema(tema) {
    if (!tema) {
        // Primeiro tenta recuperar o que estava salvo
        tema = localStorage.getItem('tema');
    }
    if (!tema) {
        // Nenhum tema salvo. Pega a preferência
        const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
        tema = prefereEscuro ? 'escuro' : 'claro';
    }
    // Armazena para a próxima visita
    localStorage.setItem('tema', tema);
    // Define os estilos no elemento <body>
    if (tema === 'claro') {
        document.body.classList.add('claro');
        document.body.classList.remove('escuro');
    } else {
        document.body.classList.add('escuro');
        document.body.classList.remove('claro');
    }
    document.getElementById('alterna-tema').innerHTML = 
        document.getElementById(`icone-${tema}`).innerHTML;
}

/** Alterna o tema atual */
function alternaTema() {
    const atual = localStorage.getItem('tema');
    defineTema(atual == 'claro' ? 'escuro' : 'claro');
}
