var express = require('express');
var router = express.Router();

const mysql = require('mysql'); // mysqlの読み込み

const connection = mysql.createConnection( // mysqlの接続情報
  {
      host: 'localhost',
      user: 'root',
      password: 'masahiro5271',
      database: 'express1'
  }
);

router.get('/', (req, res, next)=> {

  connection.query(
    'SELECT * FROM users',
    (error, results) => {
      // console.log(results);
      // console.log(results.id)
      // console.log(results.name)

      // let data = {
      //   title:'MySQLと接続テスト',
      //   id: results.id,
      //   name: results.name
      // };

      // console.log(data)
      res.render('users.ejs', { data:results, title:'MySQLと接続テスト' });
    }
  );

});




module.exports = router;
