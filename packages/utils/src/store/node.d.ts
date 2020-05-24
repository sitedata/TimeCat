declare class NodeStore {
    private static nodeId;
    private nodeMap;
    private idMap;
    constructor();
    private init;
    reset(): void;
    createNodeId: () => number;
    getNode(id: number): Node | null;
    addNode(node: Node, id?: number): number;
    removeNode(id: number): void;
    getNodeId(node: Node): number | undefined;
    updateNode(id: number, node: Node): void;
}
export declare const nodeStore: NodeStore;
export {};
