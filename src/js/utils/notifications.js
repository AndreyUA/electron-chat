export default {
  setup() {
    if (!("Notification" in window)) {
      console.error("This app  doesn't support notification!");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Permission has been grented");
        }
      });
    }
  },
};
