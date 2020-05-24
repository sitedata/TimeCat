import { PlayerTypes, reduxStore, exportReplay } from '@TimeCat/utils';
export class KeyboardComponent {
    constructor(container) {
        this.c = container;
        this.init();
    }
    init() {
        this.controller = this.c.container.querySelector('.cat-keyboard');
        this.playOrPauseBtn = this.c.container.querySelector('.play-or-pause');
        this.exportBtn = this.c.container.querySelector('.cat-export');
        this.exportBtn.addEventListener('click', this.export);
        this.controller.addEventListener('click', (e) => {
            if (e.target && e.target.type === 'button') {
                const speed = Number(e.target.getAttribute('speed'));
                this.emitPlaySign(speed);
            }
        });
        reduxStore.subscribe('player', state => {
            this.paly(state.speed);
            this.setSpeed(state.speed);
        });
        this.listenDefocus();
    }
    emitPlaySign(speed) {
        reduxStore.dispatch({
            type: PlayerTypes.SPEED,
            data: {
                speed
            }
        });
    }
    listenDefocus() {
        let hidden = 'hidden';
        let state;
        let visibilityChange;
        if (typeof document.webkitHidden !== undefined) {
            visibilityChange = 'webkitvisibilitychange';
            state = 'webkitVisibilityState';
        }
        else {
            visibilityChange = 'visibilitychange';
            state = 'visibilityState';
        }
        document.addEventListener(visibilityChange, () => {
            if (document.visibilityState === hidden) {
                this.emitPlaySign(0);
            }
        }, false);
    }
    paly(speed) {
        if (speed !== 0) {
            this.playOrPauseBtn.innerText = 'II';
            this.playOrPauseBtn.setAttribute('style', 'letter-spacing: 1px;font-weight: bold;');
            this.playOrPauseBtn.removeAttribute('speed');
        }
        else {
            this.playOrPauseBtn.innerText = '▶';
            this.playOrPauseBtn.removeAttribute('style');
            this.playOrPauseBtn.setAttribute('speed', '1');
        }
    }
    setSpeed(speed) {
        const speedNodes = this.c.container.querySelectorAll('.speed');
        [...speedNodes].forEach(node => {
            node.removeAttribute('disabled');
        });
        const index = getBtnIndex(speed);
        function getBtnIndex(speed) {
            switch (speed) {
                case 16:
                    return 2;
                case 4:
                    return 1;
                case 1:
                    return 0;
                default:
                    return 0;
            }
        }
        if (index > -1) {
            speedNodes[index].setAttribute('disabled', '');
        }
    }
    export() {
        const mainScript = document.getElementById('time-cat');
        const initScript = document.getElementById('time-cat-init');
        const scriptList = [];
        if (mainScript) {
            const source = (mainScript.src || mainScript.textContent);
            scriptList.push({
                name: 'time-cat',
                src: source
            });
        }
        if (initScript) {
            const source = (initScript.src || initScript.textContent);
            scriptList.push({
                name: 'time-cat-init',
                src: source
            });
        }
        exportReplay({
            scripts: scriptList
        });
    }
}
