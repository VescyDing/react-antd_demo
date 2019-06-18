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

class Tpcpost extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.username = getCookie('username')
        console.log('Received values of form: ', values);
        $.ajax({
          url:'http://localhost:3002/topicadd',
          type:'GET',
          dataType:'jsonp',//请求方式为jsonp
          jsonpCallback:'callback',
          data: values,
          success: ()=>{
            window.location.reload('/')
          }
      })
      }
    });
  };



  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
      <Form onSubmit={this.handleSubmit}>
      <h1>输入您的话题：</h1>

      <Form.Item>
        {getFieldDecorator('title', {
          rules: [{ required: true, message: '请输入您的话题。' }],
        })(
        <Input placeholder="请尽量短小精干。" size="large" />
          
        )}
      </Form.Item>
        <div style={{ margin: '24px 0' }} />
        <h2>输入您的看法：</h2>
        <Form.Item>
        {getFieldDecorator('cotent', {
          rules: [{ required: true, message: '请输入您的看法。' }],
        })(
        <TextArea placeholder="畅所欲言吧！" autosize={{ minRows: 6, maxRows: 22}} />
          
        )}

        <Button type="primary" htmlType="submit" className="login-form-button">
          发  表
        </Button>
      </Form.Item>
      </Form>
      </div>
    )
  }
}

export default Form.create()(Tpcpost);
