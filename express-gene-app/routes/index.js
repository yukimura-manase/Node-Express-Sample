var express = require('express'); // Express本体の読み込み
var router = express.Router(); // Routerオブジェクトを呼び出してrouterに格納する。

//console.log(router)

/* GET home page. */
router.get('/', (req, res, next)=> {　// getメソッド

  res.render('index', { title: 'Express' }); // レスポンスとなるレンダリング設定

});

module.exports = router; // 設定したモジュールが外部からアクセスできるようにexportsプロパティに紐付ける！

