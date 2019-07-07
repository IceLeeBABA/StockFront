import React, { Component } from 'react';
import {Button, InputNumber, Select, Statistic, Table} from "antd";
import {getScreenTableData} from "../../store/actionCreators";
import store from "../../store";

const Option = Select.Option;
class Screening extends Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.state = {
            S_dataSource: {
                type: '0',
                exchange:'sh_a',
                tableData: [],
            },
        }
        store.subscribe(this.handleStoreChange);
    }

    render() {
        const columns = [{
            title: '代码',
            width: 100,
            dataIndex: 'code',
            key: 'code',
            fixed: 'left',
        },{
            title: '名称',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },{
            title: '最新价',
            width: 150,
            dataIndex: 'current_price',
            key: 'current_price',
        }, {
            title: '涨跌额',
            width: 100,
            dataIndex: 'change_number',
            key: 'change_number',
        }, {
            title: '涨跌幅',
            width: 150,
            dataIndex: 'change_ratio',
            key: 'change_ratio',
            render: text => <Statistic value={text} valueStyle={{fontSize:'14px'}} suffix="%"/>
        }, {
            title: '买入',
            width: 100,
            dataIndex: 'buy',
            key: 'buy',
        }, {
            title: '卖出',
            width: 100,
            dataIndex: 'sell',
            key: 'sell',
        }, {
            title: '今开',
            width: 100,
            dataIndex: 'begin_price',
            key: 'begin_price',
        },{
            title: '昨收',
            width: 100,
            dataIndex: 'last_end_price',
            key: 'last_end_price',
        }, {
            title: '最高',
            width: 100,
            dataIndex: 'highest_price',
            key: 'highest_price',
        }, {
            title: '最低',
            width: 100,
            dataIndex: 'lowest_price',
            key: 'lowest_price',
        }, {
            title: '成交量/手',
            width: 150,
            dataIndex: 'trade_number',
            key: 'trade_number',
            render: text => <Statistic value={text} valueStyle={{fontSize:'14px'}} />
        }, {
            title: '成交额/万',
            width: 150,
            dataIndex: 'trade_money',
            key: 'trade_money',
            render: text => <Statistic value={text} valueStyle={{fontSize:'14px'}} />
        },{
            title: '52周最低',
            width: 100,
            dataIndex: 'week_52_low',
            key: 'week_52_low',
        },{
            title: '52周最高',
            width: 100,
            dataIndex: 'week_52_high',
            key: 'week_52_high',
        },{
            title: '年初至今',
            width: 100,
            dataIndex: 'current_year_percent',
            key: 'current_year_percent',
            render: text => <Statistic value={text} valueStyle={{fontSize:'14px'}} suffix="%"/>
        },{
            title: '换手率',
            width: 100,
            dataIndex: 'turnover_rate',
            key: 'turnover_rate',
            render: text => <Statistic value={text} valueStyle={{fontSize:'14px'}} suffix="%"/>
        },{
            title: '市盈率',
            width: 100,
            dataIndex: 'pe_ttm',
            key: 'pe_ttm',
        },{
            title: '股息率',
            width: 100,
            dataIndex: 'dividend_yield',
            key: 'dividend_yield',
            render: text => <Statistic value={text} valueStyle={{fontSize:'14px'}} suffix="%"/>
        },{
            title: '市值（元）',
            width: 200,
            dataIndex: 'market_capital',
            key: 'market_capital',
            render: text => <Statistic value={text} valueStyle={{fontSize:'14px'}} />
        }];

        return (
            <div>
                <div>
                    <Select defaultValue="" value={this.state.S_dataSource.type} style={{ width: 120, marginBottom: '15px',marginRight: '10px'}} onChange={this.handleTypeChange}>
                        <Option value="0" key="0">负收益</Option>
                        <Option value="1" key="1">0 ~ 5</Option>
                        <Option value="2" key="2">5 ~ 10</Option>
                    </Select>
                    <Select defaultValue="" value={this.state.S_dataSource.exchange} style={{ width: 120, marginBottom: '15px' }} onChange={this.handleSelectChange}>
                        <Option value="sh_a" key="sh_a">沪A</Option>
                        <Option value="sh_b" key="sh_b">沪B</Option>
                        <Option value="sz_a" key="sz_a">深A</Option>
                        <Option value="sz_b" key="sz_b">深B</Option>
                    </Select>
                    <Button type="primary" icon="search" id='btn' onClick={this.handleBtnClick}>查看</Button>
                </div>
                <div>
                    <Table
                        columns={columns}
                        dataSource={this.state.S_dataSource.tableData}
                        pagination={{pageSize: 5}}
                        bordered
                        scroll={{ x: 2350}} />
                </div>
            </div>
        )
    }

    handleStoreChange(){
        this.setState(store.getState());
    }

    handleTypeChange(e){
        this.setState({
            S_dataSource:{
                type: e,
                exchange: this.state.S_dataSource.exchange,
                tableData: this.state.S_dataSource.tableData
            }
        })
        console.log(this.state.S_dataSource.type)
    }

    handleSelectChange(e){
        this.setState({
            S_dataSource:{
                type: this.state.S_dataSource.type,
                exchange: e,
                tableData: this.state.S_dataSource.tableData
            }
        })
        console.log(this.state.S_dataSource.exchange)
    }

    handleBtnClick(){
        let selected = this.state.S_dataSource.exchange;
        let type = this.state.S_dataSource.type;
        const action = getScreenTableData(type, selected);
        store.dispatch(action);
    }
}

export default Screening;
