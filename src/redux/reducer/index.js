import {combineReducers} from 'redux';
import theme from './theme';
import profile from './profile';
import UserInfo from './UserInfo';
import FilterMostPopular from './FilterMostPopular';


const rootReducer = combineReducers({
  theme,
  profile,
  UserInfo,
  FilterMostPopular
});

export default rootReducer;
