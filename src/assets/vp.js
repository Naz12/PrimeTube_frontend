// var manifestUri =

// var manifestUri = 'https://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd'
// var manifestUri = '/assets/brian/brian.mpd'
var manifestUri = 'http://192.168.43.166:3000/videos/9d91895c5c6fe5162d26159f/index.mpd'
// var manifestUri = 'http://localhost:8080/live/dc0e9ddbab1e46b4500e42af6b7424b5c4520290ab1998e3ca6de339feb1f463725171fec782c97ca6b9e923bb3df68b/index.mpd'


async function init() {
    // When using the UI, the player is made automatically by the UI object.
    const video = document.getElementById('video');
    const ui = video['ui'];



    const uiConfig = {
        addSeekBar: true
    };

    // uiConfig['controlPanelElements'] = ['rewind', 'fast_forward', 'skip'];
    ui.configure(uiConfig)
    const controls = ui.getControls();

    const player = controls.getPlayer();
    // player.setPlaybackRate(2);
    // Listen for error events.
    player.addEventListener('error', onPlayerErrorEvent);
    controls.addEventListener('error', onUIErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    try {
        await player.load(manifestUri);
        // This runs if the asynchronous load is successful.
        console.log('The video has now been loaded!');
    } catch (error) {
        onError(error);
    }
}

function onPlayerErrorEvent(errorEvent) {
    // Extract the shaka.util.Error object from the event.
    onPlayerError(event.detail);
}

function onPlayerError(error) {
    // Handle player error
}

function onUIErrorEvent(errorEvent) {
    // Handle UI error
}

function initFailed() {
    // Handle the failure to load
}

// Listen to the custom shaka-ui-loaded event, to wait until the UI is loaded.
document.addEventListener('shaka-ui-loaded', init);
// Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails
// to load (e.g. due to lack of browser support).
document.addEventListener('shaka-ui-load-failed', initFailed);
