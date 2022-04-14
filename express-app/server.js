const express = require('express') // expressモジュールを読み込む
const mysql = require('mysql') // mysqlの読み込み

// expressアプリを生成する
let app = express() // expressオブジェクトを呼び出してappを作成

const connection = mysql.createConnection( // mysqlの接続情報
    {
        host: 'localhost',
        user: 'root',
        password: 'masahiro5271',
        database: 'todo_app'
    }
)

// MySQLへの接続ができていないときにエラーを表示する
connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
  });


// ルート（http://localhost/）にアクセスしてきたときにJSONデータを返す
app.get('/', (req, res)=> { // ルーティングの設定

    connection.query(
        'SELECT * FROM users',
        (error, results) => {
          console.log(results);
          res.render('hello.ejs',{title:'ロボ玉.js',content:'ロボ玉の日常'});
        }
    );

})

app.use( (req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ポート4000でサーバを立てる => 3000で作ってしまうとReactとバッティングしてしまうため、別にしています。
app.listen(4000, ()=> { // 待ち受け開始
    console.log('Start Server port:4000')
})

