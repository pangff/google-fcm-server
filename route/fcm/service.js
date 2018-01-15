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
            uri: 'https://android.googleapis.com/fcm/send',
            body: {
                "to": token,
                "data": {
                    title: "新闻标题",
                    body: "新闻正文",
                    icon: "https://www.baidu.com/img/bd_logo1.png",
                    click_action: "https://www.baidu.com"
                },
                notification:{
                    title: "新闻标题",
                    body: "新闻正文",
                    icon: "https://www.baidu.com/img/bd_logo1.png"
                }
            },
            headers: {
                'Authorization': 'key='+config.key,
                'Content-Type': 'application/json'
            },
            json: true // Automatically stringifies the body to JSON
        };
        console.log(options)
        rp(options).then((body)=> {
            console.log('message', body)
        })
    }, 10000)

    return Promise.resolve({status: "success"})
}

