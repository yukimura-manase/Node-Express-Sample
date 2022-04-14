// 必要なモジュールの読み込み
var createError = require('http-errors');　// httpエラーの対処用モジュール
var express = require('express'); // Express本体の読み込み
var path = require('path'); // ファイルパスを扱うためのオブジェクト
var cookieParser = require('cookie-parser'); // クッキーのパース(解析処理・値の変換処理)に関するもの
var logger = require('morgan'); // httpリクエストのログ出力に関するもの

// ルーティング設定のためのモジュール読み込み => ルーティング設定(呼び出し関数の生成)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var helloRouter = require('./routes/hello');
var samples = require('./routes/sample');
var newsRouter = require('./routes/news')

const session = require('express-session') // セッション機能の読み込み

const mysql = require('mysql') // mysqlの読み込み

const connection = mysql.createConnection( // mysqlの接続情報
  {
      host: 'localhost',
      user: 'root',
      password: 'masahiro5271',
      database: 'express1'
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

var app = express(); // Express本体を呼び出して、アプリケーションの型枠を生成する

var session_opt = { // セッション利用のための初期設定
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}

// app.setメソッドで、アプリケーションで必要とする設定情報をセットしている！
app.set('views', path.join(__dirname, 'views')); // テンプレートファイルが保管される場所
app.set('view engine', 'ejs'); // テンプレートエンジンの種類

// app.useメソッドによる関数の組み込み => アプリケーションに必要な機能を組み込んでいる！
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( session(session_opt) );

// アクセスのためのapp.use => ルーティング設定(アクセスパス設定・呼び出し関数のセット)
app.use('/', indexRouter); // ( path, 呼び出し関数)
app.use('/users', usersRouter);
app.use('/hello',helloRouter);
app.use('/sample', samples);
app.use('/news', newsRouter);


// catch 404 and forward to error handler // エラー用の関数
app.use((req, res, next)=> {
  // console.log(req)
  // console.log(res)
  next(createError(404));
});

// error handler // エラー用の関数
app.use( (err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; // 設定したモジュールが外部からアクセスできるようにexportsプロパティに紐付ける！

