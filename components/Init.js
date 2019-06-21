import { quest_set_n } from '../services/quest.js';
import { step_set_n } from '../services/step.js';

const template =
`
<style>
    @keyframes fade {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes shake {
        0% {
            transform: rotate(0deg);
        }
        30% {
            transform: rotate(10deg);
        }
        70% {
            transform: rotate(-10deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
    * {
        outline: none;
        box-sizing: border-box;
        font-family: sans-serif;
        user-select: none;
    }
    .init {
        width: 100%;
        height: 100%;
        background-color: indigo;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .form {
        max-width: 500px;
        max-height: 250px;
        min-width: 100px;
        min-height: 100px;
        width: 100%;
        height: 100%;
        padding: 10px;
        display: flex;
        flex-direction: column;
    }
    .form > * {
        flex-grow: 1;
    }
    input {
        border: none;
        background-color: #fffb;
        text-align: center;
        font-size: 3rem;
    }
    .button {
        font-size: 3rem;
        color: #fffb;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
    }
    .button:hover {
        animation: shake .2s;
        color: #fff;
    }
    .fade {
        animation: fade 1s;
    }
</style>
<div class="init">
    <div class="form">
        <input type="text" placeholder="2 < n < 9">
        <div class="button">Ввёл? Жми!</div>
    </div>
</div>
`;

const make_find = root => str => root.querySelector(str);

export default class Init extends HTMLElement
{
    constructor()
    {
        super();

        this.shadow_root = this.attachShadow({ mode: 'open' });
        this.find = make_find(this.shadow_root);
    }

    connectedCallback()
    {
        this.shadow_root.innerHTML = template;

        const init = this.find('.init');
        const input = this.find('input');
        const button = this.find('.button');

        const clicked = () => {
            const n = +input.value | 0;

            if (n < 3 || n > 8) {
                input.value = null;
                return;
            }

            quest_set_n(n);
            step_set_n(n);

            const on_anim_end = e => {
                const path = e.path || (e.composedPath && e.composedPath());
                const target = path[0];

                if (target != init) return;

                this.parentNode.removeChild(this);
            };

            button.removeEventListener('click', clicked);
            init.classList.add('fade');
            init.addEventListener('animationend', on_anim_end);
        };

        button.addEventListener('click', clicked);
    }
}
