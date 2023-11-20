import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {useSelector} from 'react-redux';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import {Search_Dark, Search_Light} from '../../../assets/svgs';
import ProductShortDetail from '../../../components/homeComponent/ProductShortDetail';
import {styles} from '../../../themes';
import {StackNav} from '../../../navigation/NavigationKeys';
import HomeServiceComponent from '../../../components/HomeServiceComponent';
import { getAsyncStorageData } from '../../../utils/helpers';

export default function ProductCategory({navigation, route}) {
  const item = route?.params?.item;
  const title = route?.params?.title;
  const colors = useSelector(state => state.theme.theme);
  const language = useSelector(state => state?.profile?.language);
  
  const onPressDetail = async (itm) =>{
    
      const token = await getAsyncStorageData('ACCESS_TOKEN');
  
      try {
        const response = await fetch(
          `https://etunbackend-production.up.railway.app/api/services/service/${itm}`,
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
        if(res){
          navigation.navigate(StackNav.ProductDetail, {item: res});
       
        }
      } catch (error) {
        console.error(error);
      }
}
  const renderItem = ({item, index}) => {
    return (
      <HomeServiceComponent
        item={item}
        index={index}
        onPress={() => onPressDetail(item.id)}
      />
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={language  == "Armenian" ? title.name_am : language  == "Russian" ? title.name_ru : title.name_en} />
      <View style={localStyles.root}>
        <FlashList
          data={item}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={10}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
    ...styles.flex,
  },
});
