import axios from 'axios';
import {
    UPDATE_TABLE_DATA,
    UPDATE_COMMENTS_DATA,
    UPDATE_K_DATA,
    UPDATE_EXCHANGE_DATA,
    UPDATE_K_CODE
} from './actionTypes';
import {array} from "prop-types";


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

export const updateKCodeAction = (value) => ({
    type: UPDATE_K_CODE,
    value
});


const BACKEND_ADDR = 'http://localhost:5000';

export const getTableData = (exchange, page, number) => {
    return (dispatch) => {
        axios.get(BACKEND_ADDR + '/list', {
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
                //console.log("get tabledata");
                //console.log(tableData.data);
                const action = updateTableAction(dataSource);
                dispatch(action);
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const getCommentsData = (code) => {
    return (dispatch) => {
        axios.get(BACKEND_ADDR + '/comment', {params: {code: code}})
            .then((res) => {
                const commentsData = res.data;
                //console.log('get comments' + commentsData);
                const action = updateCommentsAction(commentsData);
                dispatch(action);
            })
    }
};

export const getKData = (code, begin, end) => {
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

export const getKCode = (code) => {
    return (dispatch) => {
        const action = updateKCodeAction(code);
        dispatch(action);
    }
};

