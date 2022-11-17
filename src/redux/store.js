import {legacy_createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

 const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));


 export default store;