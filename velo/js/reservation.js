class Reservation {
    constructor() {
        this.reservBtn = document.getElementById("reserv_btn");
        this.reservSection = document.getElementById("reserv_section");
        this.formResaSection = document.getElementById("formulaire_section");
        this.signSection = document.getElementById("signature_section");
        this.name = document.getElementById("input_name"); 
        this.firstName = document.getElementById("input_prenom");
        this.validBtn = document.getElementById("valid_button");
        this.recapName = document.getElementById("recap_name");
        this.recapAddress = document.getElementById("recap_address");
        this.recapStation = document.getElementById("recap_station");
        this.canvas = document.getElementById("canvas");
        this.canvasTitle = document.getElementById("canvas_title");
        this.footer = document.getElementById("footer");
        this.cancelBtn = document.getElementById("cancel_button");
        this.formValidBtn = document.getElementById("submit_button")
        this.form = document.getElementById("form")
        this.form.addEventListener("submit", (e) => {e.preventDefault(); this.formBtn()});

        this.localName = localStorage.getItem("Name");
        this.localFirstName = localStorage.getItem("First Name");
        window.addEventListener("load", this.nameInForm.bind(this));

        this.sessionNameStation = sessionStorage.getItem("Name Station");
        this.sessionAdressStation = sessionStorage.getItem("Address Station");

        this.reservBtn.addEventListener("click", this.reservButton.bind(this));
        this.validBtn.addEventListener("click", this.validButton.bind(this));
        window.addEventListener("load", this.showStorageStation.bind(this));
    }

    reservButton() {
        this.reservSection.style.display = "none";
        this.formResaSection.style.display = "block";
        this.signSection.style.display = "block";
        this.sessionNameStation = sessionStorage.getItem("Name Station");
        this.sessionAdressStation = sessionStorage.getItem("Address Station");
        sessionStorage.setItem("Address Station Recap", this.sessionAdressStation);
        sessionStorage.setItem("Name Station Recap", this.sessionNameStation);
    }

    formBtn() {
        this.canvas.style.display = "block";
        this.formValidBtn.style.display = "none";
        if (this.name.value && this.firstName.value) { // si valeur dans les champs de formulaire alors, les met dans le localStorage
            localStorage.setItem("Name", this.name.value);
            localStorage.setItem("First Name", this.firstName.value);
        }
    }

    validButton() {
            this.sessionNameStation = sessionStorage.getItem("Name Station Recap");
            this.sessionAdressStation = sessionStorage.getItem("Address Station Recap");
            this.footer.style.display = "block";
            this.recapName.textContent = "Par : " + this.name.value + " " + this.firstName.value;
            this.recapAddress.textContent = "À l'adresse : " + this.sessionAdressStation;
            this.recapStation.textContent = "Vélo réservé à la station : " + this.sessionNameStation;
            this.validBtn.style.display = "none";
            this.canvas.style.display = "none";
            this.canvasTitle.textContent = "Votre vélo a bien été réservé !";
            this.canvasTitle.style.marginTop = "12%";
            this.cancelBtn.style.display = "block";
    }

    showStorageStation() {
        this.adressRecap = sessionStorage.getItem("Address Station Recap");
        this.nameRecap = sessionStorage.getItem("Name Station Recap");
        if (this.adressRecap && this.nameRecap) {
            this.recapAddress.textContent = "À l'adresse : " + this.adressRecap;
            this.recapStation.textContent = "Vélo réservé à la station : " + this.nameRecap;
            this.footer.style.display = "block";
        }
        this.recapName.textContent = "Par : " + this.name.value + " " + this.firstName.value;
    }

    nameInForm() {
        if (this.localName && this.localFirstName) {
            this.name.value = this.localName;
            this.firstName.value = this.localFirstName;
        };
    }
};

const reservation = new Reservation();