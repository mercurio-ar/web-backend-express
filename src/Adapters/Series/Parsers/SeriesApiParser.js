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
            points: seriesApiResponse.data.map((point) => ({
                x: point[0],
                y: point[index]
            }))
        })).slice(1);
    }
}
