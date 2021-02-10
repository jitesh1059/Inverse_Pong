const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 640,
    scene: {
        preload,
        create,
        update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: true
        }
    }
};

const game = new Phaser.Game(config);
let ball;
let player1;
let player2;
let isGameStarted = false;
let cursors;
let paddleSpeed = 350;
let keys = {};
let score;
let scoreText;
let loseText;
let scoreFinal;

function preload(){
    this.load.image('ball', '../assets/images/ball.png');
    this.load.image('paddle', '../assets/images/paddle.png');
}

function create(){
    ball = this.physics.add.sprite(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.width / 2,
        'ball'
    );
    ball.setCollideWorldBounds(true);
    ball.setBounce(1, 1);
    
    player1 = this.physics.add.sprite(
        this.physics.world.bounds.width - (ball.body.width / 2 + 1),
        this.physics.world.bounds.width / 2,
        'paddle'
        );
    player1.setCollideWorldBounds(true);
    player1.setImmovable(true);
    
    player2 = this.physics.add.sprite(
        ball.body.width / 2 + 1,
        this.physics.world.bounds.width / 2,
        'paddle'
        );
    player2.setCollideWorldBounds(true);
    player2.setImmovable(true);
    
    cursors = this.input.keyboard.createCursorKeys();
    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    
    score = 0;

    scoreText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height - 600,
        scoreFinal
    );
    scoreText.setVisible(true);
    scoreText.setOrigin(.5);

    loseText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        "You Lose. Refresh browser to play again."
    );
    loseText.setVisible(false);
    loseText.setOrigin(.5);

    this.physics.add.collider(ball, player1, function(ball, player1){
        score = score + 1;
        console.log(score);
    });
    this.physics.add.collider(ball, player2, function(ball, player2){
        score = score + 1;
        console.log(score);
    });

}

function update(){
    if (!isGameStarted) {
        const initalVelocityX = (Math.random() * 100) + 150;
        const initalVelocityY = (Math.random() * 100) + 150;
        ball.setVelocityX(initalVelocityX);
        ball.setVelocityY(initalVelocityY);
        isGameStarted = true;
    }

    if(ball.body.x > player1.body.x){
        loseText.setVisible(true);
        ball.setVelocityX(0);
        ball.setVelocityY(0);
    }
    if(ball.body.x < player2.body.x){
        loseText.setVisible(true);
        ball.setVelocityX(0);
        ball.setVelocityY(0);
    }

    player1.body.setVelocityY(0);
    player2.body.setVelocityY(0);
    
    if (cursors.up.isDown){
        player1.body.setVelocityY(-paddleSpeed);
    }
    if (cursors.down.isDown){
        player1.body.setVelocityY(paddleSpeed);
    }
    if (keys.w.isDown){
        player2.body.setVelocityY(-paddleSpeed);
    }
    if (keys.s.isDown){
        player2.body.setVelocityY(paddleSpeed);
    }
    if(ball.body.velocity.y > paddleSpeed){
        ball.body.setVelocityY(paddleSpeed);
    }
    if(ball.body.velocity.y < -paddleSpeed){
        ball.body.setVelocityY(-paddleSpeed);    
    }
}