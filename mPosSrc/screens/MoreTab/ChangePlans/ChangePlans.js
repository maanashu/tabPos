import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, ScreenWrapper, Spacer } from '@/components';
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
import { buySubscription, getActiveSubscription, getAllPlans } from '@/actions/SubscriptionAction';
import { COLORS, Fonts } from '@/theme';
import { changePlan, checkmark, rightBack } from '@/assets';
import Plans from './Components/Plans';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/SubscriptionTypes';
import { SH, SW, width } from '@/theme/ScalerDimensions';

export function ChangePlans() {
  const dispatch = useDispatch();
  const getPlanData = useSelector(getAllPlansData);

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_ALL_PLANS], state));

  // useEffect(() => {
  //   dispatch(getAllPlans());
  // }, []);

  const monthlyPlans = [];
  const yearlyPlans = [];
  if (getPlanData?.allPlans?.length > 0) {
    getPlanData?.allPlans?.forEach((plan) => {
      if (plan?.tenure === 'monthly') {
        monthlyPlans.push(plan);
      } else if (plan.tenure === 'yearly') {
        yearlyPlans.push(plan);
      }
    });
  }

  const renderFeatures = ({ item }) => {
    return (
      <>
        <View style={[styles.rowAligned, { marginVertical: ms(5) }]}>
          <Image source={checkmark} style={{ height: 20, width: 20 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.featuresText}>{item}</Text>
          </View>
        </View>
      </>
    );
  };

  const planColors = (plan) => {
    if (plan == 'Basic') {
      return COLORS.bluish_green;
    }
    if (plan == 'Standard') {
      return COLORS.primary;
    } else {
      return COLORS.dark_grey;
    }
  };

  const updatePlan = async (plan_id) => {
    await dispatch(buySubscription(plan_id));
    const data = await dispatch(getActiveSubscription());
  };

  const renderPlans = ({ item }) => {
    const amount = parseFloat(item?.amount);
    return (
      <>
        <View style={styles.innerContainer} showsVerticalScrollIndicator={false}>
          <Text style={[styles.planType, { color: planColors(item?.name) }]}>{item?.name}</Text>
          <Spacer space={ms(10)} />
          <Text style={styles.everythingText}>{strings?.plans?.everything}</Text>
          <Spacer space={ms(25)} />
          <Text style={[styles.planType, { color: COLORS.solid_grey }]}>${amount.toFixed(2)}</Text>
          <Text style={styles.everythingText}>{strings?.plans?.perMonth}</Text>

          <Spacer space={ms(25)} />
          <Text style={styles.subTitleText}>{strings?.plans?.appsIncluded}</Text>
          <Plans data={item?.included_apps} />

          <Spacer space={ms(20)} />

          <Button
            style={{
              width: width - SW(80),
              alignSelf: 'center',
              height: SH(50),
              backgroundColor: planColors(item?.name),
              borderWidth: 0,
            }}
            title={'Get Started'}
            textStyle={{ fontFamily: Fonts.Regular, color: COLORS.white }}
            onPress={() => updatePlan(item?.id)}
          />

          <Spacer space={ms(20)} />

          <FlatList data={item?.tags} renderItem={renderFeatures} />
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
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} size={'large'} />
        ) : (
          <FlatList data={monthlyPlans} renderItem={renderPlans} />
        )}

        <Spacer space={ms(20)} />
      </ScrollView>
    </ScreenWrapper>
  );
}
