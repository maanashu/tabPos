import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import {
  Fonts,
  changePlan,
  checkArrow,
  checkmark,
  crossButton,
  radioFillPlan,
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
      if (activeUserPlan?.length > 0) {
        setActivePlan(getPlanData?.activeSubscription[0]);
      }
    }
  }, [isFocused]);

  useEffect(() => {}, [getPlanData]);
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

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.BUY_SUBSCRIPTION], state));

  const planTagItem = ({ item }) => {
    return (
      <View style={[styles.dispalyRow, { paddingVertical: verticalScale(2) }]}>
        <Image source={checkmark} style={styles.checkmark} />
        <Text
          style={[styles.changePlanText, { fontFamily: Fonts.Regular, color: COLORS.dark_grey }]}
        >
          {item}{' '}
        </Text>
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
          style={[
            styles.checkoutButton,
            styles.checkoutButtonSec,
            item?.name == 'Standard'
              ? { backgroundColor: COLORS.primary }
              : item?.name == 'Premium'
              ? { backgroundColor: COLORS.black }
              : { backgroundColor: COLORS.bluish_green },
          ]}
        >
          {isLoading && selectedPlanIndex == index ? (
            <ActivityIndicator animating={isLoading} size={'small'} color={COLORS.white} />
          ) : (
            <Text style={[styles.checkoutText, { color: COLORS.white }]}>
              {strings.settings.getStart}
            </Text>
          )}

          <Image source={checkArrow} style={[styles.checkArrow, { tintColor: COLORS.white }]} />
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
    const backgroundColor = item.id === selectedId ? COLORS.primary : COLORS.textInputBackground;
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
        <View style={[styles.flexRow, { height: SW(8) }]}>
          <Text style={styles.HeaderLabelText}>{strings.settings.plans}</Text>
        </View>
        <Spacer space={SH(20)} />
        <View style={styles.securityMainCon}>
          <Text style={styles.yourPlan}>{strings.settings.yourPlan}</Text>
          <Spacer space={SH(15)} />
          <View style={styles.flexRow}>
            <View>
              <Text style={styles.basic}>{activePlan?.plan_id?.name}</Text>
              <Text style={styles.everyThingNeed}>{activePlan?.plan_id?.description}</Text>
            </View>
            <TouchableOpacity style={styles.dispalyRow} onPress={() => setPlanModal(true)}>
              <Text style={styles.changePlanText}>{strings.settings.chnagePlan}</Text>
              <Image source={changePlan} style={styles.changePlan} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(20)} />
          <Text style={styles.changePlanText}>{strings.settings.includePlan}</Text>
          {activePlan?.plan_id?.included_apps?.map((item) => (
            <View key={item} style={[styles.dispalyRow, { paddingVertical: verticalScale(2) }]}>
              <Image source={radioFillPlan} style={styles.radioFillPlan} />
              <Text style={[styles.changePlanText, { fontFamily: Fonts.Regular }]}>{item}</Text>
            </View>
          ))}

          <Spacer space={SH(20)} />
          <Text style={styles.changePlanText}>{strings.settings.planFeat}</Text>
          <FlatList
            data={activePlan?.plan_id?.tags}
            extraData={activePlan?.plan_id?.tags}
            renderItem={planTagItem}
            keyExtractor={(item) => item}
          />
          <Spacer space={SH(20)} />
          <View style={styles.billingDateCon}>
            <Text style={styles.changePlanText}>Next billing date</Text>
            <Spacer space={SH(3)} />
            <Text style={[styles.changePlanText, { fontFamily: Fonts.Regular }]}>
              {/* March 2, 2023 for $1.00 USD */}

              {moment(activePlan?.expiry_date).format('MMMM D, YYYY')}
              {' for $' + activePlan?.plan_id?.amount + '.00 USD'}
            </Text>
          </View>
          <Spacer space={SH(20)} />
          <View style={styles.billingDateCon}>
            <Text style={styles.changePlanText}>{strings.settings.paymentMethod}</Text>
            <Spacer space={SH(3)} />
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
    [activePlan]
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
    <View>
      {Object.keys(activePlan).length > 0 && renderPlanView()}
      {Object.keys(activePlan).length <= 0 && renderBuyView()}

      <Modal animationType="fade" transparent={true} isVisible={planModal}>
        <View style={styles.planModalcon}>
          <Spacer space={SH(20)} />
          <View style={[styles.flexRow, { paddingHorizontal: moderateScale(20) }]}>
            <Text>{null}</Text>
            <Text style={styles.planFit}>{strings.settings.planFit}</Text>

            <TouchableOpacity style={styles.crossButtonCon} onPress={() => setPlanModal(false)}>
              <Image source={crossButton} style={styles.crossButton} />
            </TouchableOpacity>
          </View>
          <Text style={styles.planModalSunhead}>{strings.settings.simpleTra}</Text>
          <Spacer space={SH(10)} />
          <View style={{ alignItems: 'center' }}>
            <FlatList
              data={ANNUALDATA}
              extraData={ANNUALDATA}
              renderItem={annualItem}
              keyExtractor={(item) => item.id}
              horizontal
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
          {/* <Spacer space={SH(25)} /> */}
        </View>
      </Modal>
    </View>
  );
}
