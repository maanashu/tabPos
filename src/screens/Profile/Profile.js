import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '@/actions/UserActions';
import { Button } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Profile/Profile.styles';
import { TextStyles } from '@/theme';

export function Profile() {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={[TextStyles.title, styles.title, { color: colors.text }]}>
        {strings.profile.message}
      </Text>
      <Button title={strings.profile.logout} onPress={logoutUser} />
    </View>
  );
}
 {/* <View style={{ paddingHorizontal: moderateScale(10) }}>
            <View style={styles.displayFlex}>
              <Text style={styles.moreActText}>
                {strings.posSale.paymentdetail}
              </Text>
              <TouchableOpacity onPress={choosePaymentCloseHandler}>
                <Image source={crossButton} style={styles.crossButtonStyle} />
              </TouchableOpacity>
            </View>
            <Spacer space={SH(40)} />
            <Text style={[styles.payDoneText, {fontSize:SF(20), alignSelf:'center'}]}>{strings.posSale.paymenttdone}</Text>
            <Spacer space={SH(10)} />
            <View style={styles.paymentDone}>
              <View style={[styles.displayFlex, {paddingHorizontal:moderateScale(10)}]}>
                <View>
                <Text style={styles.payDoneText}>Payable $254.60</Text>
                <Spacer space={SH(10)} />
                <Text style={styles.payDoneText}>Tips $254.60</Text>
                  </View>
                <Text style={styles.darkPricestyle}>$306.60</Text>

              </View>
            </View>
            <Spacer space={SH(10)} />
            <Text style={styles.jbrWalllettext}>
              <Text style={styles.viaText}>Via </Text>JBR Wallet
            </Text>
            <Spacer space={SH(20)} />
            <View style={styles.customerCon}>
            <Spacer space={SH(20)} />
                <Text style={styles.customerHeading}>Customer</Text>
                <Spacer space={SH(20)} />
                <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                  <Image source={jbrCustomer} style={styles.jbrCustomer}/>
                   <View style={{paddingHorizontal:moderateScale(15)}}>
                   <Text style={[styles.cusAddText, {fontSize:SF(20)}]}>Terry Moore</Text>
                   <Spacer space={SH(8)} />
                   <Text style={styles.cusAddText}>803-238-2630</Text>
                   <Spacer space={SH(5)} />
                   <Text style={styles.cusAddText}>harryrady@jourrapide.com</Text>
                   <Spacer space={SH(8)} />
                   <Text style={styles.cusAddText}>4849 Owagner Lane</Text>
                     <Text style={styles.cusAddText}>Seattle, WA 98101</Text>
                   </View>
                  </View>
                  <View style={styles.walletIdButtonCon}>
                    <Text style={styles.walletIdcontent}>Wallet Id</Text>
                    <Spacer space={SH(5)} />
                    <Text style={[styles.cusAddText, {color:COLORS.primary}]}>509 236 2365</Text>
                  </View>
            </View>
            <Spacer space={SH(30)} />
          </View> */} {/* <DropDownPicker
                      ArrowUpIconComponent={({ style }) => (
                        <Image source={dropdown2} style={styles.dropDownIcon} />
                      )}
                      ArrowDownIconComponent={({ style }) => (
                        <Image source={dropdown2} style={styles.dropDownIcon} />
                      )}
                      // style={styles.dropdown}
                      // containerStyle={[
                      //   styles.containerStyle,
                      //   { zIndex: Platform.OS === 'ios' ? 100 : 1 },
                      // ]}
                      style={styles.dropdown}
                      containerStyle={styles.containerStyle}
                      dropDownContainerStyle={styles.dropDownContainerStyle}
                      listItemLabelStyle={styles.listItemLabelStyle}
                      labelStyle={styles.labelStyle}
                      selectedItemLabelStyle={styles.selectedItemLabelStyle}
                      open={statusModalOpen}
                      value={statusModalValue}
                      items={statusItems}
                      setOpen={setStatusModelOpen}
                      setValue={setStatusModalValue}
                      setItems={setStatusItems}
                      placeholder="Status"
                      placeholderStyle={styles.placeholderStyle}
                    /> */}