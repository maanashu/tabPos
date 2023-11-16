import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScreenWrapper, Spacer } from '@/components';
import { Header, HorizontalLine } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { getSetting } from '@/selectors/SettingSelector';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { Image } from 'react-native';
import { Images } from '@mPOS/assets';
import styles from './ChangePlans.styles';
import { upadteApi } from '@/actions/SettingAction';
import { getAllPlansData } from '@/selectors/SubscriptionSelector';
import { getActiveSubscription, getAllPlans } from '@/actions/SubscriptionAction';
import { COLORS } from '@/theme';
import { changePlan, checkmark } from '@/assets';
import Plans from './Components/Plans';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';

export function ChangePlans() {
  const dispatch = useDispatch();
  const getPlanData = useSelector(getAllPlansData);
  const activeUserPlan = getPlanData?.activeSubscription;

  const [appNotiValue, setappNotiValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  console.log('all plans', JSON.stringify(getPlanData?.allPlans?.[0]));

  useEffect(() => {
    dispatch(getAllPlans());
  }, []);

  const feature = [
    { id: 1, title: 'Online store' },
    { id: 2, title: 'Shareable product pages' },
    { id: 3, title: 'Unlimited products' },
    { id: 4, title: '24/7 support' },
    { id: 5, title: 'Abandoned cart recovery' },
    { id: 6, title: 'Advanced report builder' },
  ];

  const renderFeatures = ({ item }) => {
    return (
      <>
        <View style={[styles.rowAligned, { marginVertical: ms(5) }]}>
          <Image source={checkmark} style={{ height: 20, width: 20 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.featuresText}>{item?.title}</Text>
          </View>
        </View>
      </>
    );
  };
  const renderPlans = ({ item }) => {
    const amount = parseFloat(item?.amount);
    return (
      <>
        <View style={styles.innerContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.planType}>{item?.name}</Text>
          <Spacer space={ms(10)} />
          <Text style={styles.everythingText}>{strings?.plans?.everything}</Text>
          <Spacer space={ms(25)} />
          <Text style={[styles.planType, { color: COLORS.solid_grey }]}>${amount.toFixed(2)}</Text>
          <Text style={styles.everythingText}>{strings?.plans?.perMonth}</Text>

          <Spacer space={ms(25)} />
          <Text style={styles.subTitleText}>{strings?.plans?.appsIncluded}</Text>
          <Plans
            data={[
              { id: 1, appName: 'JOBR B2B' },
              { id: 2, appName: 'JOBR Wallet' },
            ]}
          />

          <Spacer space={ms(20)} />

          <FlatList data={feature} renderItem={renderFeatures} />
        </View>
      </>
    );
  };

  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.plans?.plans} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.termsText}>{strings?.plans?.terms}</Text>
        <Spacer space={ms(10)} />
        <FlatList data={getPlanData?.allPlans} renderItem={renderPlans} />

        <Spacer space={ms(20)} />
      </ScrollView>
    </ScreenWrapper>
  );
}
