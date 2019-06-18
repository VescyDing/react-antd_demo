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

class Compost extends Component {

  constructor(props){
    super(props)

  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('props', this.props)

    this.props.form.validateFields((err, values) => {
      if (!err) {
    if (this.props.replyusername != undefined){
      console.log(('回复@' + this.props.replyusername + ':  ' ).concat(values.cotent))
      values.cotent = ('回复@' + this.props.replyusername + ':  ' ).concat(values.cotent)
    }
        values.username = getCookie('username')
        // console.log('', this.props.tid)
        values.targett = this.props.tid;
        console.log('Received values of form: ', values);
        $.ajax({
          url:'http://localhost:3002/comadd',
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
      <div style={{'bottom:': 0}}>
      <Form onSubmit={this.handleSubmit}>
        <div style={{ margin: '24px 0' }} />
        <span>输入评论：</span>
        <Form.Item>
        {getFieldDecorator('cotent', {
          rules: [{ required: true, message: '请输入您的观点。' }],
        })(
        <TextArea placeholder="畅所欲言吧！" autosize={{ minRows: 3, maxRows: 22}} />
          
        )}

        <Button type="primary" htmlType="submit" className="login-form-button">
          评    论
        </Button>
      </Form.Item>
      </Form>
      </div>
    )
  }
}

export default Form.create()(Compost);
