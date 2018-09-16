import Axios from 'axios';


export default {
    cors: true,
    series:{
        services:{
            search:{
                http: Axios,
                searchEndpoint: 'http://apis.datos.gob.ar/series/api/search/'
            }
        }
    }
};
