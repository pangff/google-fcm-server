'use strict';
const path = require('path');
const Service = module.exports = {};
const request = require('request');
const rp = require('request-promise');
const config = require('../../config');

Service.sendMessage = (token)=> {

    setTimeout(()=> {
        var options = {
            method: 'POST',
            uri: 'https://fcm.googleapis.com/fcm/send',
            body: {
                "to": "295468902820",
                "data": {
                    title: "新闻标题",
                    body: "新闻正文",
                    icon: "https://www.baidu.com/img/bd_logo1.png",
                    click_action: "https://www.baidu.com",
                }
            },
            headers: {
                'Authorization': 'key='+config.key
            },
            json: true // Automatically stringifies the body to JSON
        };

        rp(options).then((body)=> {
            console.log('message', body)
        })
    }, 10000)

    return Promise.resolve({status: "success"})
}

