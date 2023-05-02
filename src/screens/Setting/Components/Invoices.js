import React from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { SF, SH, SW } from '@/theme';
import { View, Text, Image, ScrollView } from 'react-native';
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
} from '@/assets';

export function Invoices() {

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
                      <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                        {strings.settings.smshead}
                      </Text>
                      <Text
                        style={[styles.securitysubhead, { fontSize: SF(12) }]}
                      >
                        {strings.settings.smsSubHead}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.twoStepMemberCon}>
                <View style={styles.flexRow}>
                  <View style={styles.dispalyRow}>
                    <Image source={emailInvoice} style={styles.teamMember} />
                    <View style={styles.marginLeft}>
                      <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                        {strings.settings.emailHead}
                      </Text>
                      <Text
                        style={[styles.securitysubhead, { fontSize: SF(12) }]}
                      >
                        {strings.settings.emailSubHead}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.twoStepMemberCon}>
                <View style={styles.flexRow}>
                  <View style={styles.dispalyRow}>
                    <Image source={printInvoice} style={styles.teamMember} />
                    <View style={styles.marginLeft}>
                      <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                        {strings.settings.printHead}
                      </Text>
                      <Text
                        style={[styles.securitysubhead, { fontSize: SF(12) }]}
                      >
                        {strings.settings.printSubHead}
                      </Text>
                    </View>
                  </View>
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
          <View style={[styles.templateCon,{marginBottom: 10}]}>
             <Text   style={[styles.securitysubhead, { fontSize: SF(12) }]}>{strings.settings.publishDate}</Text>
             <Text style={styles.publishDate}>{strings.settings.date}</Text>
             <Spacer space={SH(20)} />
             <Image source={invoiceFrame} style={styles.invoiceFrame}/>
             <Spacer space={SH(20)} />
             <View style={styles.activateCon}>
             <Text  style={[styles.securitysubhead, { fontSize: SF(15) }]}>{strings.settings.activate}</Text>
            <View style={styles.emailSCon}>
            <Image source={emailS} style={[styles.emailS, styles.emailStint]}/>
            </View>
            <View style={styles.emailSCon}>
            <Image source={smsS} style={[styles.emailS, styles.emailStint]}/>
            </View>
            <View style={styles.emailSCon}>
            <Image source={printS} style={[styles.emailS, styles.emailStint]}/>
            </View>
             </View>
          </View>
        </View>
         </ScrollView>
      </View>
    </View>
  );
}
