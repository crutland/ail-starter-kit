import { createStore, compose, Store, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { defaultState as layoutDefaultState, LayoutState, LayoutActionsType } from "./layout";
import { getSavedTheme } from "../theme";
import rootReducer from "./rootReducer";
import rootSaga from './rootSaga';

export interface ApplicationState {
  layout: LayoutState
};

const defaultState: ApplicationState = {
  layout: layoutDefaultState
};

export type ApplicationActionsType = LayoutActionsType;

export function configureStore(): Store<ApplicationState, ApplicationActionsType> {
  const savedTheme = getSavedTheme();
  const state = defaultState;
  state.layout.theme = savedTheme;
  const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));
  const store = createStore(rootReducer, state, enhancers);
  sagaMiddleware.run(rootSaga);
  return store as Store<ApplicationState, ApplicationActionsType>;
}

