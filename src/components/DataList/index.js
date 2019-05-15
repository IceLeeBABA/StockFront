import React, { Component } from 'react';
import { List, Card } from 'antd';

const data = [
    {
        title: '代码',
        content: 'sh603077'
    },
    {
        title: '名称',
        content: '和邦生物'
    },
    {
        title: '最新价',
        content: '1.97'
    },
];

class DataList extends Component{
    render() {
        return (
            <div style={{width: '200px'}}>
                <List
                    itemLayout="vertical"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a>{item.title}</a>}
                                description={<a>{item.content}</a>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default DataList;
