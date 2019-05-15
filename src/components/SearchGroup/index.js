import React, { Component } from 'react';
import { Button, Input } from 'antd';
import store from '../../store';
import { updateTableAction } from '../../store/actionCreators';
require('./style.css');

class SearchGroup extends Component{
    constructor(props){
        super(props);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.state = {
            inputValue: '',
        }
    }

    render() {

        return(
            <div>
                <Input placeholder='请输入股票代码' id='input-style'/>
                <Button type="primary" icon="search" id='btn' onClick={this.handleBtnClick}>查找</Button>
            </div>
        )
    }

    handleBtnClick(){
        const value = [{
            key: '1',
            code: 'sh603077',
            name: '和邦生物',
            latest_price: '1.97',
            rise_fall: '+1.08',
            quote_change: '+10.056',
            buy: '1.97',
            sell: '0.00',
            yesterday_get: '1.79',
            today_open: '1.78',
            highest: '1.97',
            lowest: '1.77',
            volume: '1752020',
            turnover: '33671.09'
        }, {
            key: '2',
            code: 'sh603077',
            name: '和邦生物',
            latest_price: '1.97',
            rise_fall: '+1.08',
            quote_change: '+10.056',
            buy: '1.97',
            sell: '0.00',
            yesterday_get: '1.79',
            today_open: '1.78',
            highest: '1.97',
            lowest: '1.77',
            volume: '1752020',
            turnover: '33671.09'
        }];

        const action = updateTableAction(value);
        store.dispatch(action);
    }
}

export default SearchGroup;
