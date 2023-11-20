import {CHANGE_MOST_POPULAR_CATEGORY} from '../types';

const INITIAL_STATE = {
  categories: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_MOST_POPULAR_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
}
