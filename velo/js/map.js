class Map {
    constructor() {
        this.showMap();
        this.showMarker();
    }

    showMap() {
        this.myMap = L.map('mapid').setView([48.691985, 6.186143], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(this.myMap);
    }

    showMarker() {
        fetch("https://api.jcdecaux.com/vls/v1/stations?contract=nancy&apiKey=65eb26bd8bbc5458f9fa6ef1c80ad15d92b1d964")
            .then(response => response.json())
            .then(stations => {
                stations.forEach(e => {
                    let station = {
                        name: e.name,
                        address: e.address,
                        positionLat: e.position.lat,
                        positionLng: e.position.lng,
                        status: e.status,
                        availableBike: e.available_bikes,
                        availableSpace: e.available_bike_stands
                    };

                    let myIcon = L.icon({
                        iconUrl: station.availableBike === 0 || station.status === "CLOSED" ? "images/rouge.png" : "images/vert.png",
                        iconSize: [35, 35],
                        iconAnchor: [12, 30]
                    });

                    let marker = L.marker([station.positionLat, station.positionLng], {icon: myIcon}).addTo(this.myMap);
                    marker.on("click", () => {
                        document.getElementById("reserv_name").textContent = "Nom : " + station.name;
                        document.getElementById("reserv_address").textContent = "Adresse : " + station.address;
                        document.getElementById("reserv_status").textContent = "Status : " + station.status;
                        document.getElementById("reserv_available_space").textContent = "Places disponibles : " + station.availableSpace;
                        document.getElementById("reserv_available_bike").textContent = "Vélos disponibles : " + station.availableBike;

                        sessionStorage.setItem("Name Station", station.name);
                        sessionStorage.setItem("Address Station", station.address);

                        document.getElementById("reserv_btn").style.display = station.availableBike === 0 ? "none" : "block";
                    });
                });
            })
            .catch(error => console.error('Erreur AJAX:', error));
    }
}

const map = new Map();