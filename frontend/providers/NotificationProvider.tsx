"use client";

import { useEffect } from "react";
import {socket} from "@/lib/socket";
import { notifyWindows, playSound } from "@/lib/notifications";

export default function NotificationProvider({ children }: any) {

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    socket.on("novo-atendimento", (data) => {
      notifyWindows(
        "Novo atendimento",
        `Novo atendimento de: ${data.name}`
      );

      playSound();
    });

    return () => {
      socket.off("novo-atendimento");
    };
  }, []);

  return children;
}