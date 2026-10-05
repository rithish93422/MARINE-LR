window.addEventListener(
  "marineMessagesUpdated",
  (event) => {

    const messages = event.detail;

    const list =
      document.getElementById("messageList");

    if (!list) return;

    list.innerHTML = "";

    const entries =
      Object.values(messages).reverse();

    if (entries.length === 0) {
      list.innerHTML =
        "<p>No messages received.</p>";
      return;
    }

    entries.forEach((message) => {

      const card =
        document.createElement("div");

      card.className =
        "marine-message";

      card.innerHTML = `
        <h3>${message.boatId || "Unknown Boat"}</h3>

        <p>
          <b>Message:</b>
          ${message.type || "Unknown"}
        </p>

        <p>
          <b>Latitude:</b>
          ${message.latitude}
        </p>

        <p>
          <b>Longitude:</b>
          ${message.longitude}
        </p>

        <p>
          <b>RSSI:</b>
          ${message.rssi ?? "--"} dBm
        </p>

        <p>
          <b>Source:</b>
          ${message.source || "LoRa"}
        </p>
      `;

      list.appendChild(card);

    });

  }
);
