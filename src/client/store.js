import { createStore } from 'redux';
//  Shared reducer between client and server
import reducer from '../redux';

const configureStore = () => {
  const preloadedState = window.PRELOADED_STATE;

  const store = createStore(
    reducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};

export default configureStore;