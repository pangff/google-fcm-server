'use strict';

const errors = require('restify-errors');
const path = require('path');
const service = require('./service');
/**
 /**
 * Routes
 */

const routes = [];


/**
 * 未加密发送消息
 */
routes.push({
    meta: {
        name: 'sendMessage',
        method: 'POST',
        paths: [
            '/fcm/send'
        ],
        version: '1.0.0'
    },
    filter: (req, res, next) => {
        return next();
    },
    action: (req, res, next) => {
        let token = req.params.token;
        return service.sendMessage(token).then((r)=>{
            res.send(r);
            return next();
        }).catch((error)=>{
            let message = JSON.stringify({message: error.message, stack: error.stack})
            return next(new errors.InternalServerError(message));
        })
    },
    finish: (req, res, next) => {
        return next();
    }
});


/**
 * vapId发送
 */
routes.push({
    meta: {
        name: 'sendByVapIdMessage',
        method: 'POST',
        paths: [
            '/fcm/vapid/send'
        ],
        version: '1.0.0'
    },
    filter: (req, res, next) => {
        return next();
    },
    action: (req, res, next) => {
        return service.sendVapIdMessage(req.params).then((r)=>{
            res.send(r);
            return next();
        }).catch((error)=>{
            let message = JSON.stringify({message: error.message, stack: error.stack})
            return next(new errors.InternalServerError(message));
        })
    },
    finish: (req, res, next) => {
        return next();
    }
});

/**
 * Export
 */

module.exports = routes;