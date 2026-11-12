(function () {
    const audio = document.getElementById('game-music');

    function startMusic() {
        if (audio.paused) audio.play().catch(() => {
            // Browsers can require a gesture before playing audible media.
        });
    }

    document.addEventListener('pointerup', startMusic, true);
    document.addEventListener('keydown', startMusic, true);
    document.addEventListener('WeixinJSBridgeReady', startMusic, { once: true });
    audio.addEventListener('playing', () => {
        document.removeEventListener('pointerup', startMusic, true);
        document.removeEventListener('keydown', startMusic, true);
    }, { once: true });
    startMusic();
})();
