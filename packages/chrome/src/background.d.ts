/// <reference types="@types/node" />
declare let time: number;
declare let timer: NodeJS.Timeout;
declare let running: boolean;
declare function fire(status: boolean): void;
declare function timeHandle(): void;
declare function getIconPath(iconName: string): string;
declare function secondToDate(second: number): string;
declare function sendMessageToContentScript(request: any, callback?: Function): void;
