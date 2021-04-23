import React from "react";

const App = () => {
  const title = "Hello world";
  const enhancedTitle = title + " - it's React app";

  const sendNotification = () => {
    electron.notificationApi.sendNotification(
      "My notification from Electron app"
    );
  };

  return (
    <>
      <h1>{enhancedTitle}</h1>
      <button onClick={sendNotification}>Sent Notification</button>
    </>
  );
};

export default App;
