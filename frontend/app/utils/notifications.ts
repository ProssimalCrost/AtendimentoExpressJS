export function requestNotificationPermission() {
    if (typeof window === "undefined") return;
    if ("Notification" in window) {
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
    }
}
export function notifyNewAtendimento(name: string) {
    if (typeof window === "undefined") return;

    if (Notification.permission === "granted") {
        new Notification("Novo Atendimento", {
            body: `Novo atendimento de: ${name}`,
        });
    }
}