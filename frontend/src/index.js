import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import App from "./components/App";

// Redux
import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

// import(/* webpackChunkName : 'app' */ './Components/App')
//     .then(({default: App}) =>
//         render(<App/>, document.getElementById('root'))
//     );

const ENVIRONMENT = {
  DEV: process.env.ENV === "development",
};

// # 01
/**
 * A reducer is a function that operates on the state object and then returns it
 * Please note that this function is also called during initialization of store - so any code
 * without if stmt will be executed multiple times - internal operation of store !
 * @param state - this is a misleading name - here it is not the full state but just corresponding key value
 * @param action
 * @returns {Array} - every return value is assigned to the corresponding key in allReducers
 */
import rootSaga from "./sagas/rootSaga";
import models from "./store";

let reds = {};
for (let i = 0; i < Object.keys(models).length; i++) {
  const model = models[Object.keys(models)[i]];
  reds[model.name] = model.reducers;
}

const allReducers = combineReducers(Object.assign({}, {}, reds));

// # 02
/**
 * Sagas to connect to external world - async api calls
 */
const sagaMiddleware = createSagaMiddleware();

// # 03
/**
 * Store enhancers, devToolsExtensions
 */
// Fixing error : TypeError: t is undefined
// Only chrome can handle the redux dev tool
// Redux compose cannot handle a null or undefined middleware
const allStoreEnhancers = ENVIRONMENT.DEV
  ? compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  : applyMiddleware(sagaMiddleware);

// # 04
/**
 * Create store with allReducers which are all called one by one when there is dispatch
 * Second param is initial state of store
 * Last param is for redux debug in chrome extension
 * @type {Store<S&StateExt>&Ext}
 */
const store = createStore(allReducers, {}, allStoreEnhancers);
sagaMiddleware.run(rootSaga);

// # 05
/**
 * You can see the status of store - but only data and not reducers
 */
console.log("Store state :", store.getState());

// # 06
/**
 * Action is an object with format of type and payload
 * @type {{type: string, payload: {newState: string}}}
 * Dispatch action to store
 */

/*
* no need here moved to App component for unified standard place for all these actions
store.dispatch(eventStatsUpdateAction());
let statsUpdate = localStorage.getItem('statsUpdate');
clearInterval(statsUpdate);
statsUpdate = setInterval(() => store.dispatch(eventStatsUpdateAction()), 6000);
localStorage.setItem('statsUpdate', statsUpdate);
*/

// Read news
if (true || ENVIRONMENT.DEV) {
  // store.dispatch(userReadAction());
  // store.dispatch(user.actions.read({}));
  /*store.dispatch(show.actions.read_success({
        a: 5455,
        b: 9909
    }));*/

  for (let i = 0; i < Object.keys(models).length; i++) {
    const model = models[Object.keys(models)[i]];
    // console.log("Model : ", model.name);
    store.dispatch(model.actions.read({}));
  }
}

// console.log("Before subscribe in index");
/**
 * Avoid setting up multiple interval objects in background
 * @type {string | null}
 */
if (ENVIRONMENT.DEV) {
  store.subscribe(() => {
    // console.log("subscribed store in index", store.getState());
  });
}

/**
 * Render the main App Component
 */

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
