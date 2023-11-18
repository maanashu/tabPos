import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import styles from './TermsConditions.styles';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { COLORS } from '@/theme';
import { getSettings } from '@/actions/SettingAction';
import { TYPES } from '@/Types/SettingTypes';
import { getSetting } from '@/selectors/SettingSelector';
import RenderHtml from 'react-native-render-html';
import dayjs from 'dayjs';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';

const { width, height } = Dimensions.get('window');

export function TermsConditions() {
  const dispatch = useDispatch();
  const ref = useRef();
  const [policy, setPolicy] = useState();
  const snapPoints = ['97%'];

  const getSettingData = useSelector(getSetting);
  const policyArray = getSettingData?.getSetting?.user_policies;
  console.log('pocluasdasdasd', JSON.stringify(policyArray));
  useEffect(() => {
    dispatch(getSettings());
  }, []);

  const handleClick = (item) => {
    setPolicy(item);
    ref?.current?.present();
  };
  const closeSheet = () => {
    ref?.current?.dismiss();
  };

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_SETTING], state));
  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    const truncatedText = words.slice(0, maxWords).join(' ');
    return truncatedText;
  };

  const renderPolicies = ({ item }) => {
    const longText = item?.content;
    const content = truncateText(longText, 50);
    const createdDate = dayjs(item?.created_at).format('MMM DD, YYYY  hh:mm:A');
    const updateDate = dayjs(item?.updated_at).format('MMM DD, YYYY  hh:mm:A');
    const active = item?.is_active;
    if (item.title == 'Term & Conditions') {
      return (
        <>
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleClick(item)}>
            <View style={styles.rowJustified}>
              <View>
                <Text style={styles.publishText}>{strings?.policies?.publishDate}</Text>
                <Text style={styles.dateText}>{createdDate}</Text>
              </View>
              <View style={styles.activeView(active)}>
                <View style={styles.activeDot(active)}></View>
                <Text style={styles.activeText(active)}>{active ? 'Active' : 'Inactive'}</Text>
              </View>
            </View>

            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>{item?.title}</Text>
              <RenderHtml contentWidth={width} source={{ html: content }} />
            </View>

            <Text style={styles.publishText}>{strings?.policies?.lastUpdate}</Text>
            <Text style={styles.dateText}>{updateDate}</Text>
          </TouchableOpacity>
        </>
      );
    } else {
      return;
    }
  };

  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.policies?.termsConditons} />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {isLoading ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : (
            <FlatList
              data={policyArray || []}
              renderItem={renderPolicies}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
      <BottomSheetModal
        detached
        ref={ref}
        snapPoints={snapPoints}
        enableDismissOnClose
        enablePanDownToClose
        backgroundStyle={styles.sheetStyle}
        handleIndicatorStyle={{ height: 0 }}
      >
        <BottomSheetScrollView style={styles.sheetContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.largeTitleText}>{policy?.title}</Text>
          <RenderHtml contentWidth={width} source={{ html: policy?.content }} />
        </BottomSheetScrollView>
        <View style={styles.closeView}>
          <TouchableOpacity style={styles.closeButtonView} onPress={closeSheet}>
            <Text style={styles.closeText}>{strings?.policies?.close}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </ScreenWrapper>
  );
}
