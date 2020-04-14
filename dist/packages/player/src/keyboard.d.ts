import { ContainerComponent } from './container';
export declare class KeyboardComponent {
    c: ContainerComponent;
    controller: HTMLElement;
    playOrPauseBtn: HTMLButtonElement;
    exportBtn: HTMLElement;
    constructor(container: ContainerComponent);
    init(): void;
    emitPlaySign(speed: number): void;
    listenDefocus(): void;
    paly(speed: number): void;
    setSpeed(speed: number): void;
    export(): void;
}
