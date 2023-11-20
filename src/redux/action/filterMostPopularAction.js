import {CHANGE_MOST_POPULAR_CATEGORY} from '../types';

export const changeMostPopularCategory = type => {
  return dispatch => {
    dispatch({
      type: CHANGE_MOST_POPULAR_CATEGORY,
      payload: type,
    });
  };
};
