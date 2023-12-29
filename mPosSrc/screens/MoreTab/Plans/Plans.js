import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScreenWrapper, Spacer } from '@/components';
import { Header, HorizontalLine } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { getSetting } from '@/selectors/SettingSelector';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, ms } from 'react-native-size-matters';
import { Image } from 'react-native';
import { Images } from '@mPOS/assets';
import styles from './Plans.styles';
import { upadteApi } from '@/actions/SettingAction';
import { getAllPlansData } from '@/selectors/SubscriptionSelector';
import { getActiveSubscription, getAllPlans } from '@/actions/SubscriptionAction';
import { COLORS, Fonts, SF, SW } from '@/theme';
import IncludedPlan from './Components/IncludedPlan';
import { changePlan, checkArrow, checkmark } from '@/assets';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import moment from 'moment';

export function Plans() {
  const dispatch = useDispatch();
  const getPlanData = useSelector(getAllPlansData);
  const activeUserPlan = getPlanData?.activeSubscription[0] ?? {};
  const [appNotiValue, setappNotiValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // console.log('actice plan', activeUserPlan);
  // console.log('all plans', getPlanData?.allPlans);
  const [activePlan, setActivePlan] = useState({});

  useEffect(() => {
    dispatch(getAllPlans());
    dispatch(getActiveSubscription());
  }, []);

  useEffect(() => {
    if (activeUserPlan?.length > 0) {
      setActivePlan(getPlanData?.activeSubscription[0]);
    }
  }, [Object.keys(activeUserPlan).length]);
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
            <Text style={styles.featuresText}>{item}</Text>
          </View>
        </View>
      </>
    );
  };

  const renderBuyView = useCallback(
    () => (
      <View
        style={[
          {
            borderColor: COLORS.light_purple,
            borderRadius: 20,
            paddingVertical: ms(15),
            borderWidth: 1,
            marginHorizontal: ms(15),
          },
          { justifyContent: 'space-evenly', alignItems: 'center', height: ms(100) },
        ]}
      >
        <Text style={{ textAlign: 'center', fontSize: ms(10) }}>No Active Subscription</Text>

        <TouchableOpacity
          onPress={() => commonNavigate(MPOS_NAVIGATION.changePlans)}
          style={[
            {
              backgroundColor: COLORS.navy_blue,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '50%',
              padding: ms(8),
              borderRadius: 10,
            },
          ]}
        >
          <Text
            style={[
              {
                color: COLORS.darkGray,
                fontSize: SF(14),
                fontFamily: Fonts.Regular,
              },
              { color: COLORS.white },
            ]}
          >
            {'Buy Subscription'}
          </Text>

          <Image
            source={checkArrow}
            style={[
              {
                width: SW(6),
                height: SW(6),
                resizeMode: 'contain',
                paddingHorizontal: moderateScale(6),
                tintColor: COLORS.darkGray,
              },
              { tintColor: COLORS.white },
            ]}
          />
        </TouchableOpacity>
      </View>
    ),
    [activePlan]
  );
  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.plans?.plans} />
      {Object.keys(activeUserPlan)?.length > 0 ? (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.termsText}>{strings?.plans?.terms}</Text>
          <Spacer space={ms(10)} />
          <View style={styles.innerContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.yourPlanText}>{strings?.plans?.yourPlan}</Text>
            <Text style={styles.planType}>
              {/* {strings?.plans?.basic} */}
              {activeUserPlan?.plan_id?.name}
            </Text>
            <Spacer space={ms(10)} />
            <Text style={styles.everythingText}>{strings?.plans?.everything}</Text>

            {activeUserPlan?.plan_id?.included_apps?.length > 0 && (
              <>
                <Spacer space={ms(25)} />

                <Text style={styles.subTitleText}>{strings?.plans?.planIncludes}</Text>
                <IncludedPlan data={activeUserPlan?.plan_id?.included_apps} />
              </>
            )}

            <Spacer space={ms(20)} />

            <Text style={styles.subTitleText}>{strings?.plans?.planFeatures}</Text>

            <FlatList data={activeUserPlan?.plan_id?.tags} renderItem={renderFeatures} />

            <Spacer space={ms(20)} />

            <HorizontalLine />
            <Spacer space={ms(10)} />

            <Text style={styles.subTitleText}>{strings?.plans?.nextBillingDate}</Text>
            <Text style={styles.dateText}>
              {/* {'March 2, 2023 for $1.00 USD'} */}
              {moment.utc(activeUserPlan?.expiry_date).format('MMMM D, YYYY')}
              {' for $' + activeUserPlan?.plan_id?.amount + '.00 USD'}
            </Text>

            {/* <Spacer space={ms(20)} />
            <HorizontalLine />
            <Spacer space={ms(10)} />

            <Text style={styles.subTitleText}>{strings?.plans?.paymentMethod}</Text>
            <Text style={styles.dateText}>{'Visa ending in 2275'}</Text> */}

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
      ) : (
        renderBuyView()
      )}
    </ScreenWrapper>
  );
}
