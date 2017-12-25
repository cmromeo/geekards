import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default function configureStore() {
  let store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}