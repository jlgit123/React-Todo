import React, { Component, Fragment } from "react";
import TodoItem from './TodoItem';
import "./style.css";//先引入组件，再引入样式

class TodoList extends Component {
  constructor(props) {
    //继承父类
    super(props);
    this.state = {
      inputValue: "",
      list: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }
  render() {
    return (
      /*1.1注意这里必须最外层有显示的div/占位符组件Fragment包裹 */
      <Fragment>
        <div>
          {/* 3.3扩大点击区域的 label标签,for会报错,替换成htmlFor就可以-->*/}
          <label htmlFor="insertArea">输入内容</label>
          <input
            id="insertArea"
            className="input" //3.1不建议元素样式使用class
            value={this.state.inputValue}
            /*1.2修改this指向，否则this.state报错*/
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>
        <ul>
            {this.getTodoItem()}
            {/* 代码优化 */}
        </ul>
      </Fragment>
    );
  }

  getTodoItem(){
    return this.state.list.map((item, index) => {
        return (
            <div key={index}>
                <TodoItem 
                    content={item} 
                    index={index}
                    deleteItem={this.handleItemDelete}
                />
        {/*<li
            key={index}
            onClick={this.handleItemDelete.bind(this, index)}
            // 3.2如果内容含标签，转义，直接显示html
            dangerouslySetInnerHTML={{ __html: item }}
          >
            //{item} 
          </li>*/}
            
            </div>

        );
      })
  }

  handleInputChange(e) {
    // console.log(this);//undefined
    // this.state.inputValue = e.target.value; //Cannot read property 'state' of undefined
    //1.3须调用setState对数据进行更改，响应到视图
    this.setState({
      inputValue: e.target.value,
    });

  }
  handleBtnClick() {
    //2.1新增条目并且清空输入框
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: "",
    });

    /* //最新写法，函数写法
    this.setState((prevState)=>({
        list:[...prevState.list,prevState.inputValue],
        inputValue:''
    }));*/
  }
  handleItemDelete(index) {
    //2.2要先拷贝  immutable
    //state不允许我们做任何的改变,非要改变请先拷贝副本
    const list = [...this.state.list];
    list.splice(index, 1);
    this.setState({
      list: list,
    });
  }
}

export default TodoList;
