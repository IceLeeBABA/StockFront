import { UPDATE_TABLE_DATA, UPDATE_COMMENTS_DATA, UPDATE_EXCHANGE_DATA, UPDATE_K_DATA } from './actionTypes';

const defaultState = {
    comments: [],
    dataSource: {
        tableData: [],
        currentPage : 1,
        loading: false,
    },
    exchange: 'sh_a',
    candlestick: [[], [], []],
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
        return newState;
    }

    return state;
}
