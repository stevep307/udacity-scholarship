const cellWidth = 101;
const cellHeight = 80;
const fieldWidth = 505;

// Enemies our player must avoid
var Enemy = function(rowNum) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = cellHeight * (rowNum - 1);
    this.reinit();
};

// Start position for enemy
Enemy.prototype.reinit = function() {
    this.x = -1 * cellWidth;
    this.speed = (0.4 + Math.random()) * 10;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > fieldWidth + 10) {
        this.reinit();
    } else {
        this.x += this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reinit();
};

// Start position for player
Player.prototype.reinit = function() {
    this.x = cellWidth * 2;
    this.y = cellHeight * 5;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set player position on import
Player.prototype.handleInput = function(movement) {
    if (!isGameActive) return;

    switch(movement) {
        case 'left':
            if (this.x - cellWidth >= 0) {
              this.x -= cellWidth;
            }
            break;
        case 'up':
            if (this.y - cellHeight >= 0) {
              this.y -= cellHeight;
            }
            break;
        case 'right':
            if (this.x + cellWidth < fieldWidth) {
              this.x += cellWidth;
            }
            break;
        case 'down':
            if (this.y + cellHeight < cellHeight * 6) {
              this.y += cellHeight;
            }
            break;
    }

    if (this.y === 0) {
        isGameActive = false;
        document.querySelector('.winning-message').classList.add('show');
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let isGameActive = true;
var player = new Player()
var allEnemies = [
    new Enemy(3),
    new Enemy(2),
    new Enemy(4)
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
