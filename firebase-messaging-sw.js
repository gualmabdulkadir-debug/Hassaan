// Service worker: shows a phone notification when a new order arrives, even if the site is closed.
// Upload this file to GitHub next to index.html (same folder). Do not rename it.
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const u = (e.notification.data && e.notification.data.url) || "./";
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(async (l) => {
      for (const c of l) {
        try { await c.navigate(u); } catch (x) {}
        if ("focus" in c) return c.focus();
      }
      return clients.openWindow(u);
    })
  );
});

importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCWrKkSmgPXDt6KL7FNyMLZeI6kXd4ukU0",
  authDomain: "hassaan-s.firebaseapp.com",
  projectId: "hassaan-s",
  storageBucket: "hassaan-s.firebasestorage.app",
  messagingSenderId: "12302351650",
  appId: "1:12302351650:web:6c5a5c4ced2b210f79397b",
});

firebase.messaging().onBackgroundMessage((p) => {
  const d = p.data || {};
  return self.registration.showNotification(d.title || "New order", {
    body: d.body || "",
    tag: d.tag || "order",
    renotify: true,
    requireInteraction: true,
    vibrate: [300, 150, 300, 150, 300],
    data: { url: d.url || "./" },
  });
});
