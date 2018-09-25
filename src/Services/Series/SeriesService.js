import {
    URL
} from 'url';
import querystring from 'querystring';
import { uniq } from '../../Utils/Functions/uniq';

export class SeriesService {

    constructor({
        baseUrl,
        http,
        seriesAdapter,
    }) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.seriesAdapter = seriesAdapter;
    }

    search({
        searchTerm
    }) {
        const url = `${this.searchEndpoint}?${querystring.stringify({q: searchTerm})}`;
        return this.http
            .get(url)
            .then((axiosResponse) => axiosResponse.data);
    }

    getSeriesById(seriesIds) {
        const ids = uniq(seriesIds).toString();
        const url = `${this.seriesEndpoint}?${querystring.stringify({ids})}`;
        return this.http
            .get(url)
            .then((axiosResponse) => axiosResponse.data)
            .then((data) => this.seriesAdapter.parse(data));
    }

    get searchEndpoint() {
        return new URL('/series/api/search/', this.baseUrl).href;
    }

    get seriesEndpoint() {
        return new URL('/series/api/series/', this.baseUrl).href;
    }
}
