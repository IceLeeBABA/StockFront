import React, { Component } from 'react';
import { Button } from "antd";
import SearchGroup from '../../components/SearchGroup';
require('./style.css');

class Header extends Component{
    render() {
        return (
            <div id='h-style'>
                <SearchGroup/>
                <Button id='header-btn'>
                    <a href='/'>详情</a>
                </Button>
                <Button id='header-btn'>
                    <a href='/comments'>评论</a>
                </Button>
                <Button id='header-btn'>
                    <a href='/kPicture'>k线图</a>
                </Button>
            </div>
        )
    }
}

export default Header;
