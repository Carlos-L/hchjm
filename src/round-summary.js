(function () {
    const dialog = document.getElementById('round-summary');
    const count = document.getElementById('summary-count');
    const weight = document.getElementById('summary-weight');
    const score = document.getElementById('summary-score');
    const best = document.getElementById('summary-best');

    dialog.addEventListener('cancel', event => event.preventDefault());

    window.showRoundSummary = function (round, restart) {
        if (dialog.open) return;

        count.textContent = round.count;
        weight.textContent = round.weight;
        score.textContent = round.score;
        best.textContent = round.best;
        dialog.addEventListener('close', restart, { once: true });
        dialog.showModal();
    };
})();
