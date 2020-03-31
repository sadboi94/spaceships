const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['black', 'black'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

const logo = new PIXI.Sprite.from('images/game.png');
const game1 = new PIXI.Text('Game1', style);
const game2 = new PIXI.Text('Game2', style);
const game3 = new PIXI.Text('Game3', style);
const exit = new PIXI.Text('Exit', style);

function startMainScreen(app) {
    app.loader.add('star', 'images/menubackground.jpg').load((loader, resources) => {
        const star = new PIXI.Sprite(resources.star.texture);
        star.x = app.renderer.width / 2;
        star.y = app.renderer.height / 2;
        star.anchor.x = 0.5;
        star.anchor.y = 0.5;
        app.stage.addChild(star);
        app.ticker.add(() => {
            star.rotation += 0.01;
        });
        setGameMode(logo, 500);
        setGameMode(game1, 400);
        setGameMode(game2, 300);
        setGameMode(game3, 200);
        setGameMode(exit, 100);
        bindOnClicks();
    });
}

function removeMainScreen(game) {
    game.interactive = false;
    game.buttonMode = false;
    app.stage.removeChild(game);
}

function setGameMode(game, position) {
    game.anchor.set(0.5);
    game.x = app.screen.width / 2;
    game.y = app.screen.height - position;
    game.interactive = true;
    game.buttonMode = true;
    app.stage.addChild(game);
}

function onClickGame() {
    removeMainScreen(logo);
    removeMainScreen(game1);
    removeMainScreen(game2);
    removeMainScreen(game3);
    removeMainScreen(exit);
    startGameScreen(app);
    setTimeout(() => {
        addPlayerToScreen(app);
    }, 1000);
}

function onClickExit() {
    window.location = "/images";
}

function bindOnClicks() {
    game1.on('pointerdown', onClickGame);
    game2.on('pointerdown', onClickGame);
    game3.on('pointerdown', onClickGame);
    exit.on('pointerdown', onClickExit);
}