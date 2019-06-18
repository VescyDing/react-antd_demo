import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Icon } from 'antd';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Topic from './commponents/Topic';
import Login from './commponents/Login';
import RegistrationForm from './commponents/RegistrationForm';
import Tpcpost from './commponents/Tpcpost'
import Detail from './commponents/Detail'
import comment from './commponents/Comment' //避免混乱改成小写
import Profile from './commponents/Profile'



import { get } from 'https';

// import pct from 
const $ = require('jquery')


const { Header, Content, Footer } = Layout;

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} 



class App extends Component {

  constructor(props){
    super(props)

    this.logout = this.logout.bind(this);
  }
  
  logout = ()=>{
    alert("注销成功!")
    setCookie('username', '');
    window.location.reload('/')
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


render(){

  if (this.getCookie('username') == ""){
    return (

      <Router>
      <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' ,position: 'relative'}}
          id="menu"

        >
          
          <Menu.Item key="3"><Link to="/login"><Icon type="login" />登录</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/register"><Icon type="user-add" />注册</Link></Menu.Item>
          <Menu.Item key="1"><Link to="/"><Icon type="home" />首页</Link></Menu.Item>
          <Menu.Item key="4" id="Logo" ><div style={{ backgroundColor: '#fff'}} id="Logo"></div></Menu.Item>

        </Menu>
        
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {/* <Breadcrumb.Item>Welcome!</Breadcrumb.Item> */}
          <Breadcrumb.Item> </Breadcrumb.Item>
          <br/>

        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, height: '713px', maxWidth: '1100px', margin: '0 auto', overflow: 'auto'}}>
        <Route exact path="/" component={Topic} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={RegistrationForm} />
        <Route path="/comment/:tid" component={comment} />

        </div>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
    </Layout>
    </Router>
    );
  }else {
    return (

      <Router>
      <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px', position: 'relative'}}
          id="menu"

        >
          <Menu.Item key="7"><Link to="/" onClick={this.logout}><Icon type="logout" />注销</Link></Menu.Item>
          <Menu.Item key="8"><Link to="/detail"> <div className="ant-comment-avatar" style={{display: 'inline-block'}} ><img src={require('./assets/img/43200439.png')}/></div> {this.getCookie('username')}</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/tpcpost"><Icon type="medicine-box" />发帖</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/profile"><Icon type="setting" />设置</Link></Menu.Item>
          <Menu.Item key="1"><Link to="/"><Icon type="home" />首页</Link></Menu.Item>
          <Menu.Item key="4" id="Logo" ><div style={{ backgroundColor: '#fff'}} id="Logo"></div></Menu.Item>

        </Menu>
        
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {/* <Breadcrumb.Item>Welcome!</Breadcrumb.Item> */}
          <br/>
          
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, height: '713px', maxWidth: '1100px', margin: '0 auto', overflow: 'auto'}}>
        <Route exact path="/" component={Topic} />
        <Route path="/tpcpost" component={Tpcpost} />
        <Route path="/detail" component={Detail} />
        <Route path="/comment/:tid" component={comment} />
        <Route path="/profile" component={Profile} />


  
        </div>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
    </Layout>
    </Router>
    );
  }

  
}

}

export default App;
