import React, { Component } from 'react';
import echarts from 'echarts';
import { DatePicker } from 'antd';
import moment from 'moment';
import {getKData} from "../../store/actionCreators";
import store from "../../store";


const { RangePicker } = DatePicker;


class KPicture extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);
    }

    handleStoreChange(){
        this.setState(store.getState());
    }

    onChange(date, dateString) {
        let code;
        if (this.state === undefined || this.state.inputValue === undefined){
            code = '000001';
        } else {
            code = this.state.inputValue;
        }

        const action = getKData(code, dateString[0], dateString[1]);
        store.dispatch(action);

        //initialize chart
        const kChart = echarts.init(this.refs.candlestick_chart);
        let option = {
            title: {
                text: '日K图',
            },
            tooltip: {},
            legend: {
                data:['股票价格']
            },
            xAxis: {
                data: this.state.candlestick.dates
            },
            yAxis: {},
            series: [{
                name: '股票价格',
                type: 'candlestick',
                data: this.state.candlestick.prices
            }]
        };
        kChart.setOption(option);
    }

    componentDidMount() {
        let picker = this.refs.range_picker;
        let range;
        if (picker.props.value === undefined){
            range = picker.props.defaultValue;
        } else {
            range = picker.props.value;
        }

        this.onChange('', [range[0].format("YYYY-MM-DD"), range[1].format("YYYY-MM-DD")]);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.componentDidMount();
    }

    render() {
        return (
            <div>
                <h3>股票代码：{this.state.inputValue === undefined || this.state.inputValue === '' ? '000001' : this.state.inputValue}</h3>
                <RangePicker ref="range_picker" onChange={this.onChange} defaultValue={[moment().subtract(1, 'years'), moment()]}>
                </RangePicker>
                <br/><br/>

                <div ref="candlestick_chart" style={{width:"90%", height:"360%"}}>
                </div>

                <h3>明日股价预测</h3>
                <div>
                    <ol>
                        <li>开始价格：{this.state.candlestick.predict[0]}</li>
                        <li>结束价格：{this.state.candlestick.predict[1]}</li>
                        <li>最高价格：{this.state.candlestick.predict[2]}</li>
                        <li>最低价格：{this.state.candlestick.predict[3]}</li>
                    </ol>
                </div>
            </div>
        );
    }
}


export default KPicture;
