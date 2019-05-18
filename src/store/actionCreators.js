import axios from 'axios';
import {UPDATE_TABLE_DATA, UPDATE_COMMENTS_DATA, UPDATE_K_DATA, UPDATE_EXCHANGE_DATA} from './actionTypes';


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
                    tableData: tableData.data,
                    currentPage : page,
                    loading: loading,
                };
                const action = updateTableAction(dataSource);
                console.log(tableData.data);
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
                let commentsData = res.data;
                console.log(commentsData.data);
                const action = updateCommentsAction(commentsData.data);
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

            let predict = [predictionData[0].begin_price, predictionData[0].end_price,
                predictionData[0].highest_price, predictionData[0].lowest_price];
            const action = updateKDataAction({
                dates: dates,
                prices: prices,
                predict: predict
            });
            dispatch(action)
        }));
    }
};

