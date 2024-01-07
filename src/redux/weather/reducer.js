import * as types from "./types";

const initialState = {
  loading: false,
  errors: null,
  data: null,
};

export const weatherReducer = (state = initialState, action) => {
  const response = action.response;
  switch (action.type) {
    case types.FETCH_WEATHER_REQUEST:
      return { ...state, loading: true };

    case types.FETCH_WEATHER_SUCCESS:
      return { ...state, loading: false, data: response.data };
    case types.FETCH_WEATHER_FAILURE:
      return { ...state, loading: false, errors: action.error };
    default:
      return state;
  }
};
