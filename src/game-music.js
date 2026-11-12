(function () {
    const audio = document.getElementById('game-music');

    function startMusic() {
        if (audio.paused) audio.play().catch(() => {
            // Browsers can require a gesture before playing audible media.
        });
    }

    function startInWeChat() {
        startMusic();
        if (window.WeixinJSBridge && typeof window.WeixinJSBridge.invoke === 'function') {
            window.WeixinJSBridge.invoke('getNetworkType', {}, startMusic);
        }
    }

    document.addEventListener('touchstart', startMusic, true);
    document.addEventListener('pointerdown', startMusic, true);
    document.addEventListener('pointerup', startMusic, true);
    document.addEventListener('keydown', startMusic, true);
    document.addEventListener('WeixinJSBridgeReady', startInWeChat);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) startMusic();
    });
    window.addEventListener('pageshow', startMusic);
    startInWeChat();
})();
