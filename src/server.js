import sirv from 'sirv';
import express from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PrismaClient } = require('@prisma/client')
import session from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
var bodyParser = require('body-parser')

const prisma = new PrismaClient()

express() // You can also use Express
    .use(
        session({
            cookie: {
                maxAge: 7 * 24 * 60 * 60 * 1000 // ms
            },
            secret: 'a santa at nasa',
            store: new PrismaSessionStore(
                prisma,
                {
                    checkPeriod: 2 * 60 * 1000,  //ms
                    dbRecordIdIsSessionId: true,
                    dbRecordIdFunction: undefined,
                }
            )
        }),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sapper.middleware({})
    )
    .listen(PORT, err => {
        if (err) console.log('error', err);
    });