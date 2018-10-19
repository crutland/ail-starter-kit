import createNamespace from "../createNamespace";
import { createStandardAction, ActionType, getType } from "typesafe-actions";
import { Reducer } from "redux";
import { ThemeOptions } from "../../theme";

const ns = createNamespace("layout");

export type DrawerOptions = "open" | "closed";

export interface LayoutState {
  theme: ThemeOptions;
  drawer: DrawerOptions;
}

export const defaultState: LayoutState = {
  theme: "light",
  drawer: "closed"
}

export const LayoutActions = {
  setTheme: createStandardAction(ns`set_theme`)<ThemeOptions>(),
  setDrawerState: createStandardAction(ns`set_drawer_state`)<DrawerOptions>()
};

export type LayoutActionsType = ActionType<typeof LayoutActions>;

export const reducer: Reducer<LayoutState> = (state = defaultState, action: LayoutActionsType) => {
  switch (action.type) {

    case getType(LayoutActions.setTheme):
      return { ...state, theme: action.payload as ThemeOptions };

    case getType(LayoutActions.setDrawerState):
      return { ...state, drawer: action.payload as DrawerOptions };

    default:
      return state;
  }
}

export default reducer;

export * from "./saga";