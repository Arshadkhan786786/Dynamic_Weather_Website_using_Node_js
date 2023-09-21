var http=require('http');
var fs=require('fs');
var request = require('request');
var datas = fs.readFileSync('home.html','utf-8');
function solve(oldd,newd){
    oldd=oldd.replace("{%temp%}",(newd.main.temp-273.15).toFixed(2));
    temp=oldd.replace("{%weath%}",newd.weather[0].main);
    return temp
}
var app = http.createServer((req,res)=>{
    if(req.url=='/'){
        request("https://api.openweathermap.org/data/2.5/weather?q=Kanpur&appid=5554e65a36ae187142127a5d102450a7")
        .on('data',(chunk)=>{
            obj=JSON.parse(chunk.toString())
            arr=[obj]
            const resu = arr.map((val) => solve(datas,val));
            res.end(resu.join())})
        .on('end',(err)=>{
            if(err){
                return console.log('Error found',err);;
            }
            console.log('end');
        });
    }
});
app.listen(3001);