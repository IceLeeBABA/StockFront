import React, { Component } from 'react';

import { Select, Button } from 'antd';
import { getTableData, updateExchangeAction } from "../../store/actionCreators";
import store from "../../store";

const Option = Select.Option;
class CheckGroup extends Component {
    constructor(props){
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.state = {
            exchange: "sh_a"
        }
    }
    componentWillMount() {
        this.handleBtnClick();
    }

    render() {
        return (
            <div id='check-group-style'>
                <Select defaultValue="" value={this.state.exchange} style={{ width: 120, marginBottom: '15px' }} onChange={this.handleSelectChange}>
                    <Option value="sh_a" key="sh_a">沪A</Option>
                    <Option value="sh_b" key="sh_b">沪B</Option>
                    <Option value="sz_a" key="sz_a">深A</Option>
                    <Option value="sz_b" key="sz_b">深B</Option>
                </Select>
                <Button type="primary" icon="search" id='btn' onClick={this.handleBtnClick}>查看</Button>
            </div>

        )
    }

    handleSelectChange(e){
        this.setState({
            exchange: e
        })
    }

    handleBtnClick(){
        let selected = this.state.exchange;
        console.log('get exchange');
        console.log(selected);
        const action1 = getTableData(selected,1,5);
        store.dispatch(action1);
        const action2 = updateExchangeAction(selected);
        store.dispatch(action2);
    }

}

export default CheckGroup;
