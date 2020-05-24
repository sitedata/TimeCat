export declare class ContainerComponent {
    container: HTMLElement;
    sandBox: HTMLIFrameElement;
    sandBoxDoc: Document;
    resize: (w?: number, h?: number) => void;
    constructor();
    getSnapshot(): any;
    init(): void;
    initSandbox(): void;
    setViewState(): void;
    initTemplate(): void;
    createContainer(id: string, html: string): HTMLElement;
    makeItResponsive(target: HTMLElement): {
        resize: (w?: number | undefined, h?: number | undefined) => void;
    };
    createStyle(id: string, s: string): HTMLStyleElement;
}
