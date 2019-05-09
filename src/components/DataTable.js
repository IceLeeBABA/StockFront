import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

class DataTable extends Component{

    constructor(props){
        super(props);
        this.state = {

        };

    }

    render() {
        const dataSource = [{
            key: '1',
            code: 'sh603077',
            name: '和邦生物',
            latest_price: '1.97',
            rise_fall: '+1.08',
            quote_change: '+10.056%',
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
            quote_change: '+10.056%',
            buy: '1.97',
            sell: '0.00',
            yesterday_get: '1.79',
            today_open: '1.78',
            highest: '1.97',
            lowest: '1.77',
            volume: '1752020',
            turnover: '33671.09'
        }];

        const columns = [{
            title: '代码',
            dataIndex: 'code',
            key: 'code',
        },{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },{
            title: '最新价',
            dataIndex: 'latest_price',
            key: 'latest_price',
        }, {
            title: '涨跌额',
            dataIndex: 'rise_fall',
            key: 'rise_fall',
        }, {
            title: '涨跌幅',
            dataIndex: 'quote_change',
            key: 'quote_change',
        }, {
            title: '买入',
            dataIndex: 'buy',
            key: 'buy',
        }, {
            title: '卖出',
            dataIndex: 'sell',
            key: 'sell',
        }, {
            title: '昨收',
            dataIndex: 'yesterday_get',
            key: 'yesterday_get',
        }, {
            title: '今开',
            dataIndex: 'today_open',
            key: 'today_open',
        }, {
            title: '最高',
            dataIndex: 'highest',
            key: 'highest',
        }, {
            title: '最低',
            dataIndex: 'lowest',
            key: 'lowest',
        }, {
            title: '成交量/手',
            dataIndex: 'volume',
            key: 'volume',
        }, {
            title: '成交额/万',
            dataIndex: 'turnover',
            key: 'turnover',
        }];

        return(
            <div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}

export default DataTable;
