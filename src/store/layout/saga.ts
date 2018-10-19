import { takeLatest } from "redux-saga/effects";
import { LayoutActions, LayoutActionsType } from "./";
import { getType } from "typesafe-actions";
import { saveTheme, ThemeOptions } from "src/theme";

function* watchSetTheme(action: LayoutActionsType) {
  const payload = action.payload as ThemeOptions;
  yield Promise.resolve(saveTheme(payload));
}

export default function* () {
  yield takeLatest(getType(LayoutActions.setTheme), watchSetTheme);
}