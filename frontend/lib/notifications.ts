import { useEffect } from "react";

export function notifyWindows(title: string, body: string) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

export function playSound() {
  const audio = new Audio("/sounds/alert.mp3");
  audio.volume = 0.8;
  audio.play();
}