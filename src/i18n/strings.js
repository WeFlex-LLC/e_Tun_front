import LocalizedStrings from 'react-native-localization';
import enI18n from './en';
import ruI18n from './ru';
import amI18n from './am'


export default strings = new LocalizedStrings({
  Armenian: amI18n,
  English: enI18n,
  Russian: ruI18n,
});
