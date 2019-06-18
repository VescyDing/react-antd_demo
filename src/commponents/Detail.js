import React, { Component } from 'react'
import { Descriptions, Badge } from 'antd';
import { Card } from 'antd';
import { Button } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const $ = require('jquery')


export default class Detail extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: [],
    }
  }

  getCookie = (cname)=> {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
         }
         if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
         }
     }
    return "";
  } 

  getData = ()=>{
    $.ajax({
      url:'http://localhost:3002/getuserinfo',
      type:'GET',
      dataType:'jsonp',//请求方式为jsonp
      jsonpCallback:'callback',
      data: {username: this.getCookie('username')},
      success: (data)=>{
        data = JSON.parse(data) 

        this.setState({
          data: data,
        })
        console.log('this.state',this.state);  
        this.forceUpdate()
      },
      error:function(e){  
        console.log(e);  
      }  
    })
  }

  componentDidMount(){
    this.getData()
  }

  del = (tid, rf)=>{
    $.ajax({
      url:'http://localhost:3002/deltopic',
      type:'GET',
      dataType:'jsonp',//请求方式为jsonp
      jsonpCallback:'callback',
      data: {tid: tid},
      success: ()=>{
        rf()
      },
      error:function(e){  
        console.log(e);  
      }  
    })
  }

  
  render() {
    return (
      <div>
        <img id="detailavatar" src={require('../assets/img/43200439.png')}/>
        <br />
        <br />
        <br />


        <Descriptions title="用户信息" bordered>
    <Descriptions.Item label="账户">{this.state.data.username}</Descriptions.Item>
    <Descriptions.Item label="昵称">{this.state.data.nickname}</Descriptions.Item>
    <Descriptions.Item label="电话">{this.state.data.phone}</Descriptions.Item>
    <Descriptions.Item label="注册时间" span={3}>
    {this.state.data.creat_time}
    </Descriptions.Item>
    <Descriptions.Item label="Status" span={3}>
      <Badge status="processing" text="正常" />
    </Descriptions.Item>
    <Descriptions.Item label="博客">{this.state.data.website}</Descriptions.Item>
    <Descriptions.Item label="地址" span={3}>{this.state.data.residence}</Descriptions.Item>

    {/* <Descriptions.Item label="帖子" span={3}> */}

      {/* 等主页topic组件完成详情功能再写 */}
    {/* </Descriptions.Item> */}
  </Descriptions>
  <p className="ant-descriptions-title" style={{ paddingTop: '14px' }}>帖子</p>

      <div id="showUt" style={{ background: '#ECECEC', padding: '4px', marginTop: '20px ', overflow: 'auto' }}>
      <div style={{ height: '100%', whiteSpace: 'nowrap' }}>
    {
      (this.state.data.topic || []).map((value, key)=>{
        return (
                    <Card key={key} title={value.title} bordered={false} style={{ width: 300, display: 'inline-block', marginRight: '26px' }}>
            <Link to={`/comment/${value._id}`}>
                            
                            <p>创建于: {value.creat_time}</p>
                            <p>收藏: {value.star}</p>
                            <p>浏览: {value.views}</p>
            </Link>

                            <Button type="danger" block onClick={this.del.bind(this, value._id, ()=>{this.getData()})}>
                              删除
                            </Button>
                    </Card>
            
                      
        )
      })

    }
    
      </div>
      </div>
      </div>
    )
  }
}
