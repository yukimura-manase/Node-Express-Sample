const express = require('express')
const router = express.Router()
const https = require('https')
const parseStirng = require('xml2js').parseString


router.get('/', (req, res, next)=> {// 「/」(app.jsでの「/news」のこと)

    var opt = {
        host: 'news.google.com',
        port:'443',
        path:'/rss?hl=ja&ie=UTF-8&gl=JP&ceid=JP:ja'
    }

    // GoogleニュースのAPIを取得する！(外部通信)
    https.get(opt, (res2)=> {
        var body = '';

        res2.on('data', (data)=>{
            body = body + data
        });

        res2.on('end', ()=> {

            parseStirng(body.trim(), (err, result)=> {
                // console.log(result); // 最上位のデータ構造から少しずつ深ぼっていく！
                // console.log(result.rss)
                // console.log(result.rss.channel)
                // console.log(result.rss.channel[0])
                //console.log(result.rss.channel[0].item)

                var data = {
                    title: 'GooGle News',
                    contents: result.rss.channel[0].item
                };

                res.render('news.ejs', data);
            });

        });

    });


});

module.exports = router;









