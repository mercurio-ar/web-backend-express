export class VisualizationSerializer {

    static canSerialize(thing) {
        return !!(thing && thing._id && thing.name && thing.series);
    }

    static serialize({
        _id,
        name,
        series,
    }) {
        return {
            id: _id,
            name,
            series,
        };
    }
}
