document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const barbeiro = document.getElementById("barbeiro").value;
    const produto = document.getElementById("produto").value;
    const servico = document.getElementById("servico").value;
    const quimica = document.getElementById("quimica").value;
    const valorExtra =
      parseFloat(document.getElementById("quantidade").value) || 0;
    const pagamento = document.getElementById("pagamento").value;

    const precos = {
      produto: {
        Gel: 15,
        Pomada: 25,
        Minoxidil: 80,
      },
      servico: {
        Corte: 40,
        Barba: 35,
        Combo: 45,
        Pezinho: 15,
        Sobrancelhas: 15,
      },
      quimica: {
        Luzes: 100,
        Progressiva: 100,
        Botox: 100,
        Platinado: 150,
        Alisante: 35,
      },
    };

    let total = 0;
    if (produto) total += precos.produto[produto];
    if (servico) total += precos.servico[servico];
    if (quimica) total += precos.quimica[quimica];
    total += valorExtra;

    let desconto = 0;
    if (pagamento === "Cartão de Crédito") {
      desconto = total * 0.0499;
    } else if (pagamento === "Cartão de Débito") {
      desconto = total * 0.0299;
    }

    const totalFinal = total - desconto;

    alert(
      `Atendimento registrado!\n\n` +
        `Barbeiro: ${barbeiro}\n` +
        `Produto: ${produto || "Nenhum"}\n` +
        `Serviço: ${servico || "Nenhum"}\n` +
        `Química: ${quimica || "Nenhum"}\n` +
        `Forma de Pagamento: ${pagamento}\n` +
        `Total Bruto: R$ ${total.toFixed(2)}\n` +
        `Desconto: R$ ${desconto.toFixed(2)}\n` +
        `Total Final: R$ ${totalFinal.toFixed(2)}`
    );
  });
});
