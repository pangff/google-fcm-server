'use strict';
const path = require('path');
const Service = module.exports = {};
const request = require('request');
const rp = require('request-promise');
const config = require('../../config');

const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();

webpush.setGCMAPIKey(config.key);
webpush.setVapidDetails(
    'mailto:jiangxin@feawin.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

Service.sendVapIdMessage=(pushSubscription)=>{
    console.log(pushSubscription)
    let payload = JSON.stringify({
        title:"新闻标题",
        body: "新闻正文",
        icon: "https://www.baidu.com/img/bd_logo1.png"
    })
    return webpush.sendNotification(pushSubscription,payload,{
        headers: {
            'Authorization': 'key='+config.key,
            'Content-Type': 'application/json'
        }
    }).catch((e)=>{
        console.error(e)
        return Promise.reject(e);
    })
}


Service.sendMessage = (token)=> {

    setTimeout(()=> {
        var options = {
            method: 'POST',
            uri: 'https://fcm.googleapis.com/fcm/send',
            body: {
                to: token,
                data: {
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

