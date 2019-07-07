import React, { Component } from 'react';
import {Button, List, Select, Card} from "antd";
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

    componentWillMount() {
        this.handleBtnClick();
    }

    render() {
        const gridStyle = {
            width: '100%',
            textAlign: 'center',
            marginBottom: '5px',
            fontSize: '25px',
        };
        return (
            <div>
                <div>
                    <Select defaultValue="&lt; 0" value={this.state.S_dataSource.type} style={{ width: 120, marginRight: '10px', marginBottom: '10px'}} onChange={this.handleTypeChange}>
                        <Option value="0" key="0"> &lt; 0</Option>
                        <Option value="1" key="1">0 ~ 5</Option>
                        <Option value="2" key="2">5 ~ 10</Option>
                    </Select>
                    <Select defaultValue="" value={this.state.S_dataSource.exchange} style={{ width: 120 }} onChange={this.handleSelectChange}>
                        <Option value="sh_a" key="sh_a">沪A</Option>
                        <Option value="sh_b" key="sh_b">沪B</Option>
                        <Option value="sz_a" key="sz_a">深A</Option>
                        <Option value="sz_b" key="sz_b">深B</Option>
                    </Select>
                    <Button type="primary" icon="search" id='btn' onClick={this.handleBtnClick}>查看</Button>
                </div>
                <div>
                    <Card title="股票代码">
                        <List
                            grid={{
                                gutter: 16,
                                column: 6
                            }}
                            pagination={{
                                pageSize: 18,
                            }}
                            dataSource={this.state.S_dataSource.tableData}
                            renderItem={item => (
                                <List.Item>
                                    {/*<Card title="代码" style={{fontSize: '25px',color: '#696969'}}>{item}</Card>*/}
                                    <Card.Grid style={gridStyle}>{item}</Card.Grid>
                                </List.Item>
                            )}
                        />
                    </Card>

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
