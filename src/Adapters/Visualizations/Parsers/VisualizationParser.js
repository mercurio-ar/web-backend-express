export class VisualizationParser {
    
    constructor(thing) {
        this.thing = thing;
    }

    canParse() {
        const thing = this.thing;
        return !!(thing && thing.visualization);
    }

    visualizationsIds() {
        return [this.thing.visualization.id];
    }
}
