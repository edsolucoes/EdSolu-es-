function enviarAgendamento(event) {
  event.preventDefault();
  const nome = document.getElementById("nomeCliente").value;
  const telefone = document.getElementById("telefoneCliente").value;
  const servico = document.getElementById("servicoCliente").value;
  const data = document.getElementById("dataCliente").value;
  const hora = document.getElementById("horaCliente").value;
  const observacoes = document.getElementById("obsCliente").value;
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
  window.open(url, "_blank");
}
