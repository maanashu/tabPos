import React, { useState } from 'react';
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

export function Analytics2() {
  const [selectedScreen, setselectedScreen] = useState('MainScreen');
  const [showModal, setShowModal] = useState(false);

  const renderScreen = {
    ['MainScreen']: <MainScreen />,
    ['TotalProfit']: <TotalProfit />,
    ['Revenue']: <Revenue />,
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
                        selectedScreen === 'TotalProfit'
                          ? COLORS.primary
                          : COLORS.textInputBackground,
                    },
                  ]}
                  onPress={() => setselectedScreen('TotalProfit')}
                >
                  <Image
                    source={profit}
                    style={[
                      styles.sideBarImage,
                      { tintColor: selectedScreen === 'TotalProfit' && COLORS.white },
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <Spacer space={SH(25)} />
              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'Revenue' ? COLORS.primary : COLORS.textInputBackground,
                  },
                ]}
                onPress={() => setselectedScreen('Revenue')}
              >
                <Image
                  source={revenueTotal}
                  style={[
                    styles.sideBarImage,
                    { tintColor: selectedScreen === 'Revenue' && COLORS.white },
                  ]}
                />
              </TouchableOpacity>
              <Spacer space={SH(25)} />
              <Image source={totalSales} style={styles.sideBarImage} />

              <Spacer space={SH(25)} />

              <Image source={channel} style={styles.sideBarImage} />

              <Spacer space={SH(25)} />
              <Image source={averageOrder} style={styles.sideBarImage} />
              <Spacer space={SH(25)} />
              <Image source={productSelling} style={styles.sideBarImage} />

              <Spacer space={SH(25)} />

              <Image source={locationSales} style={styles.sideBarImage} />

              <Spacer space={SH(25)} />

              <Image source={totalOrders} style={styles.sideBarImage} />

              <Spacer space={SH(25)} />

              <Image source={totalCost} style={styles.sideBarImage} />
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
