import React, { Component } from 'react';
import echarts from 'echarts';
import { DatePicker } from 'antd';
import moment from 'moment';
import {getKData} from "../../store/actionCreators";
import store from "../../store";


const { RangePicker } = DatePicker;

let dirty = true;


class KPicture extends Component {
    range = [moment().subtract(6, 'months'), moment()]; //default value

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
        dirty = true;

        let code;
        if (this.state === undefined || this.state.inputValue === undefined || this.state.inputValue === ''){
            code = '000001';
        } else {
            code = this.state.inputValue;
        }

        const action = getKData(code, dateString[0], dateString[1]);
        store.dispatch(action);

        try {
            this.initChart();
            this.range[0] = moment(dateString[0]);
            this.range[1] = moment(dateString[1]);

            dirty = false;
        } catch (e) {}
    }

    componentDidMount() {
        //just to visualize the empty chart
        this.onChange('', [this.range[0].format("YYYY-MM-DD"), this.range[1].format("YYYY-MM-DD")]);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!dirty){
            return;
        }
        this.componentDidMount();
    }

    initChart(){
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

    render() {
        let prediction = Math.floor(this.state.candlestick.predict * 100) / 100;

        return (
            <div>
                <h3>股票代码：{this.state.inputValue === undefined || this.state.inputValue === '' ? '000001' : this.state.inputValue}</h3>
                <RangePicker ref="range_picker" onChange={this.onChange}>
                </RangePicker>
                <br/><br/>

                <div ref="candlestick_chart" style={{width:"90%", height:"360%"}}>
                </div>

                <h3>股价预测</h3>
                <div>
                    今日收盘价：{prediction} （元）
                </div>
            </div>
        );
    }
}


export default KPicture;