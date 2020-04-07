import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    const { content } = this.props;
    return (
      <div onClick={this.handleClick}>
        {/* 1.接收父组件传值 */}
        {content}
      </div>
    );
  }
  handleClick() {
    const { deleteItem, index } = this.props;
    //2.接收父组件传递过来的方法
    deleteItem(index);
  }
}

export default TodoItem;
