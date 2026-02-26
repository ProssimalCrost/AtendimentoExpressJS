export async function notifyNewAtendimento() {

  // Permissão do navegador
  if (Notification.permission !== "granted") {
    await Notification.requestPermission();
  }

  if (Notification.permission === "granted") {

    // Notificação do Windows
    new Notification("Novo Atendimento 🚨", {
      body: "Um novo atendimento foi criado.",
      icon: "/images/icon.png" // opcional
    });

    // Som
    const audio = new Audio("/alert.mp3");
    audio.play();

  }
}