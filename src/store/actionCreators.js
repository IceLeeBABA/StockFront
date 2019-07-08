import axios from 'axios';
import {
    UPDATE_TABLE_DATA,
    UPDATE_COMMENTS_DATA,
    UPDATE_K_DATA,
    UPDATE_K_CODE,
    UPDATE_EXCHANGE_DATA,
    UPDATE_SCREEN_TABLE_DATA
} from './actionTypes';


const BACKEND_ADDR = 'http://123.207.12.156:5000';

const updateTableAction = (value) => ({
    type: UPDATE_TABLE_DATA,
    value
});

const updateCommentsAction = (value) => ({
    type: UPDATE_COMMENTS_DATA,
    value
});

const updateKDataAction = (value) => ({
    type: UPDATE_K_DATA,
    value
});

export const updateKCodeAction = (value) => ({
    type: UPDATE_K_CODE,
    value
});

const updateScreenTableAction = (value) => ({
    type: UPDATE_SCREEN_TABLE_DATA,
    value
});

export const updateExchangeAction = (value) => ({
    type: UPDATE_EXCHANGE_DATA,
    value
});

export const getTableData = (exchange, page, number) => {
    return (dispatch) => {
        axios.get('http://123.207.12.156:5000/list', {
            params: {
                exchange: exchange,
                page: page,
                number: number
            },
        },)
            .then((res) => {
                const tableData = res.data;
                const currentPage = page;
                const loading = false;
                const dataSource = {
                    tableData: tableData,
                    currentPage : page,
                    loading: loading,
                };
                console.log("get tabledata");
                console.log(tableData.data);
                const action = updateTableAction(dataSource);
                dispatch(action);
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const getScreenTableData = (type, exchange) => {
    return (dispatch) => {
        axios.get('http://123.207.12.156:5000/true_profits', {
            params: {
                class: type,
                exchange: exchange
            },
        },)
            .then((res) => {
                const tableData = res.data;
                const S_dataSource = {
                    type: type,
                    exchange: exchange,
                    tableData: tableData,
                };
                console.log("get screen tabledata");
                const action = updateScreenTableAction(S_dataSource);
                dispatch(action);
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const getCommentsData = (code) => {
    return (dispatch) => {
        axios.get('http://123.207.12.156:5000/comment', {params: {code: code}})
            .then((res) => {
                const commentsData = res.data;
                console.log('get comments' + commentsData);
                const action = updateCommentsAction(commentsData);
                dispatch(action);
            })
    }
};

export const getKData = (code, begin, end) => {
    if (code === undefined){
        code = '000001'
    }

    return (dispatch) => {
        axios.all([
            axios.get(BACKEND_ADDR + '/history', {params: {code: code, begin: begin, end: end}}),
            axios.get(BACKEND_ADDR + '/prediction', {params: {code: code}})
        ]).then(axios.spread((historyRes, predictionRes) => {
            let historyData = historyRes.data;
            let predictionData = predictionRes.data;

            let dates = [];
            let prices = [];
            for (let item of historyData){
                dates.push(item.date);
                prices.push([item.begin_price, item.end_price, item.highest_price, item.lowest_price]);
            }

            // let predict = [predictionData[0].begin_price, predictionData[0].end_price,
            //     predictionData[0].highest_price, predictionData[0].lowest_price];
            let predict = predictionData[0];

            const candlestick = {
                dates: dates,
                prices: prices,
                predict: predict
            };
            const action = updateKDataAction(candlestick);
            dispatch(action);
        }));
    }
};

export const getKCode = (code) => {
    return (dispatch) => {
        const action = updateKCodeAction(code);
        dispatch(action);
    }
};
