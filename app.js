var express = require('express');
var app = express();
var db = require("./public/js/db.js");

app.use(express.static('public'));

app.get('/', function (req, res) {
    // db.query('select * from daily_paper', function (err, rows) {
    //     console.log(err, rows);
    // })
   res.sendFile( __dirname + "/public/" + "dailyPaper.html" );
})

app.post('/submit', function (req, res) {
    var formData = '';
    req.on('data',function(data){
        formData += data;
    });
    req.on('end',function(){
      formData = JSON.parse(formData);
      var sql = "INSERT INTO daily_paper (`date`,`name`,`project_name`,`task_desc`,`planned_date`,`man_hour`,`complate_rate`,`delay_reason`)VALUES("+
                getDate() + ",'" + formData.name + "','" + formData.project_name + "','" + formData.task_desc + "','"
                + formData.planned_date + "','" + formData.man_hour + "','" + formData.complate_rate + "',"
                + (formData.delay_reason ? "'"+formData.delay_reason+"'" : "''") + ")";
      db.query(sql, function (err, rows) {
          if(!!err){
            res.end(JSON.stringify(err));
          }else{
            res.end(JSON.stringify(rows));
          }
      })
    })
    // db.query('select * from daily_paper', function (err, rows) {
    //     console.log(err, rows);
    // })
   // 输出 JSON 格式
   // var response = {
   //     "first_name":req.query.first_name,
   //     "last_name":req.query.last_name
   // };
   // console.log(response);
})

app.post('/insert', function (req, res) {
    var formData = '';
    req.on('data',function(data){
        formData += data;
    });
    req.on('end',function(){
      var sql= JSON.parse(formData);
      db.query(sql, function (err, rows) {
          if(!!err){
            res.end(JSON.stringify(err));
          }else{
            res.end(JSON.stringify(rows));
          }
      })
    })
})

var getDate = function(){
  var y = new Date().getFullYear();
  var m = ('0' + (new Date().getMonth() + 1)).substr(-2);
  var d = ('0' + new Date().getDate()).substr(-2);
  return  "'"+ y +"-"+ m +"-"+ d + "'";
}
var server = app.listen(9080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://10.4.124.16:", port)

})