import React, { Component } from 'react'
import { Input } from 'antd';
import { Form, Icon, Button, Checkbox } from 'antd';

const $ = require('jquery')

const { TextArea } = Input;

function getCookie(cname) {
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

class Profile extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.username = getCookie('username')
        console.log('Received values of form: ', values);
        if (values.nickname == undefined && values.password == undefined){
          alert('请至少输入一项要修改的信息！')
        } else {
            $.ajax({
          url:'http://localhost:3002/profile',
          type:'GET',
          dataType:'jsonp',//请求方式为jsonp
          jsonpCallback:'callback',
          data: values,
          success: ()=>{
            window.location.reload('/')
          }
      })
        }
      }
    });
  };



  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
      <Form onSubmit={this.handleSubmit}>
      <h1>修改您的社区昵称：</h1>

      <Form.Item>
        {getFieldDecorator('nickname', {
          rules: [{ required: false, message: '' }],
        })(
        <Input placeholder="输入您心仪的新昵称。" size="default" style={{width: '290px'}}/>
          
        )}
      </Form.Item>
        <h2>或者 &nbsp; 修改您的密码：</h2>
        <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: false, message: '' }],
        })(
        <Input placeholder="务必要记得哦~" size="default" style={{width: '290px'}}/>
          
        )}
        <br/>
        <Button type="danger" htmlType="submit" className="login-form-button" style={{marginTop: '34px'}}>
          提交更改
        </Button>
      </Form.Item>
      </Form>
      </div>
    )
  }
}

export default Form.create()(Profile);
