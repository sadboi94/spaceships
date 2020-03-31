/*global PIXI*/

//http-server -c-1 -p 8000

const app = new PIXI.Application({
    width: 800,
    height: 600,
    antialias: true, 
    transparent: false, 
    resolution: 1
});

document.body.appendChild(app.view);
startSplashScreen(app);

