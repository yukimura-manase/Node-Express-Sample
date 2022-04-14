const http = require('http')
const fs = require('fs')
const ejs = require('ejs') // ejs機能の読み込み
const url = require('url') // url機能の読み込み => ルーティング設定
const qs = require('querystring')

const ejsPage = fs.readFileSync('./index.ejs', 'utf-8') // 同期処理でEJSファイルを読み込み

const robotamaPage = fs.readFileSync('./robotama.ejs', 'utf-8')


const getFromClient = (request, response)=> { // レスポンスの定義

    const urlParse = url.parse(request.url, true) // parse(解析する)メソッドでリクエストurlを解析
    console.log(urlParse)

    switch(urlParse.pathname){ // urlParseのpathnameごとの処理
        case '/': 

            let home = 'ロボ玉によるNodeアプリ開発'

            var query = urlParse.query

            if(query.msg !== undefined){
                home = home + query.msg
            }

            var content = ejs.render(ejsPage, { 
                title: home,
                content: 'ロボ玉試作3号機',
            })

            console.log('ロボ玉バズーカー！！')
        
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write(content) // レスポンスとして、コンテンツを表示する！
            response.end()
        break;

        case '/robotama':
            var content = ejs.render(robotamaPage, { // letだと定義済みで、エラーになる！
                title: 'ロボ玉ビーム！！',
                content: '可能性の獣、ロボ玉！！'
            })
        
            console.log('ロボ玉ビーム！！')
            
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write(content) // レスポンスとして、コンテンツを表示する！
            response.end()
        break;
    }

    
    
}



let server = http.createServer(getFromClient) // サーバー作成

server.listen(3000) // 待ち受け状態

console.log('ロボ玉サーバー')



