import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose , combineReducers} from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from'./store/reducers/auth';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { watchAuth,watchBurgerBuilder,watchOrder } from './store/sagas';

const composeEnhancers=process.env.NODE_ENV==='development'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null||compose;

const rootReducer=combineReducers({
    burgerBuilder:burgerBuilderReducer,
    order:orderReducer,
    auth:authReducer
});

const sagaMiddlerware = createSagaMiddleware();

const store=createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(thunk,sagaMiddlerware)
    )); 

sagaMiddlerware.run(watchAuth);
sagaMiddlerware.run(watchBurgerBuilder);
sagaMiddlerware.run(watchOrder);

const app = (
    <Provider store={store}>
    <BrowserRouter >
        <App />
    </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
