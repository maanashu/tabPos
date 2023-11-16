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
import styles from './Plans.styles';
import { upadteApi } from '@/actions/SettingAction';
import { getAllPlansData } from '@/selectors/SubscriptionSelector';
import { getActiveSubscription, getAllPlans } from '@/actions/SubscriptionAction';
import { COLORS } from '@/theme';
import IncludedPlan from './Components/IncludedPlan';
import { changePlan, checkmark } from '@/assets';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';

export function Plans() {
  const dispatch = useDispatch();
  const getPlanData = useSelector(getAllPlansData);
  const activeUserPlan = getPlanData?.activeSubscription;

  const [appNotiValue, setappNotiValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // console.log('actice plan', activeUserPlan);
  // console.log('all plans', getPlanData?.allPlans);

  useEffect(() => {
    dispatch(getAllPlans());
    dispatch(getActiveSubscription());
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

  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.plans?.plans} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.termsText}>{strings?.plans?.terms}</Text>
        <Spacer space={ms(10)} />
        <View style={styles.innerContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.yourPlanText}>{strings?.plans?.yourPlan}</Text>
          <Text style={styles.planType}>{strings?.plans?.basic}</Text>
          <Spacer space={ms(10)} />
          <Text style={styles.everythingText}>{strings?.plans?.everything}</Text>
          <Spacer space={ms(25)} />
          <Text style={styles.subTitleText}>{strings?.plans?.planIncludes}</Text>
          <IncludedPlan
            data={[
              { id: 1, appName: 'JOBR B2B' },
              { id: 2, appName: 'JOBR Wallet' },
            ]}
          />

          <Spacer space={ms(20)} />

          <Text style={styles.subTitleText}>{strings?.plans?.planFeatures}</Text>

          <FlatList data={feature} renderItem={renderFeatures} />

          <Spacer space={ms(20)} />

          <HorizontalLine />
          <Spacer space={ms(10)} />

          <Text style={styles.subTitleText}>{strings?.plans?.nextBillingDate}</Text>
          <Text style={styles.dateText}>{'March 2, 2023 for $1.00 USD'}</Text>

          <Spacer space={ms(20)} />
          <HorizontalLine />
          <Spacer space={ms(10)} />

          <Text style={styles.subTitleText}>{strings?.plans?.paymentMethod}</Text>
          <Text style={styles.dateText}>{'Visa ending in 2275'}</Text>

          <Spacer space={ms(30)} />
          <View style={styles.rowAligned}>
            <Text style={[styles.subTitleText, { marginBottom: 0, marginRight: ms(7) }]}>
              {strings?.plans?.changePlan}
            </Text>
            <TouchableOpacity onPress={() => commonNavigate(MPOS_NAVIGATION.changePlans)}>
              <Image source={changePlan} resizeMode="contain" style={styles.chnagePlanIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <Spacer space={ms(20)} />
      </ScrollView>
    </ScreenWrapper>
  );
}
