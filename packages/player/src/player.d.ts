import { PointerComponent } from './pointer';
import { ProgressState } from "../../utils/src";
import { ProgressComponent } from './progress';
import { ContainerComponent } from './container';
import { RecordData } from "../../record/src";
export declare class PlayerComponent {
    c: ContainerComponent;
    pointer: PointerComponent;
    progress: ProgressComponent;
    progressState: ProgressState;
    data: RecordData[];
    speed: number;
    index: number;
    frameIndex: number;
    lastPercentage: number;
    isFirstTimePlay: boolean;
    frames: number[];
    requestID: number;
    startTime: number;
    curViewEndTime: number;
    curViewDiffTime: number;
    constructor(c: ContainerComponent, pointer: PointerComponent, progress: ProgressComponent);
    streamHandle(this: PlayerComponent, e: CustomEvent): void;
    initViewState(): void;
    switchNextView(): void;
    play(): void;
    renderEachFrame(time: number): void;
    pause(): void;
    stop(): void;
    execFrame(this: PlayerComponent, record: RecordData): void;
    getPercentInterval(): number;
    getAccuratelyFrame(interval?: number): number[];
}
