class Player {
    constructor(game) {
        this.game = game;
        this.x = 20;
        this.y = 0;
        this.spriteWidth = 130;
        this.spriteHeight = 121;    
        this.width;
        this.height;    
        this.speedY;
        this.flapSpeed;
        this.collisionX;
        this.collisionY;
        this.collisionRadius;
        this.collided;
        this.energy = 30;
        this.maxEnergy = this.energy * 2;
        this.minEnergy = 15;
        this.charging;
        this.barSize;
        this.image = document.getElementById('player_bird'); //Player Spritesheet
        this.frameY; //Player Spritesheet
    }

    draw() {
        this.game.ctx.drawImage(this.image, 0, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height); //Player Spritesheet
        if(this.game.debug) { // Debug
            this.game.ctx.beginPath();
            this.game.ctx.arc(this.collisionX + this.collisionRadius * 0.5, this.collisionY + 18, this.collisionRadius, 0, Math.PI * 2);
            this.game.ctx.stroke();       
        } // Debug
    }

    update() {
        this.handleEnergy();

        if(this.speedY >= 0)    { //Player Spritesheet
            this.wingsUp(); //Player Spritesheet
         } //Player Spritesheet
    
        this.y += this.speedY;

        if(!this.isTouchingBottom() && !this.charging)    {
            this.speedY += this.game.gravity; 
        }
        else    {
            this.speedY = 0;
        }

        if(this.isTouchingBottom())    {
            this.y = this.game.height - this.height;
            this.wingsIdle(); //Player Spritesheet
        }

        this.collisionY = this.y + this.height * 0.5;
    }

    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.y = this.game.height * 0.5 - this.height * 0.5;
        this.speedY = -8 * this.game.ratio;
        this.flapSpeed = 5  * this.game.ratio;
        this.collisionX = this.x + this.width * 0.5;
        this.collisionRadius = 30 * this.game.ratio;
        this.collided = false;
        this.barSize = Math.floor(5 * this.game.ratio);
        this.frameY = 0; //Player Spritesheet
        this.charging = false; //Player Spritesheet
        this.energy = 30; //Player Spritesheet
    }

    isTouchingBottom()  {
        return this.y >= this.game.height - this.height;
    }

    isTouchingTop() {
        return this.y <= 0;
    }

    flap()  {
        this.stopCharge();

        if(!this.isTouchingTop())    {
            this.speedY = -this.flapSpeed;
            this.wingsDown(); //Player Spritesheet
        }
    }

    handleEnergy()  {
        if(this.game.eventUpdate)   {
            if(this.energy < this.maxEnergy)    {
                this.energy += 1;
            }

            if(this.charging)    {
                this.energy -= 6;

                if(this.energy <= 0)    {
                    this.energy = 0;
                    this.stopCharge();
                }
            }
        }
    }

    startCharge()   {
        this.game.sound.play(this.game.sound.charge); // Sound
        this.charging = true;
        this.game.speed = this.game.maxSpeed;
        this.wingsCharge(); //Player Spritesheet
    }

    stopCharge()    {
        this.charging = false;
        this.game.speed = this.game.minSpeed;
        this.wingsIdle(); //Player Spritesheet
    }

    wingsIdle() { //Player Spritesheet
        this.frameY = 0; //Player Spritesheet
    } //Player Spritesheet

    wingsDown() { //Player Spritesheet
        if(!this.charging)    {
           this.frameY = 1; //Player Spritesheet
        }
    } //Player Spritesheet

    wingsUp() { //Player Spritesheet
        if(!this.charging)    {
            this.frameY = 2; //Player Spritesheet
         }
    } //Player Spritesheet

    wingsCharge() { //Player Spritesheet
        this.frameY = 3; //Player Spritesheet
    } //Player Spritesheet
}