import {CHANGE_USER_INFO_NAME} from '../types';

export const changeUserInfoNameAction = type => {
  return dispatch => {
    dispatch({
      type: CHANGE_USER_INFO_NAME,
      payload: type,
    });
  };
};
