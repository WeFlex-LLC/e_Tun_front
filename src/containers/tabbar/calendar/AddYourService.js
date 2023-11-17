import CText from '../../../components/common/CText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import CButton from '../../../components/common/CButton';
import {StackNav} from '../../../navigation/NavigationKeys';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';
import {moderateScale} from '../../../common/constants';
import {styles} from '../../../themes';
import CDivider from '../../../components/common/CDivider';
import {FlashList} from '@shopify/flash-list';

export default function AddYourService({route,navigation}) {
  const color = useSelector(state => state.theme.theme);
  const colors = useSelector(state => state.theme.theme);
  const DATA = [
    {
      id: 1,
      icon: 'accessible',
      name: 'ՀէՑ',
    },
    {
      id: 1,
      icon: 'accessible-forward',
      name: 'Ջուր',
    },
    {
      id: 2,
      icon: 'airline-seat-flat',
      name: 'Յուքոմ',
    },
    {
      id: 3,
      icon: 'airline-seat-flat-angled',
      name: 'ԱՊՊԱ',
    },
    {
      id: 4,
      icon: 'airline-seat-legroom-normal',
      name: 'Լիֆտ',
    },
    {
      id: 5,

      icon: 'airline-seat-legroom-reduced',
      name: 'Ավտոտնակ',
    },
    
  ];
  const onPressAddYourService = (title) => navigation.navigate(StackNav.ChooseServiceCompany,{title:title})

  //   const RenderData = () => {
  //     return (
  //       <TouchableOpacity style={localStyles.IconsContainerStyle}>
  //         <MaterialIcons name="add-circle-outline" size={30} color={'black'} />
  //         <CText style={localStyles.iconTitle}>{'name'}</CText>
  //       </TouchableOpacity>
  //     );
  //   };

  return (
    <View
      style={[
        localStyles.root,
        {backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1},
      ]}>
      <CHeader
        title={'Add Service'}
        //   rightIcon={<RightIcon/>}
      />
      <CDivider style={styles.mv5} />

      <View style={localStyles.RootContainer}>
        {/* <FlashList
          data={DATA}
          renderItem={({item}) => <RenderData />}
          keyExtractor={(item, index) => index.toString()}
          
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={100}
        /> */}
        <View style={localStyles.dataContainer}>
          {DATA.map(({icon, name, id}) => {
            return (
              <>
                <TouchableOpacity
                  key={id}
                  style={localStyles.IconsContainerStyle}
                  onPress={() => onPressAddYourService(name)}
                  >
                    
                  <MaterialIcons name={icon} size={50} color={'black'} />
                  <CText
                    type="b16"
                    numberOfLines={1}
                    align={'center'}
                    color={colors.primaryTextColor}
                    style={styles.mt10}>
                    {name}
                  </CText>
                </TouchableOpacity>
              </>
            );
          })}
        </View>
        {/* <View style={styles.ph20}>
          <CButton
            title={strings.apply}
            type={'S16'}
            containerStyle={styles.mv10}
            //   onPress={onPressAdd}
          />
        </View> */}
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    // ...styles.mt10,
    // overflow: "scroll"
  },
  RootContainer: {
    ...styles.flex,
    // ...styles.mt10,
    // ...styles.p15,
  },

  IconsContainerStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '33%',
    ...styles.mv15
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
  },
  iconTitle: {
    fontSize: 12,
  },
});
