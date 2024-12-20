class Timer {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.validButton = document.getElementById("valid_button");
        this.timer = document.getElementById("timer");
        this.footerTimer = document.getElementById("footer_timer");
        this.validButton.addEventListener("click", this.showTimer.bind(this)); // Fait apparaitre le timer au click sur le bouton "réserver"
        this.cancelBtn = document.getElementById("cancel_button");
        this.reservBtn = document.getElementById("reserv_btn");
        this.formValidBtn = document.getElementById("submit_button")

        this.reservSection = document.getElementById("reserv_section");
        this.formResaSection = document.getElementById("formulaire_section");
        this.signSection = document.getElementById("signature_section");
        this.canvasTitle = document.getElementById("canvas_title");
        this.canvas = document.getElementById("canvas");
        this.footer = document.getElementById("footer");

        this.seconds = document.getElementById("seconds");
        this.minutes = document.getElementById("minutes");
        this.validButton.addEventListener("click", this.startTimer.bind(this));
        this.localSeconds = sessionStorage.getItem("Seconds");
        this.localMinutes = sessionStorage.getItem("Minutes");
        this.cancelBtn.addEventListener("click", this.cancelReservation.bind(this));
        window.addEventListener("load", this.storageTimer.bind(this)); // Charge la méthode storageTimer si refresh de la page
    }

    showTimer() {
        this.timer.style.display = "block";
    }

    startTimer() {
        clearInterval(this.interval);
        interval = setInterval(this.removeSeconds, 1000); // stockage du setInterval dans this.interval pour pouvoir faire un clear si besoin
    }

    removeSeconds() {
        // Il faut déclarer le textContent de minutes et secondes en Number car sinon au changement cela donne NaN
        this.timerSeconds = Number(this.seconds.textContent);
        this.timerMinutes = Number(this.minutes.textContent);

        // Décrémenter 1 seconde à chaque setInterval de la méthode
        this.seconds.textContent = this.timerSeconds - 1;

        // Stockage secondes et minutes en sessionStorage
        sessionStorage.setItem("Seconds", this.seconds.textContent);
        sessionStorage.setItem("Minutes", this.minutes.textContent);

        if (this.seconds.textContent < 0) {
            this.seconds.textContent = 59;
            this.minutes.textContent = this.timerMinutes - 1;
        } else if (this.seconds.textContent < 10) {
            this.seconds.textContent = 0 + this.seconds.textContent;
        }

        if (this.minutes.textContent < 10) {
            this.minutes.style.marginLeft = "22%";
        }

        if (this.minutes.textContent <= 0 + this.minutes.textContent && this.seconds.textContent <= 0 + this.seconds.textContent) {
            this.timer.textContent = "Votre réservation a expiré.";
            this.timer.style.fontSize = "1.8em";
            this.timer.style.width = "70%";
            this.timer.style.marginLeft = "20%";
            this.timer.style.marginTop = "-2%";
            clearInterval(this.interval);
            sessionStorage.clear(); // Quand le timer arrive à 0, supprime tout le sessionStorage pour ne rien garder de la réservation expirée
            if (window.innerWidth <= 500) {
                this.timer.style.fontSize = "0.8em";
                this.timer.style.marginLeft = "12%";
                this.timer.style.textAlign = "center";
            }
        }
    }

    storageTimer() {
        if (this.localSeconds && this.localMinutes) {
            this.seconds.textContent = this.localSeconds;
            this.minutes.textContent = this.localMinutes;
            this.startTimer();
            this.showTimer();
            this.reservSection.style.display = "none";
            this.formResaSection.style.display = "block";
            this.signSection.style.display = "block";
            this.canvas.style.display = "none";
            this.cancelBtn.style.display = "block";
            this.canvasTitle.textContent = "Votre vélo a bien été réservé !";
            this.canvasTitle.style.marginTop = "12%";
            this.formValidBtn.style.display = "none";
        };
    }

    cancelReservation() {
        sessionStorage.clear();
        clearInterval(this.interval);
        setTimeout(() => {self.location.reload()}); // reload de la page au clique sur le bouton d'annulation
    }
}

var interval = null; // Sert à éviter une erreur dans la console au clearInterval du timer lorsqu'il arrive à 00 minutes 00 secondes

const timer = new Timer();