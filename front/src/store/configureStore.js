
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import PriceReducer from '../components/LandingPage.reducer';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

export default () => {
  const store = createStoreWithMiddleware(
    combineReducers({
      price: PriceReducer
    })
  );

  return store;
};
