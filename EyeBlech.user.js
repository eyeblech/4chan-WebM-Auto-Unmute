// ==UserScript==
// @name         EyeBlech - 4chan WebM Auto-Unmute
// @namespace    https://github.com/eyeblech/EyeBlech
// @version      1.0
// @description  Automatically unmutes all WebM videos on 4chan.org
// @author       EyeBlech
// @match        *://boards.4chan.org/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function unmute(video) {
        if (!video.classList.contains('unmuted')) {
            video.muted = false;
            video.volume = 1.0;
            video.classList.add('unmuted');
        }
    }

    document.querySelectorAll('video').forEach(unmute);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeName === 'VIDEO') {
                    unmute(node);
                }
                if (node.querySelectorAll) {
                    node.querySelectorAll('video').forEach(unmute);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
