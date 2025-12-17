// pesquisa.js — filtra por data-cat (data-cat) e texto do .nome-produto
(function () {
  "use strict";

  // Normaliza texto: remove acentos e transforma em minúsculas
  function normalizarTexto(texto = "") {
    return String(texto)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  // Procura automaticamente o input da navbar (suporta vários ids comuns)
  function localizarInput() {
    return document.querySelector(
      '#barra-pesquisa, #barra-busca, #buscar, input[type="search"], .search-box input'
    );
  }

  // Função que efetivamente executa o filtro
  function aplicarFiltro(inputEl) {
    const termo = normalizarTexto(inputEl.value);
    const produtos = document.querySelectorAll(".produto");

    produtos.forEach(produto => {
      // Pega nome do produto (prioriza .nome-produto, fallback para data-nome)
      const nomeEl = produto.querySelector(".nome-produto");
      const nomeTexto = nomeEl ? nomeEl.textContent : (produto.dataset.nome || "");
      const categoria = produto.dataset.cat || produto.dataset.categoria || "";

      const nomeNorm = normalizarTexto(nomeTexto);
      const categoriaNorm = normalizarTexto(categoria);

      // Se termo vazio, mostra todos
      if (!termo) {
        produto.style.display = "";
        return;
      }

      if (nomeNorm.includes(termo) || categoriaNorm.includes(termo)) {
        produto.style.display = "block";
      } else {
        produto.style.display = "none";
      }
    });
  }

  // Inicializa: liga eventos e garante existência do input
  function initFiltro() {
    const input = localizarInput();

    if (!input) {
      console.warn("pesquisa.js: input de busca não encontrado. Use id='barra-pesquisa' ou 'barra-busca'.");
      return;
    }

    // Se o input estiver dentro de um <form>, previne o submit ao apertar Enter
    const formAncestor = input.closest("form");
    if (formAncestor) {
      formAncestor.addEventListener("submit", (e) => e.preventDefault());
    }

    // Evento enquanto digita (input)
    input.addEventListener("input", () => aplicarFiltro(input));

    // Evento para capturar Enter (e também Shift+Enter etc — aqui só Enter)
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault(); // evita submit/reload
        aplicarFiltro(input);
      }
      // Tecla Esc limpa a busca e mostra tudo
      if (ev.key === "Escape") {
        input.value = "";
        aplicarFiltro(input);
      }
    });

    // Opcional: executar uma vez ao carregar (se houver valor pré-preenchido)
    aplicarFiltro(input);
  }

  // Aguarda DOM pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFiltro);
  } else {
    initFiltro();
  }
})();
