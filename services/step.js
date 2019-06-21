const url = 'http://maxbass.ru/quest/api/?';

let n = 0;

export const step_set_n = value_n => n = value_n;

const request = async (method, n, pos) => {
    const query_string = `method=${method}&n=${n}&pos=${pos}`;

    const response = await fetch(url + query_string);

    return +await response.text();
};

export const up = async pos => request('up', n, pos);
export const left = async pos => request('left', n, pos);
export const down = async pos => request('down', n, pos);
export const right = async pos => request('right', n, pos);
