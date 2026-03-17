export async function notifyNewAtendimento() {
  if (Notification.permission !== "granted") {
    await Notification.requestPermission();
  }

  if (Notification.permission === "granted") {
    new Notification("Novo Atendimento 🚨", {
      body: "Um novo atendimento foi criado.",
      icon: "/images/icon.png",
      silent: true // 🔥 ESSENCIAL
    });
  }

  // 🔊 Som CONTROLADO por você
  const audio = new Audio("/sounds/alert.mp3");
  audio.currentTime = 0;
  audio.play().catch(() => {});
}




/*export async function notifyNewAtendimento() {

  // Permissão do navegador
  if (Notification.permission !== "granted") {
    await Notification.requestPermission();
  }

  if (Notification.permission === "granted") {

    // Notificação do Windows
    new Notification("Novo Atendimento 🚨", {
      body: "Um novo atendimento foi criado.",
      icon: "/images/icon.png", // opcional
      silent: true, // para não tocar som padrão do navegador
    });

    // Som
    const audio = new Audio("/alert.mp3");
    audio.currentTime = 0; // Reinicia o som caso ja tenha sido tocado
    audio.play().catch(() => {}); // igonora o erro de autoplay

  }
}*/