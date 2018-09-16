import Axios from 'axios';


export default {
    port: 3001,
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
