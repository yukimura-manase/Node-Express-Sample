const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=> { // app.jsでは「/hello」、helloファイルでは「/」となる。

    console.log('呼び出されました');

    var msg = '初期メッセージ・ロボ玉';

    if(req.session.message != undefined){
        msg = 'セッションメッセージ' + req.session.message
    };

    // var name = req.query.name // リクエストの中にあるqueryパラメーターを取り出している！
    // var mail = req.query.mail

    var data = {
        title:'Helloロボ玉！',
        content:`msg`
    };

    res.render('hello',data); // アクセスパス「/」の時に、helloファイルをレンダリングする & dataを渡す！
})

router.post('/post', (req, res, next)=> {
    console.log('動いている');
    //console.log(req)
    var msg = req.body.message;
    //console.log(msg)

    req.session.message = msg;

    var data = {
        title:'inputメッセージ',
        content:'セッションメッセージ' + req.session.message
    };

    res.render('hello',data); // hello.ejsをレンダリングする！
})

module.exports = router; // モジュールとしてexportする！