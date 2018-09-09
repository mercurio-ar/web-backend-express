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

export const seriesSearchServiceConfigSelector = compose([
    seriesServicesConfigSelector,
    (seriesServicesConfig) => seriesServicesConfig.search
]);

