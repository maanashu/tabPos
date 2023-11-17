import React, { useState, memo } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { Fonts, incomingOrders, returnedOrders, blankCheckBox, onlinecustomer } from '@/assets';
import { COLORS, SF, SH } from '@/theme';
import { graphOptions } from '@/constants/flatListData';
import { getDelivery } from '@/selectors/DeliverySelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { LineChart } from 'react-native-chart-kit';

const windowWidth = Dimensions.get('window').width;
const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 2.8;

import { TYPES } from '@/Types/CustomersTypes';

const Graph = ({ graphDetail }) => {
  const getDeliveryData = useSelector(getDelivery);
  const [graphData, setGraphData] = useState(graphOptions);
  const [newCustomerCheck, setNewCustomerCheck] = useState(true);
  const [onlineCustomerCheck, setOnlineCustomerCheck] = useState(true);
  const [walkCustomerCheck, setWalkCustomerCheck] = useState(true);
  const isLoad = useSelector((state) => isLoadingSelector([TYPES.GET_CUSTOMERS], state));

  return (
    <View style={styles.graphViewStyle}>
      <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.checkboxViewStyle}
          onPress={() => setWalkCustomerCheck((prev) => !prev)}
        >
          <Image
            source={walkCustomerCheck ? incomingOrders : blankCheckBox}
            style={styles.checkboxIconStyle}
          />
          <Text style={styles.varientTextStyle}>Wallking customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkboxViewStyle}
          onPress={() => setOnlineCustomerCheck((prev) => !prev)}
        >
          <Image
            source={onlineCustomerCheck ? onlinecustomer : blankCheckBox}
            style={styles.checkboxIconStyle}
          />
          <Text style={styles.varientTextStyle}>Online Customers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkboxViewStyle}
          onPress={() => setNewCustomerCheck((prev) => !prev)}
        >
          <Image
            source={newCustomerCheck ? returnedOrders : blankCheckBox}
            style={[styles.checkboxIconStyle]}
          />
          <Text style={styles.varientTextStyle}>New Customers</Text>
          {/* returnedOrders */}
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: ms(10) }}>
        {isLoad ? (
          <View style={styles.loaderView}>
            <ActivityIndicator size={'small'} color={COLORS.primary} />
          </View>
        ) : (
          <ScrollView
            style={{ marginTop: ms(10) }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <LineChart
              data={{
                labels: graphDetail?.labels ?? [],
                datasets:
                  !newCustomerCheck && !onlineCustomerCheck && !walkCustomerCheck
                    ? [
                        {
                          data: [0],
                          color: () => `rgba(31, 179, 255, 1)`,
                          strokeWidth: 3,
                        },
                        {
                          data: [0],
                          color: () => `rgba(39, 90, 255, 1)`,
                          strokeWidth: 3,
                        },
                        {
                          data: [0],
                          color: () => `rgba(252, 186, 48, 1)`,
                          strokeWidth: 3,
                        },
                      ].filter((el) => el)
                    : [
                        walkCustomerCheck && {
                          data: graphDetail?.datasets?.[0]?.data ?? [0],
                          color: () => `rgba(31, 179, 255, 1)`,
                          strokeWidth: 3,
                        },
                        onlineCustomerCheck && {
                          data: graphDetail?.datasets?.[1]?.data ?? [0],
                          color: () => `rgba(39, 90, 255, 1)`,
                          strokeWidth: 3,
                        },
                        newCustomerCheck && {
                          data: graphDetail?.datasets?.[2]?.data ?? [0],
                          color: () => `rgba(252, 186, 48, 1)`,
                          strokeWidth: 3,
                        },
                      ].filter((el) => el),
              }}
              width={
                graphDetail?.labels?.length > 20
                  ? Platform.OS === 'ios'
                    ? Dimensions.get('window').width * 1.8
                    : Dimensions.get('window').width * 5.5
                  : Dimensions.get('window').width * 0.86
              }
              height={ms(200)}
              // noOfSections={7}
              chartConfig={{
                decimalPlaces: 0,
                backgroundColor: '#000',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 2,
                horizontalLabelRotation: 45,
                color: () => `rgba(39, 90, 255, 1)`,
                labelColor: (opacity = 1) => `rgba(98, 98, 98, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForBackgroundLines: {
                  strokeWidth: 1,
                  stroke: '#CCCCCC',
                },
                propsForDots: {
                  r: '0',
                  strokeWidth: '2',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              withShadow={false}
              fromZero
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default memo(Graph);

const styles = StyleSheet.create({
  graphViewStyle: {
    // borderRadius: 10,
    // marginBottom: 30,
    height: twoEqualView,
    // backgroundColor: COLORS.white,
    // marginVertical: ms(10),
    // marginTop: ms(10),
  },
  numberOrdersText: {
    fontSize: SF(16),
    paddingTop: ms(10),
    paddingHorizontal: 20,
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  renderItemView: {
    marginLeft: ms(15),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(7),
  },
  loaderView: {
    // height: ms(224),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    marginTop: ms(110),
  },
  yAxistext: {
    fontSize: 11,
    color: COLORS.darkGray,
  },
  varientTextStyle: {
    fontSize: ms(7),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
  },
  checkboxIconStyle: {
    width: ms(18),
    height: ms(18),
    resizeMode: 'contain',
  },
  checkboxViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: ms(10),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
