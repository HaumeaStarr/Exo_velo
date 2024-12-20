class Slider {
    constructor() {
        this.firstSlide = document.getElementById("slide-1");
        this.secondSlide = document.getElementById("slide-2");
        this.thirdSlide = document.getElementById("slide-3");
        this.fourthSlide = document.getElementById("slide-4"); 
        this.slides = [this.firstSlide, this.secondSlide, this.thirdSlide, this.fourthSlide];
        this.repere = 0;
        
        window.addEventListener("load", this.launchAutoSlide());
        window.addEventListener("keydown", this.keysKeyboard.bind(this));

        this.nextBtn = document.getElementById("next_slide");
        this.nextBtn.addEventListener("click", this.nextSlide.bind(this));

        this.prevBtn = document.getElementById("previous_slide");
        this.prevBtn.addEventListener("click", this.previousSlide.bind(this));

        this.pauseBtn = document.getElementById("pause");
        this.pauseBtn.addEventListener("click", this.pauseSlide.bind(this));

        this.playBtn = document.getElementById("play");
        this.playBtn.addEventListener("click", this.playSlide.bind(this));
    }
    
    cover() {
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.display = "none";
        }
    };

    launchAutoSlide() {
        this.interval = setInterval(this.nextSlide.bind(this), 5000);
    }

    nextSlide() {
        if (this.repere >= this.slides.length - 1) { // si repère supérieur à 3 (taille du tableau > 4-1)
            this.cover();
            this.repere = 0; // on reprend à la 1ère image
            this.slides[this.repere].style.display = "block"; // on affiche la première image
        } else {
            this.cover();
            this.repere++;
            this.slides[this.repere].style.display = "block";
        }
    };

    previousSlide(){
        if (this.repere <= 0) { // si <= 0
            this.cover();
            this.repere = this.slides.length - 1; // on revient à la dernière img du tableau : 3
            this.slides[this.repere].style.display = "block"; // on l'affiche
        } else {
            this.cover();
            this.repere--;
            this.slides[this.repere].style.display = "block";
        }
    }
    pauseSlide() {
        this.pauseBtn.style.display = "none";
        this.playBtn.style.display = "block";
        clearInterval(this.interval)
    };

    playSlide() {
        this.pauseBtn.style.display = "block";
        this.playBtn.style.display = "none";
        this.launchAutoSlide();
    };

    keysKeyboard(e) {
        if (e.keyCode === 39) {
            this.nextSlide();
        } else if (e.keyCode === 37) {
            this.previousSlide()
        };
    };
};

const slider = new Slider();