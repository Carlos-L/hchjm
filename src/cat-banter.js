(function () {
    const banner = document.getElementById('cat-banter');
    const comboLines = {
        3: ['三连喵！猫德学院批准你毕业', '三连喵！这波猫猫排队领罐头'],
        5: ['五连喵！哈基米集团宣布上市（并没有）', '五连喵！沙发使用权正式归猫'],
        8: ['八连喵！喵门的钟声都敲响了', '八连喵！这不是合成，是猫猫开年会'],
        12: ['十二连喵！你已被任命为首席铲屎官']
    };
    const easterEggs = [
        '🐾 猫猫监工：这手法，我先记小本本上',
        '🐾 系统提示：猫咪密度已超过沙发承载量',
        '🐾 罐头审批已加急，猫总请稍等',
        '🐾 你负责合成，哈基米负责可爱',
        '🐾 猫德学院提醒：摸鱼也要讲究效率'
    ];
    let lastMergeAt = 0;
    let lastEggAt = -Infinity;
    let lastShownAt = -Infinity;
    let streak = 0;
    let mergeCount = 0;
    let hideTimer;

    function pick(lines) {
        return lines[Math.floor(Math.random() * lines.length)];
    }

    function show(message, kind, now) {
        clearTimeout(hideTimer);
        banner.classList.remove('is-visible');
        void banner.offsetWidth;
        banner.textContent = message;
        banner.dataset.kind = kind;
        banner.classList.add('is-visible');
        lastShownAt = now;
        hideTimer = setTimeout(() => banner.classList.remove('is-visible'), 1900);
    }

    window.catBanter = {
        onMerge() {
            const now = Date.now();
            streak = now - lastMergeAt <= 3000 ? streak + 1 : 1;
            lastMergeAt = now;
            mergeCount++;

            if (comboLines[streak]) {
                show(pick(comboLines[streak]), 'combo', now);
                return;
            }
            if (mergeCount >= 2 && now - lastEggAt >= 20000 &&
                now - lastShownAt >= 2000 && Math.random() < 0.12) {
                lastEggAt = now;
                show(pick(easterEggs), 'easter-egg', now);
            }
        },
        reset() {
            clearTimeout(hideTimer);
            banner.classList.remove('is-visible');
            banner.textContent = '';
            lastMergeAt = 0;
            lastEggAt = -Infinity;
            lastShownAt = -Infinity;
            streak = 0;
            mergeCount = 0;
        }
    };
})();
