import { isDev } from '../tools/common';
let NodeStore = (() => {
    class NodeStore {
        constructor() {
            this.createNodeId = () => NodeStore.nodeId++;
            this.init();
        }
        init() {
            this.nodeMap = new Map();
            this.idMap = new WeakMap();
        }
        reset() {
            this.nodeMap.clear();
        }
        getNode(id) {
            return this.nodeMap.get(id) || null;
        }
        addNode(node, id = this.createNodeId()) {
            this.idMap.set(node, id);
            this.nodeMap.set(id, node);
            return id;
        }
        removeNode(id) {
            this.nodeMap.delete(id);
            this.idMap.delete(this.getNode(id));
        }
        getNodeId(node) {
            return this.idMap.get(node);
        }
        updateNode(id, node) {
            this.idMap.set(node, id);
            this.nodeMap.set(id, node);
        }
    }
    NodeStore.nodeId = 1;
    return NodeStore;
})();
export const nodeStore = new NodeStore();
if (isDev) {
    ;
    window.ns = nodeStore;
}
