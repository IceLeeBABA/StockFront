import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Select } from 'antd';

const Option = Select.Option;
const sourceData = ['腾讯财经网', '雪球', '金融界'];
const typeData = ['沪深', '港股'];
const detailData = {
    沪深: ['沪A', '沪B', '深A', '深B', '警示板'],
    港股: ['正股', 'A+H', '窝轮', 'ADR']
}

class CheckGroup extends Component{
    constructor(props){
        super(props);
        this.state = {
            source: sourceData[0],
            types: detailData[typeData[0]],
            secondType: detailData[typeData[0]][0],
        }
    }

    handleTypeChange = (value) => {
        this.setState({
            types: detailData[value],
            secondType: detailData[value][0],
        });
    }

    onSecondTypeChange = (value) => {
        this.setState({
            secondType: value,
        });
    }

    onSourceChange = (value) => {
        this.setState({
            source: value,
        });
    }

    render() {
        const { types } = this.state;

        return(
            <div>
                <Select
                    style={{ width: 120 }}
                    value={this.state.source}
                    onChange={this.onSourceChange}
                >
                    {sourceData.map(source => <Option key={source}>{source}</Option>)}
                </Select>
                <Select
                    defaultValue={typeData[0]}
                    style={{ width: 120 }}
                    onChange={this.handleTypeChange}
                >
                    {typeData.map(type => <Option key={type}>{type}</Option>)}
                </Select>
                <Select
                    style={{ width: 120 }}
                    value={this.state.secondType}
                    onChange={this.onSecondTypeChange}
                >
                    {types.map(detail => <Option key={detail}>{detail}</Option>)}
                </Select>
                <Button type="primary" icon="search">查找</Button>
            </div>
        )
    }
}

export default CheckGroup;
