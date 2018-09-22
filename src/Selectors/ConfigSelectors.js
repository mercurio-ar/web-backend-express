import { compose } from '../Utils';

export const configSelector = (res) => res.locals.config;

export const seriesConfigSelector = compose([
    configSelector,
    (config) => config.series
]);

export const seriesServicesConfigSelector = compose([
    seriesConfigSelector,
    (seriesConfig) => seriesConfig.services
]);

export const seriesServiceConfigSelector = compose([
    seriesServicesConfigSelector,
    (seriesServicesConfig) => seriesServicesConfig.search
]);

export const dbConfigSelector = compose([
    configSelector,
    (config) => config.db
]);

export const mongoDbConfigSelector = compose ([
    dbConfigSelector,
    (dbConfig) => dbConfig.mongo
]);
