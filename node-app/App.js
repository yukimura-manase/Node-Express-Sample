
// 1.モジュールの読み込み
const http = require('http') // http通信機能
const fs = require('fs') // ファイル読み込み機能

// 2.サーバー作成 => 変数に格納
let server = http.createServer(

    // requestに対するresponse処理を設定。
    (request,response) => { 

        console.log('request受理！！')

        // fs.readFile( 読み込みファイル, エンコーディング指定, readFinish関数(読み込み後の実行関数) => コールバック(非同期) )
        fs.readFile('./index.html','UTF-8', 
            (error, data) => {

                // ヘッダー情報を出力します！
                response.writeHead(200, { 'Content-Type': 'text/html' })

                // 読み込んだファイルのコンテンツを出力します！
                response.write(data)

                // クライアントへの返信を終了します！
                response.end()
            }
        )
    }
)

// 3.待ち受け状態 => ポート番号3000番を設定 => requestがあったらresponseを返す！
server.listen(3000);

// http://localhost:3000

console.log('Sever Start!!')