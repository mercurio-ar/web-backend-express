import express from 'express';
import { Mercurio } from './src';

const app = new Mercurio(express);

app.listen(3000, function () {
});

