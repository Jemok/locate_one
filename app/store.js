import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

export default configureStore = (onComplete) => {
  const store = autoRehydrate()(createStoreWithMiddleware)(rootReducer);

  persistStore(store, { storage: AsyncStorage }, onComplete);

  if (module.hot) {
     module.hot.accept(() => {
         const nextRootReducer = require('./reducers').default;
         store.replaceReducer(nextRootReducer);
     });
 }

  return store;
};
