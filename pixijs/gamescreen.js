let backGroundX = 0;
let backGroundSpeed = 1;

function startGameScreen(app) {
    app.loader.add('gameBackground', 'images/space.png').load((loader, resources) => {
        const gameBackground = new PIXI.TilingSprite(resources.gameBackground.texture, 800, 600);
        app.stage.addChild(gameBackground);
    });
    //app.loader.onComplete.add(initLevel);
    //app.loader.load;
}

/*function initLevel() {
    gameBackground = createTiling('images/space.png');
    app.ticker.add(backgroundLoop);
}

function backgroundLoop() {
    updateBackGround(gameBackground);
}

function updateBackGround(gameBackground) {
    backGroundX = backGroundX + backGroundSpeed;
    gameBackground.tilePosition.x = backGroundX;
}

function createTiling(picture) {
    let tiling = new PIXI.TilingSprite(picture, 800, 600);
    tiling.position.set(0, 0);
    app.stage.addChild(tiling);
    return tiling;
}*/