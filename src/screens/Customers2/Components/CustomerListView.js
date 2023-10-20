import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Table } from 'react-native-table-component';
import { styles } from '../Customers2.styles';
import { userImage } from '@/assets';
import { COLORS } from '@/theme';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/CustomersTypes';
import { memo } from 'react';
import { getCustomers } from '@/selectors/CustomersSelector';

const CustomerListView = ({
  searchedAppointments,
  profileClickHandler,
  saveCustomerId,
  saveCustomeType,
}) => {
  const dispatch = useDispatch();
  const getCustomerData = useSelector(getCustomers);
  const customerArray = getCustomerData?.getUserOrder?.data ?? [];
  const [selectedId, setSelectedId] = useState(saveCustomerId === undefined ? 1 : saveCustomerId);
  const [customerType, setCustomerType] = useState(
    saveCustomeType === undefined ? 'all_customers' : saveCustomeType
  );
  const isCustomerLoad = useSelector((state) => isLoadingSelector([TYPES.GET_USER_ORDER], state));
  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={{ zIndex: -9 }}>
      <Table>
        <View
          style={[styles.tableDataHeaderCon, { borderTopWidth: 1, borderColor: COLORS.solidGrey }]}
        >
          <View style={styles.displayFlex}>
            <View style={[styles.tableHeaderLeft, { width: windowWidth * 0.15 }]}>
              <Text style={styles.tableTextHeaFirst}>#</Text>
              <Text style={[styles.tableTextHea, { marginLeft: 30 }]}>Name</Text>
            </View>
            <View
              style={[
                styles.tableHeaderRight,
                {
                  width: Platform.OS === 'android' ? windowWidth * 0.55 : windowWidth * 0.45,
                  //   backgroundColor: 'blue',
                },
              ]}
            >
              <View style={styles.tableHeaderRightInner}>
                <Text style={styles.tableTextHeader}>Total orders</Text>
              </View>
              <View style={styles.tableHeaderRightInner}>
                <Text style={styles.tableTextHeader}>Total Products </Text>
              </View>
              <View style={styles.tableHeaderRightInner}>
                <Text style={styles.tableTextHeader}>Lifetime spent</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ zIndex: -9, height: ms(290) }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {isCustomerLoad ? (
              <View style={{ marginTop: 100 }}>
                <ActivityIndicator size="large" color={COLORS.indicator} />
              </View>
            ) : searchedAppointments?.length === 0 ? (
              <View style={{ marginTop: 80 }}>
                <Text style={styles.userNotFound}>User not found</Text>
              </View>
            ) : (
              searchedAppointments?.map((item, index) => {
                const currentIndex = index + 1;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.tableDataCon, { zIndex: -99 }]}
                    activeOpacity={0.7}
                    onPress={() => profileClickHandler(item, selectedId, customerType)}
                    // onPress={profileClickHandler} //prev
                  >
                    <View style={styles.displayFlex}>
                      <View style={[styles.tableHeaderLeft, { width: windowWidth * 0.15 }]}>
                        <Text style={styles.tableTextDataFirst}>{currentIndex}</Text>
                        <View style={[styles.flexAlign, { marginLeft: 10 }]}>
                          <Image
                            source={
                              item?.user_details?.profile_photo == null ||
                              item?.user_details?.profile_photo == ''
                                ? userImage
                                : { uri: item?.user_details?.profile_photo }
                            }
                            style={styles.lovingStyleData}
                          />
                          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                            <Text
                              style={[styles.tableTextDataName, { width: windowWidth * 0.1 }]}
                              numberOfLines={1}
                            >
                              {item?.user_details?.firstname == undefined
                                ? 'Unknown'
                                : item?.user_details?.firstname}
                            </Text>
                            {item?.user_details ? (
                              <Text
                                style={[styles.tableTextDataAdd, { color: COLORS.gerySkies }]}
                                numberOfLines={1}
                              >
                                {item?.user_details?.current_address?.city},
                                {item?.user_details?.current_address?.zipcode}
                              </Text>
                            ) : (
                              <Text></Text>
                            )}
                          </View>
                        </View>
                      </View>
                      <View
                        style={[
                          styles.tableHeaderRight,
                          {
                            width:
                              Platform.OS === 'android' ? windowWidth * 0.55 : windowWidth * 0.45,
                            // backgroundColor: 'blue',
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.tableHeaderRightInner,
                            {
                              width:
                                Platform.OS === 'android' ? windowWidth * 0.17 : windowWidth * 0.14,
                            },
                          ]}
                        >
                          <Text style={styles.tableTextData} numberOfLines={1}>
                            {item?.total_orders}
                          </Text>
                        </View>
                        <View style={styles.tableHeaderRightInner}>
                          <Text style={styles.tableTextData} numberOfLines={1}>
                            {item?.total_products}
                          </Text>
                        </View>
                        <View style={styles.tableHeaderRightInner}>
                          <Text style={styles.tableTextData} numberOfLines={1}>
                            {'$'}
                            {item?.life_time_spent}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
        </View>
      </Table>
    </View>
  );
};
export default memo(CustomerListView);
