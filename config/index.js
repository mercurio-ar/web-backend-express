import Axios from 'axios';

const base = {
    series:{
        services:{
            search:{
                http: Axios,
                searchEndpoint: 'http://apis.datos.gob.ar/series/api/search/'
            }
        }
    }
};

const current = {};

export default Object.assign({}, base, current);
