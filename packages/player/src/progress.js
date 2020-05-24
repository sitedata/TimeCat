import { throttle, secondToDate } from '@TimeCat/utils';
export class ProgressComponent {
    constructor(c) {
        this.totalDistance = 0;
        this.throttleTimer = throttle((percentage) => {
            this.setThumb(percentage);
        }, 250, { trailing: true });
        this.progress = c.container.querySelector('.cat-progress');
        this.timer = c.container.querySelector('.cat-timer');
        this.thumb = this.progress.querySelector('.cat-thumb');
        this.slider = this.progress.querySelector('.cat-slider-bar');
    }
    updateProgress(percentage) {
        this.throttleTimer(percentage);
    }
    updateTimer(second) {
        const t = secondToDate(second);
        if (t) {
            this.timer.innerHTML = t;
        }
    }
    setThumb(percentage) {
        this.thumb.style.left = percentage + '%';
    }
    resetThumb() {
        const thumb = this.thumb.cloneNode(true);
        this.thumb.parentNode.replaceChild(thumb, this.thumb);
        thumb.style.left = '0%';
        this.thumb = thumb;
    }
}
