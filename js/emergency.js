window.addEventListener(
    "marineMessagesUpdated",
    function (event) {

        const messages = event.detail || {};

        const emergencyList =
            document.getElementById("emergencyList");

        const status =
            document.getElementById("emergencyStatus");

        if (!emergencyList) return;

        const emergencies =
            Object.values(messages)
            .filter(message =>
                message.type === "EMERGENCY"
            )
            .reverse();

        if (emergencies.length === 0) {

            status.textContent = "SAFE";
            status.className =
                "status-badge safe";

            emergencyList.innerHTML = `
                <div class="empty-emergency">
                    <h3>No Emergency</h3>
                    <p>
                        No active emergency
                        messages received.
                    </p>
                </div>
            `;

            return;
        }

        status.textContent = "EMERGENCY";
        status.className =
            "status-badge danger";

        emergencyList.innerHTML = "";

        emergencies.forEach(message => {

            const latitude =
                Number(message.latitude);

            const longitude =
                Number(message.longitude);

            const mapURL =
                `https://www.google.com/maps?q=${latitude},${longitude}`;

            const card =
                document.createElement("div");

            card.className =
                "emergency-card";

            card.innerHTML = `

                <div class="emergency-top">

                    <div>
                        <span class="emergency-label">
                            🚨 EMERGENCY
                        </span>

                        <h3>
                            ${message.boatId || "Unknown Boat"}
                        </h3>
                    </div>

                    <span class="lora-label">
                        LoRa
                    </span>

                </div>

                <div class="location-data">

                    <div class="location-item">
                        <span>Latitude</span>
                        <strong>
                            ${latitude.toFixed(6)}
                        </strong>
                    </div>

                    <div class="location-item">
                        <span>Longitude</span>
                        <strong>
                            ${longitude.toFixed(6)}
                        </strong>
                    </div>

                    <div class="location-item">
                        <span>RSSI</span>
                        <strong>
                            ${message.rssi ?? "--"} dBm
                        </strong>
                    </div>

                </div>

                <div class="map-button-container">

                    <a
                        href="${mapURL}"
                        target="_blank"
                        class="map-button"
                    >
                        📍 OPEN BOAT LOCATION
                    </a>

                </div>

            `;

            emergencyList.appendChild(card);

        });

    }
);
