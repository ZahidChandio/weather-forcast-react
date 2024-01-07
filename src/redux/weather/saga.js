import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";

export function* fetchWeather(payload) {
  try {
    const response = yield call(() =>
      http.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${payload.query}&units=imperial&appid=a3a022a3ada4a6f27abeb7085072fced`
      )
    );
    console.log(response);
    yield put({ type: types.FETCH_WEATHER_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.FETCH_WEATHER_FAILURE, error });
  }
}

function* weatherSaga() {
  yield takeLatest(types.FETCH_WEATHER_REQUEST, fetchWeather);
}

export default weatherSaga;
