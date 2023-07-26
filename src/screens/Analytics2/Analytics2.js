import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

import { ScreenWrapper, Spacer } from '@/components';

import { styles } from './Analytics2.styles';
import { MainScreen } from './Components/MainScreen';
import { TotalProfit } from './Components/TotalProfit';
import {
  analyticsReport,
  profit,
  revenueTotal,
  totalSales,
  channel,
  averageOrder,
  productSelling,
  locationSales,
  totalCost,
  totalOrders,
} from '@/assets';
import Modal from 'react-native-modal';
import { COLORS, SH } from '@/theme';
import { Revenue } from './Components/Revenue';
import { TotalCost } from './Components/TotalCost';
import { TotalDeliveryOrders } from './Components/TotalDeliveryOrders';
import { TotalShippingOrders } from './Components/TotalShippingOrders';
import { TopSellingProduct } from './Components/TopSellingProduct';
import { TotalOrders } from './Components/TotalOrders';
import { TopSellingLocation } from './Components/TopSellingLocation';
import { TotalPosOrder } from './Components/TotalPosOrder';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalyticStatistics } from '@/actions/AnalyticsAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { getAnalytics } from '@/selectors/AnalyticsSelector';

export function Analytics2() {
  const [selectedScreen, setselectedScreen] = useState('MainScreen');
  const [flag, setFlag] = useState('profits');
  const [showModal, setShowModal] = useState(false);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const getAnalyticsData = useSelector(getAnalytics);
  const AnalyticStatistics = getAnalyticsData?.getAnalyticStatistics;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnalyticStatistics(sellerID, flag));
  }, []);

  const goBack = () => {
    setselectedScreen('MainScreen');
  };

  const renderScreen = {
    ['MainScreen']: (
      <MainScreen
        onPressProfit={() => {
          setselectedScreen('TotalProfit'), setFlag('profits');
        }}
        onPressRevenue={() => setselectedScreen('Revenue')}
        onPressCost={() => setselectedScreen('TotalCost')}
        onPressDelivery={() => setselectedScreen('TotalDeliveryOrders')}
        onPressShipping={() => setselectedScreen('TotalShippingOrders')}
        onPressProducts={() => setselectedScreen('TopSellingProduct')}
        onPressOrders={() => setselectedScreen('TotalOrders')}
        onPressSellingLocations={() => setselectedScreen('TopSellingLocation')}
        onPressPosOrder={() => setselectedScreen('TotalPosOrder')}
      />
    ),
    ['TotalProfit']: <TotalProfit onPress={goBack} />,
    ['Revenue']: <Revenue onPress={goBack} />,
    ['TotalCost']: <TotalCost onPress={goBack} />,
    ['TotalDeliveryOrders']: <TotalDeliveryOrders onPress={goBack} />,
    ['TotalShippingOrders']: <TotalShippingOrders onPress={goBack} />,
    ['TopSellingProduct']: <TopSellingProduct onPress={goBack} />,
    ['TotalOrders']: <TotalOrders onPress={goBack} />,
    ['TotalPosOrder']: <TotalPosOrder onPress={goBack} />,
    ['TopSellingLocation']: <TopSellingLocation onPress={goBack} />,
  };

  const screenChangeView = () => {
    return renderScreen[selectedScreen];
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.homeMainContainer}>
          <View style={styles.flexDirectionRow}>
            <View style={styles.container}>{screenChangeView()}</View>

            <View style={styles.rightSideView}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.bucketBackgorund}
                  onPress={() => setShowModal(!showModal)}
                >
                  <Image source={analyticsReport} style={styles.sideBarImage} />
                </TouchableOpacity>
                <Spacer space={SH(25)} />
                <TouchableOpacity
                  style={[
                    styles.bucketBackgorund,
                    {
                      backgroundColor:
                        selectedScreen === 'TotalProfit' ? COLORS.primary : COLORS.white,
                    },
                  ]}
                  onPress={() => setselectedScreen('TotalProfit')}
                >
                  <Image
                    source={profit}
                    style={[
                      styles.sideBarImage,
                      { tintColor: selectedScreen === 'TotalProfit' ? COLORS.white : COLORS.black },
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <Spacer space={SH(25)} />
              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor: selectedScreen === 'Revenue' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('Revenue')}
              >
                <Image
                  source={revenueTotal}
                  style={[
                    styles.sideBarImage,
                    { tintColor: selectedScreen === 'Revenue' ? COLORS.white : COLORS.black },
                  ]}
                />
              </TouchableOpacity>
              <Spacer space={SH(25)} />
              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor: selectedScreen === 'TotalCost' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TotalCost')}
              >
                <Image
                  source={totalCost}
                  style={[
                    styles.sideBarImage,
                    { tintColor: selectedScreen === 'TotalCost' ? COLORS.white : COLORS.black },
                  ]}
                />
              </TouchableOpacity>

              <Spacer space={SH(25)} />
              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TotalPosOrder' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TotalPosOrder')}
              >
                <Image
                  source={channel}
                  style={[
                    styles.sideBarImage,
                    {
                      tintColor: selectedScreen === 'TotalPosOrder' ? COLORS.white : COLORS.black,
                    },
                  ]}
                />
              </TouchableOpacity>
              <Spacer space={SH(25)} />

              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TotalDeliveryOrders' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TotalDeliveryOrders')}
              >
                <Image
                  source={averageOrder}
                  style={[
                    styles.sideBarImage,
                    {
                      tintColor:
                        selectedScreen === 'TotalDeliveryOrders' ? COLORS.white : COLORS.black,
                    },
                  ]}
                />
              </TouchableOpacity>
              <Spacer space={SH(25)} />
              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TotalShippingOrders' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TotalShippingOrders')}
              >
                <Image
                  source={totalSales}
                  style={[
                    styles.sideBarImage,
                    {
                      tintColor:
                        selectedScreen === 'TotalShippingOrders' ? COLORS.white : COLORS.black,
                    },
                  ]}
                />
              </TouchableOpacity>
              <Spacer space={SH(25)} />
              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TotalOrders' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TotalOrders')}
              >
                <Image
                  source={totalOrders}
                  style={[
                    styles.sideBarImage,
                    {
                      tintColor: selectedScreen === 'TotalOrders' ? COLORS.white : COLORS.black,
                    },
                  ]}
                />
              </TouchableOpacity>
              <Spacer space={SH(25)} />
              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TopSellingLocation' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TopSellingLocation')}
              >
                <Image
                  source={locationSales}
                  style={[
                    styles.sideBarImage,
                    {
                      tintColor:
                        selectedScreen === 'TopSellingLocation' ? COLORS.white : COLORS.black,
                    },
                  ]}
                />
              </TouchableOpacity>
              <Spacer space={SH(25)} />
              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TopSellingProduct' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TopSellingProduct')}
              >
                <Image
                  source={productSelling}
                  style={[
                    styles.sideBarImage,
                    {
                      tintColor:
                        selectedScreen === 'TopSellingProduct' ? COLORS.white : COLORS.black,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal isVisible={showModal} statusBarTranslucent>
          <View style={styles.modalView}>
            <View style={styles.flexAlign}>
              <Text style={styles.headerText}>{'Analytics Reports'}</Text>
              <TouchableOpacity style={styles.imageView} onPress={() => setShowModal(false)}>
                <Image source={analyticsReport} style={styles.headerImage} />
              </TouchableOpacity>
            </View>
            <Spacer space={SH(25)} />

            <View style={styles.flexAlign}>
              <Image source={profit} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Total Profit'}</Text>
              </View>
            </View>
            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={revenueTotal} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Total Revenue'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={totalSales} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Total Sales'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={channel} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Sales by Channel'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={averageOrder} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Average Order Value'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={productSelling} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Top Selling Products'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={locationSales} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Sales by Locations'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={totalOrders} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Total Orders'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={totalCost} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Total Costs'}</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
}
