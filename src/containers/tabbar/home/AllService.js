import {StyleSheet, TouchableOpacity,View} from 'react-native';
import React, { useState,useEffect } from 'react';
import {FlashList} from '@shopify/flash-list';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import {allServicesData} from '../../../api/constant';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import {useSelector} from 'react-redux';
import {StackNav} from '../../../navigation/NavigationKeys';
import { getAsyncStorageData } from '../../../utils/helpers';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from '../../../common/constants';


export default function AllService({navigation,route}) {
  const colors = useSelector(state => state.theme.theme);
  const language = useSelector(state => state?.profile?.language);
  
  const [isLoading, setLoading] = useState(true);
  const [Categoriesdata, setCategoriesdata] = useState([]);

  const getCategories = async () => {
    const token = await getAsyncStorageData('ACCESS_TOKEN');


    
    try {
      const response = await fetch(
        'https://etunbackend-production.up.railway.app/api/services/categories',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await response.json();
      setCategoriesdata(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const onPressItem = item => {
    navigation.navigate(StackNav.ProductCategory, {item: item});
  };

  const renderCategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onPressItem(item)}
        style={localStyles.categoryRoot}>
        <View style={localStyles.iconContainer}>
          <MaterialIcons name={item.icon} size={30} color={'#7210FF'} />
        </View>
        <CText
          type="b16"
          numberOfLines={1}
          align={'center'}
          color={colors.primaryTextColor}
          style={styles.mt10}>
          {language == 'Armenian'
            ? item.name_am
            : language == 'Russian'
            ? item.name_ru
            : item.name_en}
        </CText>
      </TouchableOpacity>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.allServices} />
      <FlashList
        data={Categoriesdata}
        extraData={language}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        estimatedItemSize={10}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ph20}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  categoryRoot: {
    width: '100%',
    ...styles.itemsCenter,
    ...styles.mv10,
  },
  iconStyle: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  iconContainer: {
    display: 'flex',
    ...styles.center,
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    // backgroundColor: commonColor.grayScale3,
    borderColor: '#7210FF',
    borderWidth: 1,
    ...styles.center,
    // backgroundColor: "none"
  },
  categoryRoot: {
    width: '100%',
    ...styles.itemsCenter,
    ...styles.mv15,
  },
});
