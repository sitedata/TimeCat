import { setAttribute } from '@TimeCat/virtual-dom';
import { delay } from '@TimeCat/utils';
export class PointerComponent {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.initPointer();
    }
    initPointer() {
        this.pointer = document.getElementById('cat-pointer');
        this.move(0, 0);
    }
    move(x, y) {
        this.x = x;
        this.y = y;
        this.pointer.style.left = this.x + 'px';
        this.pointer.style.top = this.y + 'px';
    }
    async click(x, y) {
        this.move(x, y);
        await delay(100);
        setAttribute(this.pointer, 'active', '');
        setTimeout(() => {
            setAttribute(this.pointer, 'active', null);
        }, 400);
    }
}
