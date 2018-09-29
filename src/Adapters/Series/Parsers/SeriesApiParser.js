export class SeriesApiParser {

    static canParse(seriesApiResponse) {
        return !!(seriesApiResponse &&
            seriesApiResponse.data &&
            seriesApiResponse.meta
        );
    }

    static parse(seriesApiResponse) {
        return seriesApiResponse.meta.map((meta, index) => ({
            id: meta.field && meta.field.id,
            displayName: meta.field && meta.field.description,
            points: mapReducePoints(seriesApiResponse, index)
        })).slice(1);
    }
}

function mapReducePoints(seriesApiResponse, index) {
    return seriesApiResponse.data.map((point) => ({
        x: point[0],
        y: point[index]
    })).reduce(((acc, curr) => (curr.y ? acc.concat(curr) : acc)), []);
}
