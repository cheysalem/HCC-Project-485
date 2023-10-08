const express = require('express'); //import express
const app = express(); //intialize express
const cors = require('cors');
const fs = require('fs');


app.use(cors()); //prevent any cor errors?

app.get('/api', function(req, res){
    //response
    // request from favicon
    if(req.url === '/favicon.ico'){
        res.end();
    }

   const json= fs.readFileSync('count.json', 'utf-8');
   const obj = JSON.parse(json); //passing in json data

   obj.pageviews = obj.pageviews+1;
   if(req.query.type === 'visit-pageview'){
    obj.visits = obj.visits+1
   }
   const newJSON = JSON.stringify(obj);

   fs.writeFileSync('count.json', newJSON);
   res.send(newJSON); //updated file in JSON format

});

app.listen(3302, () =>{
    console.log("Server running on port 5500")
})