class FMP {
    constructor() {
        this.interval = 1000;
        this.len = 0;
        this.listener = [];
        this.observe();
    }
    observe() {
        setTimeout(() => {
            const entries = performance
                .getEntriesByType('resource')
                .filter((item) => this.isMatchType(item));
            const len = entries.length;
            if (len <= this.len) {
                performance.clearResourceTimings();
                if (this.listener.length) {
                    this.listener.forEach(run => run());
                }
                return;
            }
            this.len = len;
            this.observe();
        }, this.interval);
    }
    isMatchType(entry) {
        switch (entry.initiatorType) {
            case 'link':
            case 'img':
            case 'css':
            case 'iframe':
                return true;
            default:
                break;
        }
    }
    ready(fn) {
        this.listener.push(fn);
    }
}
export const fmp = new FMP();
