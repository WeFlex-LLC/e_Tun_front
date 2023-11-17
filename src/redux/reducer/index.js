import {combineReducers} from 'redux';
import theme from './theme';
import profile from './profile';
import UserInfo from './UserInfo';

const rootReducer = combineReducers({
  theme,
  profile,
  UserInfo
});

export default rootReducer;
