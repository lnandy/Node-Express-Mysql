// var mysql  = require('mysql');

// var connection = mysql.createConnection({
//   host     : '10.4.121.186',
//   user     : 'root',
//   password : '123456',
//   port: '3310',
//   database: 'cpc_hzj'
// });

// connection.connect();

// var  sql = 'SELECT * FROM daily_paper';
// //²é
// connection.query(sql,function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }

//        console.log('--------------------------SELECT----------------------------');
//        console.log(result);
//        console.log('------------------------------------------------------------\n\n');
// });

// connection.end();
var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : '10.4.121.186',
  user     : 'root',
  password : '123456',
  port: '3310',
  database: 'cpc_hzj'
});

function query(sql, callback) {
    // connection.connect();
    // connection.query(sql, function (err, rows) {
    //     callback(err, rows);
    //     connection.end();//释放链接
    // });
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (err, rows) {
                callback(err, rows);
            });
        }
        pool.releaseConnection(conn);
    });
}
exports.query = query;