const express = require('express');
const router = express.Router();

const knex = require('../db/knex');
const mysql = require('mysql');

// knexのget通信
router.get('/', (req, res, next)=> {
  const userId = req.session.userid;
  const isAuth = Boolean(userId); // 真偽値変換
  console.log(`isAuth: ${isAuth}`);

  knex("tasks")
    .select("*")
    .then((results)=> {

      console.log(results);
      res.render('index', {
        title: 'ToDo App',
        todos: results,
        isAuth: isAuth,
      });

    })
    .catch((err)=> {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
      });

    });
});

// knexのpost通信
router.post('/', (req, res, next)=> {
  const todo = req.body.add;
  knex("tasks")
    .insert({user_id: 1, content: todo}) // 引数にはオブジェクト形式でキーがカラム名、値が追加するデータとなるように指定します。
    .then(()=> {
      res.redirect('/')
    })
    .catch( (err)=> {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
      });
    });
});

router.use('/signup', require('./signup')); // /signupに対するリクエストをsignup.jsの処理に流すことができます。

router.use('/signin',require('./signin'));

router.use('/logout',require('./logout'));

// knexを使わない場合

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'masahiro5271',
//   database: 'todo_app'
// });

// get通信
// router.get('/', (req, res, next)=> {

//   connection.query(`select * from tasks;`, (error, results)=> {
//     console.log(error);
//     console.log(results);
//     res.render('index', { title: 'Todoアプリ', todos:results });
//   });

// });



// post通信
// router.post('/', (req, res, next)=> {

//   // 接続を確認するためのコード
//   connection.connect((err) => {
//     if (err) {
//       console.log('error connecting: ' + err.stack);
//       return
//     };
//     console.log('success');
//   });
  
//   const todo = req.body.add;
//   console.log(todo)

//   connection.query(`insert into tasks (user_id, content) values (1, '${todo}');`,
//     (error, results)=>{
//       console.log(error);
//       res.redirect('/'); // 追加処理の後にリダイレクトで再読み込み！
//     }
//   );

// });





module.exports = router;