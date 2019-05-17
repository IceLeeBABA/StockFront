import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Statistic, Button } from 'antd';
import store from "../../store";
import {getTableData} from "../../store/actionCreators";

class DataTable extends Component{

    constructor(props){
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
        this.getPrePage = this.getPrePage.bind(this);
        this.state = {
            dataSource: {
                tableData: [],
                currentPage : 1,
                loading: false,
            },
            pageSize: 5,
        };
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

        return(
            <div>
                <Table
                    columns={columns}
                    dataSource={this.state.dataSource.tableData}
                    pagination={false}
                    loading={this.state.dataSource.loading}
                    bordered
                    scroll={{ x: 2350}} />

                    <Button onClick={this.getPrePage} style={{marginLeft: '80%',marginRight: '15px', marginTop: '5px'}}>上一页</Button>
                <Button onClick={this.getNextPage} style={{marginRight:'20px', marginTop: '5px'}}>下一页</Button>
            </div>


        )
    }

    handleStoreChange(){
        this.setState(store.getState());
    }

    getNextPage(){
        let currentPage = this.state.dataSource.currentPage;
        let exchange = this.state.exchange;
        console.log(exchange);
        this.setState({
            loading: true,
        });
        const action = getTableData(exchange, currentPage+1, 5);
        store.dispatch(action);
    }

    getPrePage(){
        let currentPage = this.state.dataSource.currentPage;
        if (currentPage > 1){
            let exchange = this.state.exchange;
            console.log(exchange);
            this.setState({
                loading: true,
            });
            const action = getTableData(exchange, currentPage-1, 5);
            store.dispatch(action);
        }

    }
}

export default DataTable;
