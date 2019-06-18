import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { func } from 'prop-types';
const $ = require('jquery')

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} 

// function callback(data){
//   console.log(data)
//   setCookie('username', data, 1)
// }


class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        $.ajax({
          url:'http://localhost:3002/login',
          type:'GET',
          dataType:'jsonp',//请求方式为jsonp
          jsonpCallback: "callback",
          data: values,
          success: (data)=>{
            setCookie('username', data, 1);
            window.location.reload('/')
          }
      })
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    return (
      <div id="loginform">
      <div id="biglogo" style={{margin: '20px auto'}} ></div>
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入注册邮箱！' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="您的邮箱。"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码！' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="您的密码。"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>记住登录选项</Checkbox>)}
        <a className="login-form-forgot" href="#">
          忘记密码？ (开发中)
        </a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登    录
        </Button>
        或者 <a href="/register">立即注册！</a>
      </Form.Item>
    </Form>
    </div>
    
    )
  }
}

export default Form.create()(Login);