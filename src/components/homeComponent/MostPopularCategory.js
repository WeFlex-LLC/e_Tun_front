import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {useDispatch, useSelector} from 'react-redux';

// Custom Imports
import CText from '../common/CText';
import {mostPopularData} from '../../api/constant';
import {styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import strings from '../../i18n/strings';
import images from '../../assets/images';
import { changeMostPopularCategory } from '../../redux/action/filterMostPopularAction';
import { getAsyncStorageData } from '../../utils/helpers';


export default function MostPopularCategory(props) {
  const {chipsData, isStar = false} = props;
  const dispatch = useDispatch()
  const colors = useSelector(state => state.theme.theme);
  const [extraData, setExtraData] = useState(true);
  const SelectedCategories = useSelector(state => state.FilterMostPopular.categories)

  const [isLoading, setLoading] = useState(true);
  const [Categoriesdata, setCategoriesdata] = useState();

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
      if(res){
        setCategoriesdata(res);
        setSelectedChips(res[0].name_am)
        dispatch(changeMostPopularCategory(res[0].id))
        setExtraData(!extraData)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [selectedChips, setSelectedChips] = useState();


  useEffect(() => {
    setExtraData(!extraData);
  }, [SelectedCategories,selectedChips]);


  const onPressChips = (value,id) => {
    if (value) {
      setSelectedChips(value);
      dispatch(changeMostPopularCategory(id))
    } 
  };



  useEffect(() => {
    getCategories();
  }, []);

  
  const renderChips = ({item}) => {

    return (
      <TouchableOpacity
        onPress={() => onPressChips(item?.name_am,item.id)}
        style={[
          localStyles.chipsContainer,
          {borderColor: colors.primary},
          {
            backgroundColor: selectedChips == item?.name_am
              ? colors.primary
              : colors.transparent,
          },
        ]}>
        
        <CText
          type={'S16'}
          color={selectedChips == item?.name_am ? colors.white : colors.primary}>
          {item?.name_am}
        </CText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.pb15}>
      <FlashList
        data={Categoriesdata ? Categoriesdata : mostPopularData}
        renderItem={renderChips}
        extraData={extraData}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={10}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  chipsContainer: {
    ...styles.ph20,
    ...styles.pv10,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(25),
    ...styles.mh5,
    ...styles.rowCenter,
  },
  starStyle: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: 'contain',
    ...styles.mr10,
  },
});
