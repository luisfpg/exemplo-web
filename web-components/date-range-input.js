class DateRangeInput extends HTMLElement {
  
  static get observedAttributes() { 
    return ['min', 'max']; 
  }

  static #toString(valor) {
    if (valor instanceof Date) {
      return valor.toISOString().substring(0, 10);
    } else if (typeof valor === 'string') {
      return valor;
    } else {
      return '';
    }
  }

  #root;
  #inicio;
  #fim;
  #separador;
  #eventHandler

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: 'closed' });
    this.#inicio = document.createElement('input');
    this.#inicio.type = 'date';
    this.#fim = document.createElement('input');
    this.#fim.type = 'date';
    this.#separador = document.createElement('div');
    this.#separador.innerHTML = '&nbsp;até&nbsp;';
    this.#eventHandler = () => {
      const event = new Event('change');
      this.dispatchEvent(event);
    };
  }

  connectedCallback() {
    if (!this.#inicio.parentElement) {
      const style = document.createElement('style');
      style.innerHTML = `
        :host {
          display: inline-flex;
          align-items: center;
        }
      `;
      this.#root.appendChild(style);
      this.#root.appendChild(this.#inicio);
      this.#root.appendChild(this.#separador);
      this.#root.appendChild(this.#fim);
      this.#root.appendChild(document.createElement('style'));
    }
    this.#inicio.addEventListener('change', this.#eventHandler);
    this.#fim.addEventListener('change', this.#eventHandler);
  }

  disconectedCallback() {
    this.#inicio.removeEventListener('change', this.#eventHandler);
    this.#fim.removeEventListener('change', this.#eventHandler);
  }

  attributeChangedCallback(nome, _antigo, novo) {
    if (['min', 'max'].includes(nome)) {
      this.#inicio.setAttribute(nome, novo);
      this.#fim.setAttribute(nome, novo);
    }
  }

  get value() {
    const inicio = this.#inicio.value === '' ? null : new Date(this.#inicio.value);
    const fim = this.#fim.value === '' ? null : new Date(this.#fim.value);
    if (inicio && fim && inicio.getTime() > fim.getTime()) {
      return '';
    }
    return `${DateRangeInput.#toString(inicio)}|${DateRangeInput.#toString(fim)}`;
  }

  set value(valor) {
    if (typeof valor === 'string') {
      var partes = valor.split('|');
      this.#inicio.value = DateRangeInput.#toString(partes[0]);
      this.#fim.value = DateRangeInput.#toString(partes[1]);
    } else {
      this.#inicio.value = '';
      this.#fim.value = '';
    }
  }
}

customElements.define('date-range-input', DateRangeInput);