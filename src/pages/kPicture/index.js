import React, { Component } from 'react';
import store from "../../store";
import echarts from 'echarts';


class KPicture extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        let dataList = this.fetchData();
        this.state.candlestick = {
            dates: dataList[0],
            prices: dataList[1],
            predict: dataList[2]
        };
        store.subscribe(this.handleStoreChange);
    }

    handleStoreChange(){
        this.setState(store.getState());
    }

    fetchData() {
        let rawData = [
            ['2017-10-24', 20, 30, 10, 35],
            ['2017-10-25', 40, 35, 30, 55],
            ['2017-10-26', 33, 38, 33, 40],
            ['2017-10-27', 40, 40, 32, 42]
        ];
        let predict = [20, 30, 10, 35];

        let dates = [];
        let prices = [];
        for (let item of rawData){
            dates.push(item[0]);
            prices.push(item.slice(1, 5));
        }
        return [dates, prices, predict];
    }

    componentDidMount() {
        this.initCharts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.initCharts();
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
        return (
            <div>
                <div ref="candlestick_chart" style={{width:"90%", height:"500%"}}>
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
