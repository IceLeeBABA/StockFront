import React, { Component } from 'react';
import {Button, Input} from "antd";
import { getCommentsData } from "../../store/actionCreators";
import store from "../../store";
require('./style.css');

class Header extends Component{
    constructor(props){
        super(props);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            inputValue: '',
        }
    }

    render() {

        return(
            <div>
                <Input placeholder='请输入股票代码' id='input-style' value={this.state.inputValue} onChange={this.handleInputChange}/>
                <Button type="primary" icon="search" id='btn' onClick={this.handleBtnClick}>查找</Button>
            </div>
        )
    }

    handleBtnClick(){
        let code = this.state.inputValue;
        const action1 = getCommentsData(code);
        store.dispatch(action1);
    }

    handleInputChange(e){
        this.setState({
            inputValue: e.target.value,
        })
    }
}

export default Header;
