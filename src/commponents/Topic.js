import { Comment, Tooltip, List } from 'antd';
import moment from 'moment';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import React, { Component } from 'react'
import { func } from 'prop-types';
const $ = require('jquery')


// const Data = [
//   {
//     actions: [<span>Reply to</span>],
//     author: 'Han Solo',
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     content: (
//       <p>
//         We supply a series of design principles, practical patterns and high quality design
//         resources (Sketch and Axure), to help people create their product prototypes beautifully and
//         efficiently.
//       </p>
//     ),
//     datetime: (
//       <Tooltip
//         title={moment()
//           .subtract(1, 'days')
//           .format('YYYY-MM-DD HH:mm:ss')}
//       >
//         <span>
//           {moment()
//             .subtract(1, 'days')
//             .fromNow()}
//         </span>
//       </Tooltip>
//     ),
//   },
//   {
//     actions: [<span>Reply to</span>],
//     author: 'Han Solo',
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     content: (
//       <p>
//         We supply a series of design principles, practical patterns and high quality design
//         resources (Sketch and Axure), to help people create their product prototypes beautifully and
//         efficiently.
//       </p>
//     ),
//     datetime: (
//       <Tooltip
//         title={moment()
//           .subtract(2, 'days')
//           .format('YYYY-MM-DD HH:mm:ss')}
//       >
//         <span>
//           {moment()
//             .subtract(2, 'days')
//             .fromNow()}
//         </span>
//       </Tooltip>
//     ),
//   },
// ];


export default class Topic extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: [],
    }
    this.getData(()=>{this.forceUpdate()})
  }

  getData = (cb)=>{
    $.ajax({
      url:'http://localhost:3002/topiclist',
      type:'GET',
      dataType:'jsonp',//请求方式为jsonp
      jsonpCallback:'callback',
      data: null,
      success: (data)=>{
        console.log('topiclist', data)
        data = JSON.parse(data) 
        this.setState({
          data: data.reverse()
        })
        cb()
      },
      error:function(e){  
        console.log(e);  
      }  
    })
  }

  componentDidMount(){
    this.getData(()=>{
      this.forceUpdate();
    })
  }


  
// this.state.topiclist = topiclist



  render() {


    return (
  //     <div>
  //       <List
  //   id="topic-show"
  //   className="comment-list"
  //   header={`${Data.length} replies`}
  //   itemLayout="horizontal"
  //   dataSource={Data}
  //   renderItem={item => (
  //     <li>
  //       <Comment
  //         actions={item.actions}
  //         author={item.author}
  //         avatar={item.avatar}
  //         content={item.content}
  //         datetime={item.datetime}
  //       />
  //     </li>
  //   )}
  // />
  //     </div>


<div className="ant-list comment-list ant-list-split" id="topic-show">
                          <div className="ant-list-header">{this.state.data.length} topics</div>
                          <div className="ant-spin-nested-loading">
                              <div className="ant-spin-container">
                                  <ul className="ant-list-items">
{
  this.state.data.map((value, key)=>{
    return (<li key={key}>
      <div className="ant-comment">
          <div className="ant-comment-inner">
              <div className="ant-comment-avatar"><img src={require('../assets/img/43200439.png')}/></div>
              <div className="ant-comment-content" >
                  <div className="ant-comment-content-author"><span className="ant-comment-content-author-name"><b>{value.nickname}</b>  @ {value.username}</span><span className="ant-comment-content-author-time"><span>Create in {value.creat_time}</span></span>
                  </div>
                  <Link to={`/comment/${value._id}`}>

                  <div className="ant-comment-content-detail">
                      <h3>{value.title}</h3>
                      <p style={{overflow: 'hidden', textOverflow: 'ellipsis' }}>{value.cotent}</p>
                  </div>
                  </Link>

                  <ul className="ant-comment-actions">
                      <li><span>Last Reply in {value.last_reply_time}</span></li>
                      <li><span><i aria-label="点赞" tabindex="-1" className="anticon anticon-like"><svg viewBox="64 64 896 896"  data-icon="like" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0 1 42.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"></path></svg></i><span style={{'paddingLeft': '8px', 'cursor': 'auto'}}>{value.star}</span></span></li>
                      <li><span><i aria-label="查看" tabindex="-1" className="anticon anticon-eye"><svg viewBox="64 64 896 896"  data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg></i><span style={{'paddingLeft': '8px', 'cursor': 'auto'}}>{value.views}</span></span></li>
                  
                  </ul>
              </div>
          </div>
      </div>
  </li>)
  })
}

                                  </ul>
                              </div>
                          </div>
                      </div>


    )
  }
}

