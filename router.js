var express = require('express')
var router = express.Router()
var User = require('./src/DB/user')
var Topic = require('./src/DB/Topic')
var Comment = require('./src/DB/Comment')



router.get('/login', function(req, res){
  console.log(req.query);
  User.findOne({'username': req.query.username}, function(err, user){
  if (err == null && user == null){
    return res.status(200).send("alert('不存在的用户名!')");

  } else
  if (user.password == req.query.password){
  console.log(user.password);

    return res.status(200).send("callback('"+ req.query.username +"')");
  } else {
    return res.status(200).send("alert('用户名或密码错误!')");
  }
  })
})

router.get('/register', function(req, res){
  delete req.query['_'];
  delete req.query['callback'];
  req.query.username = req.query.email;
  console.log(req.query);

  User.findOne({'username': req.query.username}, function(err, user){
    console.log(user)
    if (user){
      return res.status(200).send(`alert("该用户名已存在!")`);
    } else {
      new User(req.query).save(function (error, user){
        console.log(error, user)
        if (error){
            return res.status(500).send(error);
        } else {
          return res.status(200).send(`alert("注册成功!")`);
        }
    })
    }
  })

})

router.get('/topicadd', function(req, res){

  console.log(req.query);
  User.findOne({'username': req.query.username}, function(err, user){
    if (err){
      return res.status(200).send(`alert("未知错误,发表失败!")`);
    } else {
      req.query.nickname = user.nickname;
      console.log(req.query)
      new Topic(req.query).save(function (error, topic){
        console.log(error, topic)
        if (error){
            return res.status(500).send(`alert("未知错误,发表失败!")`);
        } else {
          return res.status(200).send(`alert("发表成功!");callback()`);
        }
      })
    }
  })
  
})

router.get('/topiclist', function(req, res){

  Topic.find(function(err, topic) {
    if (err){
      return res.status(500).send(`alert("未知错误,请求话题列表失败!")!`);
  } else {
    topic = JSON.stringify(topic)
    
    return res.status(200).send("callback('"+ topic +"')");

  }})
  })

router.get('/getuserinfo', function(req, res){
  console.log(req.query);
  User.findOne({'username': req.query.username}, function(err, user){
    Topic.find({'username': req.query.username}, function(err, topic){
      user = JSON.stringify(user)
      user = JSON.parse(user)
      user.topic = topic
      //这个地方反复用json方法有点无语
      user = JSON.stringify(user)



      return res.status(200).send("callback('"+ user +"')");

    })

  })
})

router.get('/getTandC', function(req, res){
  console.log(req.query);
    Topic.findOneAndUpdate({'_id': req.query.tid}, {$inc: { views: 1 }}, function(err, topic){
      Comment.find({'targett': req.query.tid}, function(err, comment){

        topic = JSON.stringify(topic)
        topic = JSON.parse(topic)
        topic.comment = comment
        topic = JSON.stringify(topic)

        //这个地方反复用json方法有点无语
        //而且第一个方法必须是findone,这样第一层返回的才是一个对象,不是数组,不然这样反复用json仍然是装不进去这个comment的,神奇
        return res.status(200).send("callback('"+ topic +"')");

      })



    })

})

router.get('/comadd', function(req, res){
  console.log(req.query);

  new Comment(req.query).save(function (error, comment){
    console.log(error, comment)
    if (error){
        return res.status(500).send(`alert("未知错误,评论失败!")`);
    } else {
            return res.status(200).send(`alert("评论成功!");callback()`);
    }
  })
})

router.get('/viewadd', function(req, res){
  console.log(req.query);
  Topic.findByIdAndUpdate({_id: req.query.tid}, {$inc: { views: 1 }}, (error, rs)=>{
    console.log(error, rs)
    if (!error)
      return res.status(200);
  })
})

router.get('/staradd', function(req, res){
  console.log(req.query);
  Topic.findByIdAndUpdate({_id: req.query.tid}, {$inc: { star: 1 }}, (error, rs)=>{
    rs.star = rs.star+1
    console.log(error, rs)
    rs = JSON.stringify(rs)
    if (!error)
      return res.status(200).send("callback('"+ rs +"');alert('感谢您的支持!')");
  })
})



router.get('/deltopic', function(req, res){
  console.log(req.query);
  Topic.findByIdAndDelete({_id: req.query.tid}, (error, rs)=>{
    console.log(error, rs)
    if (!error)
      return res.status(200).send("callback();alert('删除成功!')");
  })
})

router.get('/profile', function(req, res){
  let err = null;
  console.log(req.query);
  if (req.query.nickname != undefined){
    User.findOneAndUpdate({username: req.query.username}, {nickname: req.query.nickname}, (error, rs)=>{
      console.log(error, rs)
      err = error
    })
  }
  if (req.query.password != undefined){
    User.findOneAndUpdate({username: req.query.username}, {password: req.query.password}, (error, rs)=>{
      console.log(error, rs)
      err = error
    })
  } 
  if (!err)
    return res.status(200).send("alert('更新成功!')");
})


module.exports = router
