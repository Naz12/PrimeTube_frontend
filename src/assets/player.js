liveManifestUri = "https://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd"
function initApp() {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
        // Everything looks good!
        initPlayer();
    } else {
        // This browser does not have the minimum set of APIs we need.
        console.error('Browser not supported!');
    }
}

function initplayer() {
    const video = document.getElementById('video');
    var player = new shaka.Player(video);

    // Attach player to the window to make it easy to access in the JS console.
    window.pl = pl
    window.player = player;

    // Listen for error events.
    player.addEventListener('error', onErrorEvent);
    // controls.addEventListener('error', onUIErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    // var videojsPlayer = videojs('video');
    // videojsPlayer.src({ src: manifestUri , type: 'application/dash+xml'});

    player.load(liveManifestUri).then(function () {
        //   // This runs if the asynchronous load is successful.
        //   //you can add extra code after the video is loaded
    })
}