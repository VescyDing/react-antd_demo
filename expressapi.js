var express = require('express')

var bodyParser = require('body-parser')

var app = express()

var router = require('./router')

app.use('/node_modules/', express.static('./node_modules/'))

app.use('/assets/', express.static('./assets/'))

// app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// router(app) 普通方法

app.use(router)


app.listen(3002, function (){
    console.log('Server has running on 3002...')
})
