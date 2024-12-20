class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.draw = false;
        this.validButton = document.getElementById("valid_button");
        this.cancelBtn = document.getElementById("cancel_button");

        this.canvas.addEventListener("mousedown", this.startPosition.bind(this));
        this.canvas.addEventListener("mousedown", this.line.bind(this));
        this.canvas.addEventListener("mouseup", this.endPosition.bind(this));
        this.canvas.addEventListener("mousemove", this.line.bind(this));
        this.canvas.addEventListener("mouseup", this.showValidButton.bind(this));
        this.cancelBtn.addEventListener("click", this.clearCanvas.bind(this));
        
        // methode pour mobile
        this.canvas.addEventListener("touchstart", this.startPosition.bind(this));
        this.canvas.addEventListener("touchstart", this.lineMobile.bind(this));
        this.canvas.addEventListener("touchend", this.endPosition.bind(this));
        this.canvas.addEventListener("touchmove", this.lineMobile.bind(this));
        this.canvas.addEventListener("touchend", this.showValidButton.bind(this));
    }

    startPosition() {
        this.draw = true;
    };

    endPosition() {
        this.draw = false;
        this.ctx.beginPath();
    };

    line(e) {
        if (this.draw === false) return; // Si this.draw = false alors il ne se passer rien
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.lineTo(e.offsetX, e.offsetY); // offset = position souris par rapport à la position de l'élément sur la page
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(e.offsetX, e.offsetY);
    };

    showValidButton() {
        this.validButton.style.display = "block";
    };

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // efface tout l'élément canvas
    }

    // methode pour mobile

    lineMobile(e) {
        if (this.draw === false) return;
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.rect = this.canvas.getBoundingClientRect(); // renvoie la taille d'un élément et sa position par rapport à la zone d'affichage (Média Queries)
        this.posX = (e.touches[0].clientX - this.rect.left) / (this.rect.right - this.rect.left) * this.canvas.width; // (position doigt horizontale - marge entre bord gauche et canvas) / (marge haute - marge gauche) * largeur du canvas
        this.posY = (e.touches[0].clientY - this.rect.top) / (this.rect.bottom - this.rect.top) * this.canvas.height; // même chose pour la hauteur et le bas
        this.ctx.lineTo(this.posX, this.posY);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(this.posX, this.posY);
        e.preventDefault();
    };
};

const canvas = new Canvas();