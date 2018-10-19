import { all } from "redux-saga/effects";
import layoutSaga from "./layout/saga";

export default function*() {
  yield all([
    layoutSaga()
  ])
}