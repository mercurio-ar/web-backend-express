import querystring from 'querystring';

export class SeriesService {

    constructor({http, searchEndpoint}){
        this.http = http;
        this.searchEndpoint = searchEndpoint;
    }

    search({searchTerm}){
        const url = `${this.searchEndpoint}?${querystring.stringify({q: searchTerm})}`;
        return this.http
            .get(url)
            .then((axiosResponse) => axiosResponse.data);
    }
}
