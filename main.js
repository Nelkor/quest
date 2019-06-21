import { quest_set_desk } from './services/quest.js';
import { controls_set_desk } from './services/controls.js';
import { key_down, touch_start, touch_end } from './services/controls.js';

import Init from './components/Init.js';
import Desc from './components/Desk.js';

customElements.define('quest-init', Init);
customElements.define('quest-desk', Desc);

const init = () => {
    const desk = document.querySelector('quest-desk');

    const resize = () => {
        let vh = window.innerHeight * 0.01;

        document.documentElement.style.setProperty('--vh', `${vh}px`);
        desk.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('keydown', key_down);
    window.addEventListener('touchstart', touch_start);
    window.addEventListener('touchend', touch_end);

    setInterval(resize, 5e3);
    resize();

    quest_set_desk(desk);
    controls_set_desk(desk);
};

document.addEventListener('DOMContentLoaded', init);
