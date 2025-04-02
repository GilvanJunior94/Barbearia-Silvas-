document.addEventListener("DOMContentLoaded", function () {
  carregarServicos();
  carregarProdutos();
  carregarQuimicas();
  carregarBarbeiros();

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

    // Envia para a planilha
    fetch(
      "https://script.google.com/macros/s/AKfycbxYv1HWEoS9_rRqv7MyvEDFhRL-kHr_03pQ6fOrfGTPg0Ba7wnzSNVukf0ywQ_IC20Jtg/exec",
      {
        method: "POST",
        body: JSON.stringify({
          barbeiro,
          produto,
          servico,
          quimica,
          pagamento,
          totalBruto: total.toFixed(2),
          desconto: desconto.toFixed(2),
          totalFinal: totalFinal.toFixed(2),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.text())
      .then((msg) => console.log("Salvo na planilha:", msg))
      .catch((err) => console.error("Erro ao salvar:", err));
  });
});

const baseURL =
  "https://script.google.com/macros/s/AKfycbxYv1HWEoS9_rRqv7MyvEDFhRL-kHr_03pQ6fOrfGTPg0Ba7wnzSNVukf0ywQ_IC20Jtg/exec";

function carregarServicos() {
  fetch(baseURL + "?aba=Serviços")
    .then((res) => res.json())
    .then((data) => {
      const select = document.getElementById("servico");
      select.innerHTML = '<option value="">Nenhum</option>';
      data.slice(1).forEach((row) => {
        const nome = row[1];
        const preco = row[2];
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = `${nome} - R$ ${preco}`;
        select.appendChild(option);
      });
    });
}

function carregarProdutos() {
  fetch(baseURL + "?aba=Produtos")
    .then((res) => res.json())
    .then((data) => {
      const select = document.getElementById("produto");
      select.innerHTML = '<option value="">Nenhum</option>';
      data.slice(1).forEach((row) => {
        const nome = row[1];
        const preco = row[2];
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = `${nome} - R$ ${preco}`;
        select.appendChild(option);
      });
    });
}

function carregarQuimicas() {
  fetch(baseURL + "?aba=Quimicas")
    .then((res) => res.json())
    .then((data) => {
      const select = document.getElementById("quimica");
      select.innerHTML = '<option value="">Nenhum</option>';
      data.slice(1).forEach((row) => {
        const nome = row[1];
        const preco = row[2];
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = `${nome} - R$ ${preco}`;
        select.appendChild(option);
      });
    });
}

function carregarBarbeiros() {
  fetch(baseURL + "?aba=Barbeiros")
    .then((res) => res.json())
    .then((data) => {
      const select = document.getElementById("barbeiro");
      select.innerHTML = '<option value="">Selecione...</option>';
      data.slice(1).forEach((row) => {
        const nome = row[1];
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = nome;
        select.appendChild(option);
      });
    });
}
