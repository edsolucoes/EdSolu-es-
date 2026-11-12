async function enviarAgendamento(event) {
  event.preventDefault();

  const nome = document.getElementById("nomeCliente").value;
  const telefone = document.getElementById("telefoneCliente").value;
  const servico = document.getElementById("servicoCliente").value;
  const data = document.getElementById("dataCliente").value;
  const hora = document.getElementById("horaCliente").value;
  const observacoes = document.getElementById("obsCliente").value;

  const abaWhatsApp = window.open("", "_blank");

  if (!abaWhatsApp) {
    alert("Permita pop-ups para continuar com o agendamento.");
    return;
  }

  try {
    const clienteSupabase = window.supabase.createClient(
      "https://iynlldpesqcmdkjtwdny.supabase.co",
      "sb_publishable_kyhkqeE_uz1x_8QP70F5wQ_tq5dKU_R"
    );

    const { error } = await clienteSupabase
      .from("Agendamentos")
      .insert({
        nome: nome,
        telefone: telefone,
        servico: servico,
        data: data,
        horario: hora,
        observacoes: observacoes,
        status: "pendente"
      });

    if (error) {
      throw error;
    }

    const mensagem =
      "Olá! Vim pelo site da EdSoluções e gostaria de solicitar um agendamento.\n\n" +
      "Nome: " + nome + "\n" +
      "WhatsApp: " + telefone + "\n" +
      "Serviço: " + servico + "\n" +
      "Data desejada: " + data + "\n" +
      "Horário desejado: " + hora + "\n" +
      "Observações: " + (observacoes || "Nenhuma");

    const url = "https://wa.me/5585998674421?text=" +
      encodeURIComponent(mensagem);

    abaWhatsApp.location.href = url;

  } catch (erro) {
    abaWhatsApp.close();
    console.error("Erro ao salvar agendamento:", erro);
    alert("Não foi possível salvar seu agendamento. Tente novamente.");
  }
}



// GALERIA DE TRABALHOS
document.addEventListener("DOMContentLoaded", function () {
  const galeria = document.querySelector(".galeria");

  if (!galeria) return;

  const fotos = Array.from(galeria.querySelectorAll(".galeria-grade img"));
  const filtros = galeria.querySelectorAll(".filtro");
  const botaoVerTodos = document.getElementById("verTodosTrabalhos");
  const modal = document.getElementById("fotoAmpliada");
  const imagemAmpliada = modal.querySelector("img");
  const botaoFechar = modal.querySelector(".fechar-modal");

  let categoriaAtual = "todos";
  let mostrarTodas = false;

  function atualizarGaleria() {
    const fotosFiltradas = fotos.filter(function (foto) {
      return categoriaAtual === "todos" ||
        foto.dataset.categoria === categoriaAtual;
    });

    fotos.forEach(function (foto) {
      const pertenceCategoria =
        categoriaAtual === "todos" ||
        foto.dataset.categoria === categoriaAtual;

      const indice = fotosFiltradas.indexOf(foto);

      foto.hidden = !pertenceCategoria ||
        (!mostrarTodas && indice >= 6);
    });

    botaoVerTodos.hidden =
      fotosFiltradas.length <= 6 || mostrarTodas;

    botaoVerTodos.textContent = "Ver todos os trabalhos";
  }

  filtros.forEach(function (filtro) {
    filtro.addEventListener("click", function () {
      categoriaAtual = filtro.dataset.filtro;
      mostrarTodas = false;

      filtros.forEach(function (item) {
        item.classList.remove("ativo");
        item.setAttribute("aria-pressed", "false");
      });

      filtro.classList.add("ativo");
      filtro.setAttribute("aria-pressed", "true");

      atualizarGaleria();
    });
  });

  botaoVerTodos.addEventListener("click", function () {
    mostrarTodas = true;
    atualizarGaleria();
  });

  fotos.forEach(function (foto) {
    foto.addEventListener("click", function () {
      imagemAmpliada.src = foto.src;
      imagemAmpliada.alt = foto.alt;
      modal.showModal();
    });
  });

  botaoFechar.addEventListener("click", function () {
    modal.close();
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.close();
    }
  });

  atualizarGaleria();
});
