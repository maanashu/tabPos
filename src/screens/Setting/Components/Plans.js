import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import {
  Calendar_Outline,
  CheckBadgeFilled,
  Fonts,
  SimpleCheck,
  changePlan,
  checkArrow,
  checkCircle,
  checkmark,
  crossButton,
  newCalendar,
  radioFillPlan,
  upgradeIcon,
  visa,
} from '@/assets';
import { moderateScale, ms, verticalScale } from 'react-native-size-matters';
import { ANNUALDATA, PLANFEATUREDATA, basicData } from '@/constants/flatListData';
import { buySubscription, getActiveSubscription, getAllPlans } from '@/actions/SubscriptionAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getAllPlansData } from '@/selectors/SubscriptionSelector';
import moment from 'moment';
import { TYPES } from '@/Types/SubscriptionTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { useCallback } from 'react';
export function Plans() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const getPlanData = useSelector(getAllPlansData);
  const activeUserPlan = getPlanData?.activeSubscription;
  // var activePlan = {};
  const [planModal, setPlanModal] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
  const [activePlan, setActivePlan] = useState({});

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllPlans());
      dispatch(getActiveSubscription());
    }
  }, [isFocused]);
  useEffect(() => {
    if (activeUserPlan?.length > 0) {
      setActivePlan(getPlanData?.activeSubscription[0]);
    }
  }, [Object.keys(activeUserPlan).length]);
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
  const getActiveSubLoader = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ACTIVE_SUBSCRIPTION], state)
  );
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.BUY_SUBSCRIPTION], state));

  const planTagItem = ({ item }) => {
    return (
      <View style={[styles.dispalyRow, { paddingVertical: verticalScale(2) }]}>
        <Image source={SimpleCheck} style={styles.checkmark} resizeMode="contain" />
        <Text style={[styles.includedText, { fontFamily: Fonts.SemiBold }]}>{item} </Text>
      </View>
    );
  };
  const basicItem = ({ item, index }) => {
    return (
      <View style={styles.basicContainer}>
        <Text
          style={[
            styles.basic,
            item?.name == 'Standard'
              ? { color: COLORS.primary }
              : item?.name == 'Premium'
              ? { color: COLORS.black }
              : { color: COLORS.bluish_green },
          ]}
        >
          {item?.name}
        </Text>
        <Text style={styles.everyThingNeed}>{item?.description}</Text>
        <Spacer space={SH(10)} />
        <Text style={styles.basicPrice}>{'$' + item.amount + '.00'}</Text>
        <Text style={styles.everyThingNeed}>
          {item?.tenure?.charAt(0).toUpperCase() + item?.tenure?.slice(1)}{' '}
        </Text>
        <Spacer space={SH(10)} />
        <Text style={styles.changePlanText}>{strings.settings.includePlan}</Text>

        {item?.included_apps?.map((item) => (
          <View style={styles.dispalyRow}>
            <Image source={radioFillPlan} style={styles.radioFillPlan} />
            <Text style={[styles.changePlanText, { fontFamily: Fonts.Regular }]}>{item}</Text>
          </View>
        ))}
        {/* <View style={styles.dispalyRow}>
          <Image source={radioFillPlan} style={styles.radioFillPlan} />
          <Text style={[styles.changePlanText, { fontFamily: Fonts.Regular }]}>JOBR Wallet</Text>
        </View>
        <View style={styles.dispalyRow}>
          <Image source={radioFillPlan} style={styles.radioFillPlan} />
          <Text style={[styles.changePlanText, { fontFamily: Fonts.Regular }]}>JOBR Wallet</Text>
        </View>
        <View style={styles.dispalyRow}>
          <Image source={radioFillPlan} style={styles.radioFillPlan} />
          <Text style={[styles.changePlanText, { fontFamily: Fonts.Regular }]}>JOBR Wallet</Text>
        </View>
        <View style={styles.dispalyRow}>
          <Image source={radioFillPlan} style={styles.radioFillPlan} />
          <Text style={[styles.changePlanText, { fontFamily: Fonts.Regular }]}>JOBR Wallet</Text>
        </View> */}
        <Spacer space={SH(10)} />
        <TouchableOpacity
          onPress={() => {
            onBuySubscription(item?._id), setSelectedPlanIndex(index);
          }}
          // style={[
          //   styles.checkoutButton,
          //   styles.checkoutButtonSec,
          //   item?.name == 'Standard'
          //     ? { backgroundColor: COLORS.primary }
          //     : item?.name == 'Premium'
          //     ? { backgroundColor: COLORS.black }
          //     : { backgroundColor: COLORS.bluish_green },
          // ]}
          style={{
            backgroundColor: COLORS.navy_blue,
            width: ms(90),
            height: 50,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isLoading && selectedPlanIndex == index ? (
            <ActivityIndicator animating={isLoading} size={'small'} color={COLORS.white} />
          ) : (
            <>
              <Text style={[styles.checkoutText, { color: COLORS.white }]}>
                {strings.settings.change}
              </Text>
              <Image source={checkArrow} style={[styles.checkArrow, { tintColor: COLORS.white }]} />
            </>
          )}
        </TouchableOpacity>
        <Spacer space={SH(10)} />
        <FlatList
          data={item?.tags}
          extraData={item?.tags}
          renderItem={planTagItem}
          keyExtractor={(item) => item}
        />
      </View>
    );
  };

  const Item = ({ item, onPress, backgroundColor, color }) => (
    <TouchableOpacity style={[styles.annualBillingCon, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.monthlyBil, { color }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const annualItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? COLORS.navy_blue : COLORS.sky_grey;
    const color = item.id === selectedId ? COLORS.white : COLORS.darkGray;

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        color={color}
      />
    );
  };

  const onBuySubscription = async (plan_id) => {
    await dispatch(buySubscription(plan_id));
    const data = await dispatch(getActiveSubscription());
    if (data) {
      setPlanModal(false);
      if (data !== undefined || data?.length > 0) {
        setActivePlan(data[0]);
      }
    }
  };
  const renderPlanView = useCallback(
    () => (
      <View>
        <View style={styles.rowAligned}>
          <Image source={checkCircle} resizeMode="contain" style={{ height: 24, width: 24 }} />
          <Spacer horizontal space={ms(10)} />
          <Text style={[styles.HeaderLabelText, { fontSize: ms(12) }]}>
            {strings.settings.plans}
          </Text>
        </View>
        <Spacer space={SH(20)} />
        <View style={styles.securityMainCon}>
          <View style={[styles.flexRow, { alignItems: 'flex-start' }]}>
            <View>
              <Text style={[styles.basic, { fontSize: 26 }]}>{activePlan?.plan_id?.name}</Text>
              <Spacer space={SH(3)} />
              <Text style={styles.everyThingNeed}>{activePlan?.plan_id?.description}</Text>
            </View>
            <TouchableOpacity style={styles.upgradePlanView} onPress={() => setPlanModal(true)}>
              <Text style={[styles.changePlanText, { fontFamily: Fonts.SemiBold }]}>
                {strings.settings.upgradePlan}
              </Text>
              <Image source={upgradeIcon} style={styles.changePlan} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(10)} />

          <View
            style={{ borderBottomWidth: 1, borderStyle: 'dashed', borderColor: COLORS.lavender }}
          />

          <Spacer space={SH(10)} />
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.changePlanText}>{strings.settings.includePlan}</Text>
              <Spacer space={SH(2)} />

              {activePlan?.plan_id?.included_apps?.map((item) => (
                <View key={item} style={[styles.dispalyRow, { paddingVertical: verticalScale(2) }]}>
                  <Image source={CheckBadgeFilled} style={styles.radioFillPlan} />
                  <Text style={styles.includedText}>{item}</Text>
                </View>
              ))}
            </View>
            <FlatList
              data={activePlan?.plan_id?.tags}
              extraData={activePlan?.plan_id?.tags}
              renderItem={planTagItem}
              keyExtractor={(item) => item}
            />
          </View>
          <Spacer space={SH(15)} />

          <View
            style={{ borderBottomWidth: 1, borderStyle: 'dashed', borderColor: COLORS.lavender }}
          />
          <Spacer space={SH(10)} />
          <View style={styles.rowAligned}>
            <View style={styles.subscribedView}>
              <Text style={styles.subscribedText}>{'Subscribed'}</Text>
            </View>
            <Spacer horizontal space={ms(50)} />
            <Text style={[styles.subscribedText, { fontSize: ms(14) }]}>{`$${parseFloat(
              activePlan?.plan_id?.amount
            ).toFixed(2)} /mo`}</Text>
          </View>
        </View>
        <Spacer space={SH(20)} />

        <View style={[styles.rowAligned, { marginHorizontal: ms(15) }]}>
          <View style={styles.billingDateCon}>
            <Text style={[styles.changePlanText, { fontFamily: Fonts.Medium }]}>
              Next billing date
            </Text>
            <Spacer space={SH(10)} />
            <View style={styles.rowAligned}>
              <Image
                source={Calendar_Outline}
                resizeMode="contain"
                style={{ height: 20, width: 20, marginRight: 5 }}
              />
              <Text style={[styles.changePlanText, { fontFamily: Fonts.Regular }]}>
                {moment(activePlan?.expiry_date).format('MMMM D, YYYY')}
                {' for $' + activePlan?.plan_id?.amount + '.00 USD'}
              </Text>
            </View>
          </View>
          <Spacer horizontal space={SW(5)} />
          <View style={styles.billingDateCon}>
            <Text style={styles.changePlanText}>{strings.settings.paymentMethod}</Text>
            <Spacer space={SH(10)} />
            <View style={styles.dispalyRow}>
              <Image source={visa} style={styles.visa} />
              <Text style={[styles.changePlanText, { fontFamily: Fonts.Regular }]}>
                Visa ending in 2275
              </Text>
            </View>
          </View>
        </View>
      </View>
    ),
    [activeUserPlan, activePlan]
  );
  const renderBuyView = useCallback(
    () => (
      <View
        style={[
          styles.securityMainCon,
          { justifyContent: 'space-evenly', alignItems: 'center', height: ms(100) },
        ]}
      >
        <Text style={{ textAlign: 'center' }}>No Active Subscription</Text>

        <TouchableOpacity
          onPress={() => {
            setPlanModal(true);
          }}
          style={[styles.checkoutButton, styles.checkoutButtonSec]}
        >
          <Text style={[styles.checkoutText, { color: COLORS.white }]}>{'Buy Subscription'}</Text>

          <Image source={checkArrow} style={[styles.checkArrow, { tintColor: COLORS.white }]} />
        </TouchableOpacity>
      </View>
    ),
    [activePlan]
  );
  return (
    <View style={{ paddingHorizontal: ms(10) }}>
      {getActiveSubLoader && (
        <ActivityIndicator style={{ marginTop: ms(50) }} size={'large'} color={COLORS.primary} />
      )}

      {planModal ? (
        <View>
          <View style={[styles.flexRow, { paddingHorizontal: moderateScale(20) }]}>
            <Text>{null}</Text>
            <Text style={[styles.HeaderLabelText, { fontSize: ms(12) }]}>
              {strings.settings.planFit}
            </Text>

            <TouchableOpacity style={styles.crossButtonCon} onPress={() => setPlanModal(false)}>
              <Image source={crossButton} style={styles.crossButton} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.everyThingNeed, { textAlign: 'center' }]}>
            {strings.settings.simpleTra}
          </Text>
          <Spacer space={SH(10)} />
          <View style={{ alignItems: 'center' }}>
            <FlatList
              data={ANNUALDATA}
              extraData={ANNUALDATA}
              renderItem={annualItem}
              keyExtractor={(item) => item.id}
              horizontal
              contentContainerStyle={{
                padding: 10,
                borderRadius: 30,
                borderWidth: 1,
              }}
              style={{ backgroundColor: COLORS.sky_grey, borderRadius: 30 }}
            />
          </View>
          <Spacer space={SH(20)} />

          <FlatList
            style={{ alignSelf: 'center' }}
            data={selectedId == 1 ? monthlyPlans : yearlyPlans}
            extraData={selectedId == 1 ? monthlyPlans : yearlyPlans}
            renderItem={basicItem}
            keyExtractor={(item) => item.id}
            horizontal
          />
        </View>
      ) : (
        <>
          {Object.keys(activePlan).length > 0 && !getActiveSubLoader && renderPlanView()}
          {Object.keys(activePlan).length <= 0 && !getActiveSubLoader && renderBuyView()}
        </>
      )}
    </View>
  );
}
