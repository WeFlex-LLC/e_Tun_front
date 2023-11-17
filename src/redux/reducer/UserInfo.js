import {CHANGE_USER_INFO_NAME} from '../types';

const INITIAL_STATE = {
  name: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_USER_INFO_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
}
