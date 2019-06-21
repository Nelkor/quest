import { down, left, right, up } from './step.js';

let desk = null;

export const controls_set_desk = el => desk = el;

// key zone
export const key_down = async e => {
    if ( ! desk || ! desk.ready) return;

    switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
            desk.move(await up(desk.active));
            break;
        case 'KeyA':
        case 'ArrowLeft':
            desk.move(await left(desk.active));
            break;
        case 'KeyS':
        case 'ArrowDown':
            desk.move(await down(desk.active));
            break;
        case 'KeyD':
        case 'ArrowRight':
            desk.move(await right(desk.active));
            break;
    }
};

// touch zone
const last_touch_start = { x: 0, y: 0 };

const get_touch = e => {
    if ( ! desk.ready) return null;

    const touches = e.changedTouches;

    if ( ! touches.length) return null;

    return touches[0];
};

export const touch_start = e => {
    const touch = get_touch(e);

    if ( ! touch) return;

    last_touch_start.x = touch.pageX;
    last_touch_start.y = touch.pageY;
};

export const touch_end = async e => {
    const touch = get_touch(e);

    if ( ! touch) return;

    const h_diff = touch.pageX - last_touch_start.x;
    const v_diff = touch.pageY - last_touch_start.y;

    if (Math.abs(h_diff) > Math.abs(v_diff)) {
        const pos = h_diff > 0
            ? await right(desk.active)
            : await left(desk.active);

        desk.move(pos);
    } else {
        const pos = v_diff > 0
            ? await down(desk.active)
            : await up(desk.active);

        desk.move(pos);
    }
};
