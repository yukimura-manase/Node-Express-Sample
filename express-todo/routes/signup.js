const express = require('express');
const router = express.Router();

const knex = require("../db/knex");

router.get('/', (req, res, next)=> {
    res.render('signup', {
      title: 'Sign up',
    });
});

router.post('/',(req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;
    const repassword = req.body.repassword;

    knex('users').where( {name:username} ) // 引数にはオブジェクト形式でキーがカラム名
    .select('*')
    .then((result)=>{
        if(result.length !== 0){
            res.render("signup", {
                title: "Sign up",
                errorMessage: ["このユーザ名は既に使われています"],
            })
        } else if (password === repassword) {
            knex("users")
              .insert( {name: username, password: password} )
              .then( ()=> {
                res.redirect("/");
              })
              .catch( (err)=> {
                console.error(err);
                res.render("signup", {
                  title: "Sign up",
                  errorMessage: [err.sqlMessage],
                });
              });
        } else {
            res.render("signup", {
                title: "Sign up",
                errorMessage: ["パスワードが一致しません"],
            });
        };
    }).catch((err)=> {
        console.error(err);
        res.render("signup", {
            title: "Sign up",
            errorMessage: [err.sqlMessage],
        });
    });
});
  
module.exports = router;

