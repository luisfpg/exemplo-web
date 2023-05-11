const REAIS = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

async function mostraLista() {
  document.title = 'Lista de produtos';
  document.body.innerHTML = '';

  const titulo = document.createElement('h1');
  titulo.innerHTML = 'Produtos disponíveis';
  document.body.appendChild(titulo);

  const lista = document.createElement('div');
  lista.className = 'lista';

  const response = await fetch('../produtos/produtos.json');
  const produtos = await response.json();
  for (const produto of produtos) {
    const item = document.createElement('a');
    item.href = '#';
    item.className = 'item';
    item.addEventListener('click', e => {
      mostraProduto(produto.id);
      e.preventDefault();
    });

    const img = document.createElement('img');
    img.src = `../produtos/${produto.imagem}`;
    img.alt = 'Imagem do produto';
    item.appendChild(img);

    const nome = document.createElement('div');
    nome.className = 'nome'
    nome.innerText = produto.nome
    item.appendChild(nome);

    const preco = document.createElement('div');
    preco.className = 'preco';
    preco.innerText = REAIS.format(produto.preco);
    item.appendChild(preco);

    lista.appendChild(item);
  }
  document.body.appendChild(lista);
}

async function mostraProduto(id) {
  const response = await fetch(`../produtos/produto_${id}.json`);
  const produto = await response.json();
  
  document.body.innerHTML = '';
  document.title = produto.nome;

  const detalhe = document.createElement('div');
  detalhe.className = 'detalhe';

  const titulo = document.createElement('h1');
  titulo.innerText = produto.nome;
  detalhe.appendChild(titulo);

  const preco = document.createElement('div');
  preco.className = 'preco';
  preco.innerText = REAIS.format(produto.preco);
  detalhe.appendChild(preco);

  const img = document.createElement('img');
  img.src = `../produtos/${produto.imagem}`;
  img.alt = 'Imagem do produto';
  detalhe.appendChild(img);

  const descricao = document.createElement('div');
  descricao.className = 'descricao'
  descricao.innerHTML = produto.descricao;
  detalhe.appendChild(descricao);

  const voltar = document.createElement('a');
  voltar.className = 'voltar';
  voltar.href = '#';
  voltar.innerText = 'Voltar à lista';
  voltar.addEventListener('click', e => {
    mostraLista();
    e.preventDefault();
  });
  detalhe.appendChild(voltar);

  document.body.appendChild(detalhe);
}