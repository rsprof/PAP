class Obstacle  {
    constructor(game, x)   {
        this.game = game;
        this.spriteWidth = 80;
        this.spriteHeight = 110;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.x = x;
        this.y = Math.random() * (this.game.height - this.scaledHeight);
        this.speedY = Math.random() < 0.5 ? -1 * this.game.ratio : 1 * this.game.ratio;
        this.markedForDeletion = false;
        this.collisionX;
        this.collisionY;
        this.collisionRadius = this.scaledWidth * 0.5;
        this.image = document.getElementById('obstacle'); //Obstacle Spritesheet
        this.frameY = 0; //Obstacle Spritesheet
        this.numberFrames = 18; //Obstacle Spritesheet
    }

    update()    { 
        this.frameY = this.frameY % this.numberFrames; //Obstacle Spritesheet

        this.x -= this.game.speed;
        this.y += this.speedY;

        if(!this.game.gameOver)  {
            if(this.y <= 0 || this.y >= this.game.height - this.scaledHeight)   {
                this.speedY *= -1;
            }
        } else  {
            this.speedY += 0.1;
        }

        if(this.isOffScreen())  {
            this.markedForDeletion = true;
            this.game.obstacles = this.game.obstacles.filter(obstacle => !obstacle.markedForDeletion);
            this.game.score++;
            if(this.game.obstacles.length <= 0) this.game.gameOver = true;
        }

        this.collisionX = this.x + this.scaledWidth * 0.5;
        this.collisionY= this.y + this.scaledHeight * 0.5;

        if(this.game.checkCollision(this, this.game.player))    {
            this.game.gameOver = true;
            this.game.player.collided = true;
            this.game.player.stopCharge();
        }
    }

    draw()  {
        this.game.ctx.drawImage(this.image, 0, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.scaledWidth, this.scaledHeight); //Obstacle Spritesheet
       
        ++this.frameY;
        
        if(this.game.debug) { // Debug
            this.game.ctx.beginPath();
            this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            this.game.ctx.stroke();
        } // Debug
    }

    resize()    {
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
    }

    isOffScreen()   {
        return this.x < -this.scaledWidth || this.y > this.game.height;
    }
}