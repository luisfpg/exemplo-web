class DateRangeDisplay extends HTMLElement {

  static #toString(date) {
    return String(date.getUTCDate()).padStart(2, '0') + '/'
      + String(date.getUTCMonth() + 1).padStart(2, '0') + '/'
      + String(date.getUTCFullYear()).padStart(4, '0');
  }

  static get observedAttributes() {
    return ['value'];
  }

  #root;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: 'closed' });
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback() {
    this.#render();
  }

  #render() {
    let mensagem = 'Você não especificou um intervalo válido';
    const valor = this.getAttribute('value');
    if (typeof valor === 'string') {
      const partes = valor === '' ? [] : valor.split('|');
      const inicio = partes[0]?.length > 0 ? new Date(partes[0]) : null;
      const fim = partes[1]?.length > 0 ? new Date(partes[1]) : null;

      if (inicio && fim) {
        mensagem = `Você especificou um intervalo entre 
          ${DateRangeDisplay.#toString(inicio)} 
          e ${DateRangeDisplay.#toString(fim)}`;
      } else if (inicio) {
        mensagem = `Você especificou um intervalo iniciando em
          ${DateRangeDisplay.#toString(inicio)}`;
      } else if (fim) {
        mensagem = `Você especificou um intervalo terminando em
            ${DateRangeDisplay.#toString(fim)}`;
      }
    }
    this.#root.innerHTML = mensagem;
  }
}

customElements.define('date-range-display', DateRangeDisplay);