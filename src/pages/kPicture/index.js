import React, { Component } from 'react';
import store from "../../store";
import echarts from 'echarts';


class KPicture extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.state = {
            dates: [
                '2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27'
            ],
            prices: [
                [20, 30, 10, 35],
                [40, 35, 30, 55],
                [33, 38, 33, 40],
                [40, 40, 32, 42]
            ],
            predict: [20, 30, 10, 35]
        };
        store.subscribe(this.handleStoreChange);
    }

    componentDidMount() {
        this.initCharts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.initCharts();
    }

    handleStoreChange(){
        this.setState(store.getState());
    }

    initCharts() {
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
                data: this.state.dates
            },
            yAxis: {},
            series: [{
                name: '股票价格',
                type: 'candlestick',
                data: this.state.prices
            }]
        };
        kChart.setOption(option);
    }

    render() {
        return (
            <div>
                <div ref="candlestick_chart" style={{width:"100%", height:"400px"}}>
                </div>

                <h3>明日股价预测</h3>
                <div>
                    <ol>
                        <li>开始价格：{this.state.predict[0]}</li>
                        <li>结束价格：{this.state.predict[1]}</li>
                        <li>最高价格：{this.state.predict[2]}</li>
                        <li>最低价格：{this.state.predict[3]}</li>
                    </ol>
                </div>
            </div>
        );
    }
}

export default KPicture;
