import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
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
import { SH } from '@/theme';
import { Spacer, ScreenWrapper } from '@/components';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { styles } from '../Analytics2.styles';
import { HomeGraph } from '.';

export function MainScreen() {
  const getAnalyticsData = useSelector(getAnalytics);
  const [showModal, setShowModal] = useState(false);

  const productGraphObject2 = getAnalyticsData?.getTotalGraph;

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.homeMainContainer}>
          <View style={styles.flexDirectionRow}>
            <View>
              <View style={styles.flexDirectionRow}>
                <HomeGraph
                  header="Total Profit"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
                <HomeGraph
                  header="Total Revenue"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
                <HomeGraph
                  header="Total Sales"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
              </View>
              <View style={styles.flexDirectionRow}>
                <HomeGraph
                  header="Sales by Channel"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />

                <HomeGraph
                  header="Average Order value"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />

                <HomeGraph
                  header="Top Selling Products"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
              </View>
              <View style={styles.flexDirectionRow}>
                <HomeGraph
                  header="Sales by Locations"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
                <HomeGraph
                  header="Total Orders"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
                <HomeGraph
                  header="Total Costs"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
              </View>
            </View>

            <View style={styles.rightSideView}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.bucketBackgorund}
                  onPress={() => setShowModal(!showModal)}
                >
                  <Image source={analyticsReport} style={styles.sideBarImage} />
                </TouchableOpacity>
                <Spacer space={SH(25)} />
                <Image source={profit} style={styles.sideBarImage} />
              </View>
              <Spacer space={SH(25)} />
              <Image source={revenueTotal} style={styles.sideBarImage} />

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
              {/* <View style={styles.shippingBackgorund}>
                  <Image source={totalCost} style={styles.sideBarImage} />
                  <View
                  style={[
                    styles.bucketBadge,
                    {
                      backgroundColor: COLORS.yellowTweet,
                      borderColor: COLORS.transparent,
                    },
                  ]}
                >
                  <Text style={[styles.badgetext, { color: COLORS.white }]}>
                    0
                  </Text>
                </View> 
                </View>*/}
            </View>
          </View>
        </View>
        <Modal isVisible={showModal} statusBarTranslucent>
          <View style={styles.modalView}>
            <View style={styles.flexAlign}>
              <Text style={styles.headerText}>{'Analytics Reports'}</Text>
              <TouchableOpacity
                style={styles.imageView}
                onPress={() => setShowModal(false)}
              >
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
