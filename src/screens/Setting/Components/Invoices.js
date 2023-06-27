import React, { useEffect, useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { SF, SH, SW } from '@/theme';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import {
  emailInvoice,
  emailS,
  invoice2,
  invoiceFrame,
  printInvoice,
  printS,
  smsInvoice,
  smsS,
  vector,
  vectorOff,
} from '@/assets';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { upadteApi } from '@/actions/SettingAction';

export function Invoices() {
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const data = {
    smsData: getSettingData?.getSetting?.invoice_sms_send_status,
    emailData: getSettingData?.getSetting?.invoice_email_send_status,
    printData: getSettingData?.getSetting?.print_invoice_status,
  };

  const [sms, setSms] = useState(data?.smsData);
  const [email, setEmail] = useState(data?.emailData);
  const [print, setPrint] = useState(data?.printData);

  useEffect(() => {
    if (getSettingData?.getSetting) {
      setSms(getSettingData?.getSetting?.invoice_sms_send_status);
      setEmail(getSettingData?.getSetting?.invoice_email_send_status);
      setPrint(getSettingData?.getSetting?.print_invoice_status);
    }
  }, [getSettingData?.getSetting]);

  const clickHandler = id => {
    if (id === 1) {
      const data = {
        invoice_sms_send_status: sms ? false : true,
      };
      dispatch(upadteApi(data));
    } else if (id === 2) {
      const data = {
        invoice_email_send_status: email ? false : true,
      };
      dispatch(upadteApi(data));
    } else if (id === 3) {
      const data = {
        print_invoice_status: print ? false : true,
      };
      dispatch(upadteApi(data));
    }
  };
  return (
    <View>
      <View style={[styles.flexRow, { height: SW(8) }]}>
        <Text style={styles.HeaderLabelText}>{strings.settings.invoice}</Text>
      </View>
      <Spacer space={SH(20)} />
      <View style={[styles.securityMainCon, styles.securityMainCon2]}>
        <ScrollView>
          <View style={styles.securityBodyCon}>
            <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
              <Image source={invoice2} style={styles.securityLogo} />
              <View style={styles.twoStepVerifiCon}>
                <Text style={styles.twoStepText}>
                  {strings.settings.invoiveHeading}
                </Text>
                <Spacer space={SH(10)} />
                <Text style={styles.securitysubhead}>
                  {strings.settings.invoiveSubHeading}
                </Text>
                <Spacer space={SH(20)} />
                <View style={styles.twoStepMemberCon}>
                  <View style={styles.flexRow}>
                    <View style={styles.dispalyRow}>
                      <Image source={smsInvoice} style={styles.teamMember} />
                      <View style={styles.marginLeft}>
                        <Text
                          style={[styles.twoStepText, { fontSize: SF(14) }]}
                        >
                          {strings.settings.smshead}
                        </Text>
                        <Text
                          style={[styles.securitysubhead, { fontSize: SF(12) }]}
                        >
                          {strings.settings.smsSubHead}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.vectorIconCon}
                      onPress={() => clickHandler(1)}
                    >
                      <Image
                        source={sms ? vector : vectorOff}
                        style={styles.toggleSecurity}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.twoStepMemberCon}>
                  <View style={styles.flexRow}>
                    <View style={styles.dispalyRow}>
                      <Image source={emailInvoice} style={styles.teamMember} />
                      <View style={styles.marginLeft}>
                        <Text
                          style={[styles.twoStepText, { fontSize: SF(14) }]}
                        >
                          {strings.settings.emailHead}
                        </Text>
                        <Text
                          style={[styles.securitysubhead, { fontSize: SF(12) }]}
                        >
                          {strings.settings.emailSubHead}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.vectorIconCon}
                      onPress={() => clickHandler(2)}
                    >
                      <Image
                        source={email ? vector : vectorOff}
                        style={styles.toggleSecurity}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.twoStepMemberCon}>
                  <View style={styles.flexRow}>
                    <View style={styles.dispalyRow}>
                      <Image source={printInvoice} style={styles.teamMember} />
                      <View style={styles.marginLeft}>
                        <Text
                          style={[styles.twoStepText, { fontSize: SF(14) }]}
                        >
                          {strings.settings.printHead}
                        </Text>
                        <Text
                          style={[styles.securitysubhead, { fontSize: SF(12) }]}
                        >
                          {strings.settings.printSubHead}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.vectorIconCon}
                      onPress={() => clickHandler(3)}
                    >
                      <Image
                        source={print ? vector : vectorOff}
                        style={styles.toggleSecurity}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {/* </View> */}
          </View>
          <Spacer space={SH(20)} />
          <View style={styles.securityBodyCon}>
            <Text style={styles.twoStepText}>
              {strings.settings.invoiceTemplate}
            </Text>
            <Spacer space={SH(20)} />
            <View style={[styles.templateCon, { marginBottom: 10 }]}>
              <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
                {strings.settings.publishDate}
              </Text>
              <Text style={styles.publishDate}>{strings.settings.date}</Text>
              <Spacer space={SH(20)} />
              <Image source={invoiceFrame} style={styles.invoiceFrame} />
              <Spacer space={SH(20)} />
              <View style={styles.activateCon}>
                <Text style={[styles.securitysubhead, { fontSize: SF(15) }]}>
                  {strings.settings.activate}
                </Text>
                <View style={styles.emailSCon}>
                  <Image
                    source={emailS}
                    style={[styles.emailS, styles.emailStint]}
                  />
                </View>
                <View style={styles.emailSCon}>
                  <Image
                    source={smsS}
                    style={[styles.emailS, styles.emailStint]}
                  />
                </View>
                <View style={styles.emailSCon}>
                  <Image
                    source={printS}
                    style={[styles.emailS, styles.emailStint]}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
{
  /* <TouchableOpacity
              style={styles.vectorIconCon}
              onPress={() => jbrCoinOnPress(3)}
            >
              <Image
                source={data?.card ? vector : vectorOff}
                style={styles.toggleSecurity}
              />
            </TouchableOpacity> */
}
