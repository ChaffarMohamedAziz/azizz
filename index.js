const express = require('express')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const app  = express()
app.set('view engine','ejs')
app.set('views', path.join(__dirname , 'views'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
port = 8000

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/create', (req, res) => {
    res.render('create');
  });
app.post('/create',(req, res)=>{
    const {name, age, languages} = req.body
    const newData = {name,age, languages: Array.isArray(languages) ? languages : [languages]}
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.log(err)
            res.status(500).send('Internal Server Error')
            return
        }
        const jsonData = data? JSON.parse(data) : []
        jsonData.push(newData)
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
              return;
            }
            
            res.render('create', { message: 'Data saved successfully.' })
          });
      });

})
app.get('/data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      const jsonData = data ? JSON.parse(data) : [];
      res.render('data', { data: jsonData });
    });
  });
  

app.listen(port,()=>{
    console.log(`server listerning on port${port}`)
})