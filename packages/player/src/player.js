import { updateDom } from './dom';
import { reduxStore, PlayerTypes, getTime, isSnapshot, delay } from '@TimeCat/utils';
export class PlayerComponent {
    constructor(c, pointer, progress) {
        this.speed = 0;
        this.index = 0;
        this.frameIndex = 0;
        this.lastPercentage = 0;
        this.isFirstTimePlay = true;
        this.curViewDiffTime = 0;
        this.initViewState();
        this.c = c;
        this.pointer = pointer;
        this.progress = progress;
        if (!this.data.length) {
            window.addEventListener('record-data', this.streamHandle.bind(this));
        }
        else {
            reduxStore.subscribe('player', state => {
                this.progressState = reduxStore.getState()['progress'];
                const speed = state.speed;
                this.speed = speed;
                if (speed > 0) {
                    this.play();
                }
                else {
                    this.pause();
                }
                this.frames = this.getAccuratelyFrame();
            });
        }
    }
    streamHandle(e) {
        const frame = e.detail;
        if (isSnapshot(frame)) {
            window.__ReplayData__.snapshot = frame;
            this.c.setViewState();
            return;
        }
        this.execFrame(frame);
    }
    initViewState() {
        const { __ReplayDataList__: list } = window;
        const firstData = list[0];
        this.data = firstData.records;
        if (!this.data.length) {
            return;
        }
        this.curViewEndTime = +this.data.slice(-1)[0].time;
        this.curViewDiffTime = 0;
        window.__ReplayData__ = { index: 0, ...firstData };
    }
    switchNextView() {
        const { __ReplayData__: rData, __ReplayDataList__: list } = window;
        if (!this.data) {
            return;
        }
        const nextIndex = rData.index + 1;
        if (nextIndex > list.length - 1) {
            return;
        }
        const nextData = list[nextIndex];
        const curEndTime = +this.data.slice(-1)[0].time;
        const nextStartTime = +nextData.records[0].time;
        this.curViewDiffTime += nextStartTime - curEndTime;
        window.__ReplayData__ = { index: nextIndex, ...nextData };
        this.data = nextData.records;
        this.curViewEndTime = +this.data.slice(-1)[0].time;
        this.index = 0;
        this.c.setViewState();
    }
    play() {
        if (this.index === 0) {
            this.progress.resetThumb();
            if (!this.isFirstTimePlay) {
                this.initViewState();
                this.c.setViewState();
            }
            this.isFirstTimePlay = false;
        }
        cancelAnimationFrame(this.requestID);
        this.requestID = requestAnimationFrame(loop.bind(this));
        const initTime = getTime();
        this.startTime = 0;
        async function loop() {
            const timeStamp = getTime() - initTime;
            if (this.frameIndex > 0 && !this.frames[this.frameIndex]) {
                this.stop();
                return;
            }
            if (!this.startTime) {
                this.startTime = Number(this.frames[this.frameIndex]);
            }
            const currTime = this.startTime + timeStamp * this.speed;
            const nextTime = Number(this.frames[this.frameIndex]);
            if (nextTime > this.curViewEndTime - this.curViewDiffTime) {
                await delay(200);
                this.switchNextView();
            }
            if (currTime >= nextTime) {
                this.renderEachFrame(currTime);
            }
            this.requestID = requestAnimationFrame(loop.bind(this));
        }
    }
    renderEachFrame(time) {
        const { startTime } = this.progressState;
        this.progress.updateTimer((time - startTime) / 1000);
        const progress = (this.frameIndex / (this.frames.length - 1)) * 100;
        this.progress.updateProgress(progress);
        let data;
        while (+(data = this.data[this.index]).time - this.curViewDiffTime <= this.frames[this.frameIndex]) {
            this.execFrame.call(this, data);
            this.index++;
            if (this.index === this.data.length) {
                break;
            }
        }
        this.frameIndex++;
    }
    pause() {
        cancelAnimationFrame(this.requestID);
        reduxStore.dispatch({
            type: PlayerTypes.SPEED,
            data: {
                speed: 0
            }
        });
    }
    stop() {
        this.speed = 0;
        this.index = 0;
        this.frameIndex = 0;
        this.lastPercentage = 0;
        this.pause();
    }
    execFrame(record) {
        updateDom.call(this, record);
    }
    getPercentInterval() {
        const k = 0.08;
        const b = 0.2;
        return this.speed * k + b;
    }
    getAccuratelyFrame(interval = 250) {
        this.progressState = reduxStore.getState()['progress'];
        const { startTime, endTime } = this.progressState;
        const s = +startTime;
        const e = +endTime;
        const result = [];
        for (let i = s; i < e; i += interval) {
            result.push(i);
        }
        result.push(e);
        return result;
    }
}
