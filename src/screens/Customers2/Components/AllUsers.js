import React, { useState, memo } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import {
  bell,
  search_light,
  leftBack,
  calendar1,
  dropdown2,
  Union,
  mask,
  maskRight,
  unionRight,
  userImage,
} from '@/assets';
import { Spacer, TableDropdown } from '@/components';
import { COLORS, SF, SH } from '@/theme';
import { strings } from '@/localization';
import { styles } from '@/screens/Customers2/Customers2.styles';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table } from 'react-native-table-component';
const result = Dimensions.get('window').height - 50;

const AllUsers = ({ backHandler, profileClickHandler }) => {
  const [selectedId, setSelectedId] = useState(1);
  const [show, setShow] = useState(false);
  const [dateformat, setDateformat] = useState('');
  const [date, setDate] = useState(new Date());
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
  ]);

  const onChangeDate = (selectedDate) => {
    const currentDate = moment().format('MM/DD/YYYY');
    const selected = moment(selectedDate).format('MM/DD/YYYY');
    if (currentDate === selected) {
      setShow(false);
      const fullDate = new Date(moment(selectedDate).subtract(21, 'years'));
      const changedDate = moment(fullDate).format('MM / DD / YYYY');
      const newDateFormat = moment(fullDate).format('YYYY-MM-DD');
      setDateformat(newDateFormat);
      setDate(changedDate);
    } else {
      setShow(false);
      const month = selectedDate.getMonth() + 1;
      const selectedMonth = month < 10 ? '0' + month : month;
      const day = selectedDate.getDate();
      const selectedDay = day < 10 ? '0' + day : day;
      const year = selectedDate.getFullYear();
      const fullDate = selectedMonth + ' / ' + selectedDay + ' / ' + year;
      const newDateFormat = year + '-' + selectedMonth + '-' + selectedDay;
      setDateformat(newDateFormat);
      setDate(fullDate);
    }
  };

  const dummyCustomerData = [
    {
      id: 1,
      name: 'All Customers',
    },
    {
      id: 2,
      name: 'New Customers',
    },
    {
      id: 3,
      name: 'Returning Customers',
    },
    {
      id: 5,
      name: 'Online Customers',
    },
    {
      id: 6,
      name: 'Walking Customers',
    },
  ];

  const dummyUser = [
    {
      user_id: '7213e5a8-dd0c-470a-addf-41dd9e1cfc90',
      seller_id: 'b169ed4d-be27-44eb-9a08-74f997bc6a2f',
      total_orders: 8,
      total_products: 16,
      life_time_spent: 287.2,
      user_details: {
        uid: '7213e5a8-dd0c-470a-addf-41dd9e1cfc90',
        email: 'mandeep@yopmail.com',
        firstname: 'mandeep Singh',
        middlename: null,
        lastname: 'singh',
        profile_photo:
          'https://jobrs3bucket.s3.amazonaws.com/document/20236/profile-d74e9440-f4d8-46f2-aba5-c6ad137cf674.jpg',
        banner_image: null,
        username: 'mandeep',
        current_address: {
          city: 'Orange County',
          state: 'FL',
          country: 'US',
          zipcode: '32824',
          latitude: 28.3841579,
          longitude: -81.3164274,
          address_type: 'home',
          street_address: '12340 Boggy Creek Road',
        },
        zipcode: null,
        phone_number: '+18989898989',
      },
      seller_details: {
        uid: 'b169ed4d-be27-44eb-9a08-74f997bc6a2f',
        email: 'man@yopmail.com',
        firstname: 'Galib',
        middlename: null,
        lastname: 'Pathan',
        profile_photo:
          'https://media.istockphoto.com/vectors/user-avatar-profile-icon-black-vector-illustration-on-transparent-vector-id1313958250?k=20&m=1313958250&s=612x612&w=0&h=vCvfwHB-pUpqWoB7wT2ifkKEL1qa5lhxxUPLIsgER00=',
        banner_image:
          'https://t3.ftcdn.net/jpg/03/35/51/06/360_F_335510693_HY7mLg3ARdLccKoXk3m66NLDpJRJh51p.jpg',
        username: 'Pathan',
        current_address: {
          city: 'New York County',
          state: 'NY',
          country: 'US',
          zipcode: '10013',
          latitude: 40.7243799,
          longitude: -74.01072719999999,
          address_type: 'home',
          street_address: '456 Washington Street',
        },
        zipcode: null,
        phone_number: '+17038712986',
      },
    },
    {
      user_id: '65f95b0e-7010-44c0-951a-e81b836eadfc',
      seller_id: 'b169ed4d-be27-44eb-9a08-74f997bc6a2f',
      total_orders: 8,
      total_products: 14,
      life_time_spent: 270.82,
      user_details: {
        uid: '65f95b0e-7010-44c0-951a-e81b836eadfc',
        email: 'idgfiasdgig@yopmail.com',
        firstname: 'Manpreet',
        middlename: null,
        lastname: 'Singh',
        profile_photo:
          'https://jobrs3bucket.s3.amazonaws.com/document/20237/profile-2aa431af-50c4-4a19-bf80-90f959416988.jpg',
        banner_image: null,
        username: 'msingh',
        current_address: {
          city: 'Philadelphia County',
          state: 'PA',
          country: 'US',
          zipcode: '19107',
          latitude: 39.95171629999999,
          longitude: -75.161202,
          address_type: 'home',
          street_address: '1234 Market Street',
        },
        zipcode: null,
        phone_number: '+16162636465',
      },
      seller_details: {
        uid: 'b169ed4d-be27-44eb-9a08-74f997bc6a2f',
        email: 'man@yopmail.com',
        firstname: 'Galib',
        middlename: null,
        lastname: 'Pathan',
        profile_photo:
          'https://media.istockphoto.com/vectors/user-avatar-profile-icon-black-vector-illustration-on-transparent-vector-id1313958250?k=20&m=1313958250&s=612x612&w=0&h=vCvfwHB-pUpqWoB7wT2ifkKEL1qa5lhxxUPLIsgER00=',
        banner_image:
          'https://t3.ftcdn.net/jpg/03/35/51/06/360_F_335510693_HY7mLg3ARdLccKoXk3m66NLDpJRJh51p.jpg',
        username: 'Pathan',
        current_address: {
          city: 'New York County',
          state: 'NY',
          country: 'US',
          zipcode: '10013',
          latitude: 40.7243799,
          longitude: -74.01072719999999,
          address_type: 'home',
          street_address: '456 Washington Street',
        },
        zipcode: null,
        phone_number: '+17038712986',
      },
    },
  ];

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? COLORS.primary : COLORS.textInputBackground;
    const color = item.id === selectedId ? COLORS.white : COLORS.dark_grey;

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        color={color}
      />
    );
  };

  const Item = ({ item, onPress, backgroundColor, color }) => (
    <TouchableOpacity style={[styles.horizontalCustomerCon, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.horizCustomerText, { color }]}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerMainView}>
        <TouchableOpacity style={styles.deliveryView} onPress={backHandler}>
          <Image source={leftBack} style={styles.backIcon} />
          <Text style={styles.backTitle}>{'Back'}</Text>
        </TouchableOpacity>
        <View style={styles.deliveryView}>
          <TouchableOpacity>
            <Image source={bell} style={[styles.truckStyle, { right: 20 }]} />
          </TouchableOpacity>
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyles}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
      <View style={{ paddingLeft: ms(10) }}>
        <FlatList
          data={dummyCustomerData}
          extraData={dummyCustomerData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>
      <Spacer space={SH(10)} />
      {/* Date and Area section */}
      <View style={styles.orderTypeCon}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.datePickerCon} onPress={() => setShow(!show)}>
            <Image source={calendar1} style={styles.calendarStyle} />
            <TextInput
              value={date}
              returnKeyType={'done'}
              pointerEvents={'none'}
              autoCapitalize={'none'}
              editable={false}
              placeholder="Date"
              placeholderTextColor={COLORS.gerySkies}
              style={styles.txtInput}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            mode={'date'}
            isVisible={show}
            onConfirm={onChangeDate}
            onCancel={() => setShow(false)}
            maximumDate={new Date(moment().subtract(21, 'years'))}
          />
          <View style={{ marginHorizontal: moderateScale(10) }}>
            <TableDropdown placeholder="Area" />
          </View>
        </View>
      </View>

      {/*Calendar pagination section */}
      <View style={[styles.jbrTypeCon, { zIndex: -1 }]}>
        <View style={styles.paginationEnd}>
          <Text style={[styles.paginationCount, { fontSize: 12 }]}>
            {strings.customers.showResult}
          </Text>
          <View style={{ marginHorizontal: moderateScale(10) }}>
            <DropDownPicker
              ArrowUpIconComponent={({ style }) => (
                <Image source={dropdown2} style={styles.dropDownIconPagination} />
              )}
              ArrowDownIconComponent={({ style }) => (
                <Image source={dropdown2} style={styles.dropDownIconPagination} />
              )}
              style={styles.dropdown}
              containerStyle={[
                styles.containerStylePagination,
                { zIndex: Platform.OS === 'ios' ? 20 : 1 },
              ]}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              listItemLabelStyle={styles.listItemLabelStyle}
              labelStyle={styles.labelStyle}
              selectedItemLabelStyle={styles.selectedItemLabelStyle}
              open={paginationModalOpen}
              value={paginationModalValue}
              items={paginationModalItems}
              setOpen={() => setPaginationModalOpen(!paginationModalOpen)}
              setValue={setPaginationModalValue}
              setItems={setPaginationModalItems}
              placeholder="5"
              placeholderStyle={styles.placeholderStylePagination}
              // onSelectItem={item => selectedNo(item.value)}
            />
          </View>
          <View style={styles.unionCon}>
            <Image source={Union} style={styles.unionStyle} />
          </View>
          <View style={styles.unionCon}>
            <Image source={mask} style={styles.unionStyle} />
          </View>
          <Text style={styles.paginationCount}>{strings.wallet.paginationCount}</Text>
          <View style={[styles.unionCon, { backgroundColor: COLORS.white }]}>
            <Image source={maskRight} style={styles.unionStyle} />
          </View>
          <View style={[styles.unionCon, { backgroundColor: COLORS.white }]}>
            <Image source={unionRight} style={styles.unionStyle} />
          </View>
        </View>
      </View>

      <View style={{ zIndex: -9 }}>
        <Table>
          <View
            style={[
              styles.tableDataHeaderCon,
              { borderTopWidth: 1, borderColor: COLORS.solidGrey },
            ]}
          >
            <View style={styles.displayFlex}>
              <View style={styles.tableHeaderLeft}>
                <Text style={styles.tableTextHeaFirst}>#</Text>
                <Text style={[styles.tableTextHea, { marginLeft: 30 }]}>Name</Text>
              </View>
              <View style={styles.tableHeaderRight}>
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

          <View style={{ zIndex: -9, height: ms(285) }}>
            <ScrollView>
              {dummyUser?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.tableDataCon, { zIndex: -99 }]}
                  activeOpacity={0.7}
                  onPress={() => profileClickHandler(item)}
                  // onPress={profileClickHandler}
                >
                  <View style={styles.displayFlex}>
                    <View style={styles.tableHeaderLeft}>
                      <Text style={styles.tableTextDataFirst}>{index + 1}</Text>
                      <View style={[styles.flexAlign, { marginLeft: 10 }]}>
                        <Image
                          source={{ uri: item?.user_details?.profile_photo ?? userImage }}
                          style={styles.lovingStyleData}
                        />
                        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                          <Text style={styles.tableTextDataName}>
                            {item?.user_details?.firstname}
                            rtghj
                          </Text>
                          {item?.user_details ? (
                            <Text
                              style={[styles.tableTextDataAdd, { color: COLORS.gerySkies }]}
                              numberOfLines={1}
                            >
                              {item?.user_details?.current_address?.street_address},
                              {item?.user_details?.current_address?.city},
                              {item?.user_details?.current_address?.state},
                              {item?.user_details?.current_address?.country},
                              {item?.user_details?.current_address?.postal_code}
                            </Text>
                          ) : (
                            <Text></Text>
                          )}
                        </View>
                      </View>
                    </View>
                    <View style={styles.tableHeaderRight}>
                      <View style={styles.tableHeaderRightInner}>
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
                          {item?.life_time_spent?.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Table>
      </View>
    </View>
  );
};

export default memo(AllUsers);
