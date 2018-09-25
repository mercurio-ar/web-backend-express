import { compose } from '../Utils';

export const configSelector = (res) => res.locals.config;

export const servicesConfigSelector = compose([
    configSelector,
    (config) => config.services
]);

export const seriesServiceConfigSelector = compose([
    servicesConfigSelector,
    (servicesConfig) => servicesConfig.series
]);

export const dbConfigSelector = compose([
    configSelector,
    (config) => config.db
]);

export const mongoDbConfigSelector = compose ([
    dbConfigSelector,
    (dbConfig) => dbConfig.mongo
]);
