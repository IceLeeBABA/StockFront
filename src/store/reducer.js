import {
    UPDATE_TABLE_DATA,
    UPDATE_COMMENTS_DATA,
    UPDATE_EXCHANGE_DATA,
    UPDATE_K_DATA,
    UPDATE_K_CODE,
    UPDATE_SCREEN_TABLE_DATA
} from './actionTypes';

const defaultState = {
    comments: [],
    dataSource: {
        tableData: [],
        currentPage : 1,
        loading: false,

    },
    exchange: 'sh_a',
    S_dataSource:{
        type: 0,
        exchange: 'sh_a',
        tableData: [],
    },
    candlestick: {
        dates: [],
        prices: [],
        predict: ''
    },
    inputValue: ''
};

export default (state = defaultState, action) => {
    if (action.type === UPDATE_TABLE_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.dataSource = action.value;
        return newState;
    }

    if (action.type === UPDATE_COMMENTS_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.comments = action.value;
        return newState;
    }

    if (action.type === UPDATE_EXCHANGE_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.exchange = action.value;
        return newState;
    }

    if (action.type === UPDATE_K_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.candlestick = action.value;
        console.log("更新state")
        return newState;
    }

    if (action.type === UPDATE_SCREEN_TABLE_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.S_dataSource = action.value;
        return newState;
    }

    if (action.type === UPDATE_K_CODE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }

    return state;
}
