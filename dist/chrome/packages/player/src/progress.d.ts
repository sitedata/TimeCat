import { ProgressState } from '@WebReplay/utils';
import { ContainerComponent } from './container';
export declare class ProgressComponent {
    progress: HTMLElement;
    thumb: HTMLElement;
    timer: HTMLElement;
    slider: HTMLElement;
    speed: number;
    rafId: number;
    progressState: ProgressState;
    totalDistance: number;
    throttleTimer: any;
    constructor(c: ContainerComponent);
    updateProgress(percentage: number): void;
    updateTimer(second: number): void;
    setThumb(percentage: number): void;
    resetThumb(): void;
}
