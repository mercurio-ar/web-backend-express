export class SearchResultParser {

    constructor(thing) {
        this.thing = thing;
    }

    canParse() {
        const thing = this.thing;
        return !!(thing && thing.searchResult && thing.searchResult.id);
    }

    seriesIds() {
        return [
            this.thing.searchResult.id
        ];
    }
}
