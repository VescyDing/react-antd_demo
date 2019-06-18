import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import Compost from './Compost'

export default class Commodal extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false
    }
    console.log('username', this.props.username)

  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
        <div>
        <Button type="primary" size="small" onClick={this.showModal}>
          回复
        </Button>
        <Modal
          title={"回复于:  "+this.props.username}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Compost replyusername={this.props.username} tid={this.props.targett}/>
        </Modal>
      </div>
    )
  }
}
