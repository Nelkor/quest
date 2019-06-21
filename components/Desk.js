const resolution = 840;

const template =
`
<style>
    * {
        outline: none;
        user-select: none;
    }
    .wrapper {
        width: 100%;
        height: 100%;
        background-color: darkseagreen;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<div class="wrapper">
    <canvas
        width="${resolution}"
        height="${resolution}"
        style="width: 100px; height: 100px"
    ></canvas>
</div>
`;

const make_find = root => str => root.querySelector(str);

const make_paint = (n, ctx) => {
    const side = resolution / n;
    const half = side / 2;

    return active => {
        ctx.clearRect(0, 0, resolution, resolution);

        let current = 0;

        for (let i = 0; i < n; i++)
            for (let j = 0; j < n; j++) {
                const x = j * side + half;
                const y = i * side + half;

                if (current == active) {
                    ctx.fillStyle = '#f57';

                    ctx.beginPath();
                    ctx.arc(x, y, half, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.fill();

                    ctx.fillStyle = '#fff';
                } else ctx.fillStyle = '#444';

                ctx.fillText(current.toString(), x, y);

                current++;
            }
    };
};

export default class Desk extends HTMLElement
{
    constructor()
    {
        super();

        this.shadow_root = this.attachShadow({ mode: 'open' });
        this.find = make_find(this.shadow_root);
        this.ready = false;
    }

    connectedCallback()
    {
        this.shadow_root.innerHTML = template;

        this.canvas = this.find('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = "3rem Arial";
    }

    start(n)
    {
        this.paint = make_paint(n, this.ctx);
        this.active = Math.random() * (n * n) | 0;

        this.paint(this.active);

        this.ready = true;
    }

    move(to)
    {
        this.active = to;
        this.paint(this.active);
    }

    resize(width, height)
    {
        const side = Math.min(width, height) * .9;

        this.canvas.style.width = `${side}px`;
        this.canvas.style.height = `${side}px`;
    }
}
