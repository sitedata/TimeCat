import { KeyboardComponent } from './keyboard';
import { PlayerComponent } from './player';
import { PointerComponent } from './pointer';
import { ProgressComponent } from './progress';
import { ContainerComponent } from './container';
export declare class Panel {
    keyboard: KeyboardComponent;
    progress: ProgressComponent;
    pointer: PointerComponent;
    player: PlayerComponent;
    container: ContainerComponent;
    constructor(container: ContainerComponent);
    initComponent(): void;
}
