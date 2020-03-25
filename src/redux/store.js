import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

const initial = {
    name: '',
    weight: '',
    img: ''
}

const bearReducer = (bears = [], action) => {

    switch (action.type) {
        case 'GET_BEARS':
            return action.bears
        case 'ADD_BEARS':
            return [...bears, { id: bears.length, ...action.bear }]
        case 'DELETE_BEARS':
            return bears.filter(bear => +bear.id !== +action.id)
        case 'UPDATE_BEARS':
            return bears.map(bear => {
                if (+bear.id === +action.id)
                    return action.bear
                else
                    return bear
            })
    }

    return bears
}

const formReducer = (data = initial, action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return { ...data, name: action.name }
        case 'CHANGE_WEIGHT':
            return { ...data, weight: action.weight }
        case 'CHANGE_IMG':
            return { ...data, img: action.img }
        case 'INITIAL':
            return {
                name: '',
                weight: '',
                img: ''
            }
        case 'CHANGE':
            console.log(action)
            return {
                ...data,
                [action.key]: action.value
            }

    }

    return data
}



const rootReducer = combineReducers({
    bears: bearReducer,
    form: formReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))