document.addEventListener('DOMContentLoaded', () => {
    const limiteInput = document.getElementById('limite');
    const sortearBtn = document.getElementById('sortear-btn');
    const resultadoDiv = document.getElementById('resultado');
    const listaHistorico = document.getElementById('lista-historico');

    // Função para gerar um número aleatório
    function gerarNumeroAleatorio(max) {
        return Math.floor(Math.random() * max) + 1; // Gera entre 1 e 'max' (inclusive)
    }

    // Função para adicionar ao histórico
    function adicionarAoHistorico(numero) {
        const listItem = document.createElement('li');
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR');
        listItem.textContent = `Número Sorteado: ${numero} (às ${timeString})`;
        listaHistorico.prepend(listItem); // Adiciona no início da lista

        // Limita o histórico a, por exemplo, 10 itens para não ficar muito longo
        if (listaHistorico.children.length > 10) {
            listaHistorico.lastChild.remove();
        }
    }

    // Função principal de sorteio
    function sortearNumero() {
        const limite = parseInt(limiteInput.value);

        if (isNaN(limite) || limite < 1) {
            resultadoDiv.innerHTML = '<span style="color: #FF6347; font-size: 0.8em;">Digite um número limite válido (maior que 0).</span>';
            resultadoDiv.classList.remove('animado');
            return;
        }

        // Adiciona e remove classe para uma pequena animação
        resultadoDiv.classList.remove('animado');
        // Força reflow para a animação reiniciar (importante para browsers que otimizam demais)
        void resultadoDiv.offsetWidth;
        resultadoDiv.classList.add('animado');

        const numeroSorteado = gerarNumeroAleatorio(limite);
        resultadoDiv.textContent = numeroSorteado;
        adicionarAoHistorico(numeroSorteado);
    }

    // Event Listeners
    sortearBtn.addEventListener('click', sortearNumero);

    // Opcional: Sortear ao pressionar Enter no campo limite
    limiteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sortearNumero();
        }
    });

    // Removi a chamada inicial de sortearNumero() aqui para evitar a "duplicação"
    // ou um sorteio automático ao carregar a página.
});
