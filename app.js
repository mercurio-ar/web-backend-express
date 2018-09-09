import express from 'express';
import { Mercurio } from './src';
import config from './config';

const app = new Mercurio(express, config);

app.listen(3000, function () {
});

