export default {
  setup() {
    if (!("Notification" in window)) {
      console.error("This app  doesn't support notification!");
    }

    if (Notification.permission === "granted") {
      return;
    }

    if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Permission has been grented");
        }
      });
    }
  },

  show({ title, body }) {
    new Notification(title, { body });
  },
};
