/**
 * Created by osak on 16/06/29.
 */

class Credit {
    constructor(symbol, color) {
        this.symbol = symbol;
        this.color = color;
    }
}

export const RED = Object.freeze(new Credit('r', '#ff2020'));
export const ORANGE = Object.freeze(new Credit('o', '#ffd000'));
export const BLUE = Object.freeze(new Credit('b', '#2020ff'));
export const GREEN = Object.freeze(new Credit('g', '#20ff20'));
export const YELLOW = Object.freeze(new Credit('y', '#d0d000'));

export const ALL = Object.freeze([RED, ORANGE, BLUE, GREEN, YELLOW]);