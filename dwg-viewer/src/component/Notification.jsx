import React from "react";

const Notification = ({ message }) => {
  if (!message) return null;

  return (
    <div id="notification-overlay">
      <div className="notification">{message}</div>
    </div>
  );
};

export default Notification;
