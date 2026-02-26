"use client";

import { useEffect } from "react";

export default function NotificationProvider() {

  useEffect(() => {

    if ("Notification" in window) {
      Notification.requestPermission();
    }

  }, []);

  return null;
}