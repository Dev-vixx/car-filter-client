import { createStore } from 'redux';

// ## Shared reducer between client and server
import reducer from '../../redux';

const configureStore = () => {
  const store = createStore(reducer);

  return store;
};

const storeMiddleware = () => (req, res, next) => {
  const store = configureStore();
  req.store = store;
  next();
};


export default storeMiddleware;