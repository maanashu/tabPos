import React, { useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ScreenWrapper } from '@/components';
import { Header } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { Image } from 'react-native';
import { Images } from '@mPOS/assets';
import styles from './Faq.styles';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { getFaqList } from '@/actions/SupportActions';
import { getSupportData } from '@/selectors/SupportSelector';

export function Faq() {
  const dispatch = useDispatch();
  const supportData = useSelector(getSupportData);

  useEffect(() => {
    dispatch(getFaqList());
  }, []);

  const navigationHandler = (item) => {
    commonNavigate(MPOS_NAVIGATION.faqAnswers, { data: item });
  };

  const renderdataItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigationHandler(item)}>
          <View style={{ flex: 1 }}>
            <Text style={styles.questionText}>{item?.question}</Text>
          </View>
          <View>
            <Image source={Images.rightArrow} style={styles.rightIconStyle} />
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.help?.howCan} />
      <View style={{ paddingHorizontal: ms(20) }}>
        <FlatList
          data={supportData?.faq || []}
          renderItem={renderdataItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        />
      </View>
    </ScreenWrapper>
  );
}
