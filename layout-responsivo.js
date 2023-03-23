function alternaMenu() {
    if (window.matchMedia('(min-width: 600px)').matches) {
        escondeMenu()
    } else {
        document.body.classList.toggle('menu');
    }
}

function escondeMenu() {
    document.body.classList.remove('menu');
}

window.matchMedia('(min-width: 600px)').onchange = escondeMenu;