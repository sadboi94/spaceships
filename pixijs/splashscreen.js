const blurFilter = new PIXI.filters.BlurFilter();
let count = 0;

function startSplashScreen(app) {
    app.loader.add('splashscreen', 'images/spaceships.jpg').load((loader, resources) => {
        const splashScreen = new PIXI.Sprite(resources.splashscreen.texture);
        app.stage.addChild(splashScreen);
        splashScreen.filters = [blurFilter];
        app.ticker.add(fadeOutSplashScreen);
        removeSplashScreen(app, splashScreen);
    });
}

function removeSplashScreen(app, splashScreen) {
    setTimeout(() => {
        splashScreen.visible = false;
        startMainScreen(app);
    }, 2000);
}

function fadeOutSplashScreen() {
    count += 0.015;
    const blurAmount = Math.cos(count);
    blurFilter.blur = 20 * (blurAmount);
}