import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import {
  businessTrad,
  checkArrow,
  checkboxSec,
  crossButton,
  googleAuth,
  scurityScan,
  securityLogo,
  store,
  teamMember,
  toggleSecurity,
} from '@/assets';

export function Location() {
  const [twoStepModal, setTwoStepModal] = useState(false);
  const [googleAuthStart, setGoogleAuthStart] = useState(false);
  const [googleAuthScan, setGoogleAuthScan] = useState(false);

  return (
    <View>
      <View style={[styles.flexRow, { height: SW(8) }]}>
        <Text style={styles.HeaderLabelText}>{strings.settings.location}</Text>
      </View>
      <Spacer space={SH(20)} />
      <View style={styles.securityMainCon}>
        <View style={styles.securityBodyCon}>
           {/* <View style={{borderWidth:1, padding:20}}> */}
           <View style={[styles.dispalyRow, { alignItems: 'flex-start'}]}>
            <Image source={businessTrad} style={styles.securityLogo} />
            <View style={styles.twoStepVerifiCon}>
              <Text style={styles.twoStepText}>
                {strings.settings.businessLocation}
              </Text>
              <Spacer space={SH(10)} />
              <Text style={styles.securitysubhead}>
                {strings.settings.locationsubhead}
              </Text>
              <Spacer space={SH(20)} />
              <View
                style={styles.twoStepMemberCon}>
                <View style={styles.flexRow}>
                  <View style={styles.dispalyRow}>
                    <Image source={store} style={styles.teamMember} />
                    <View style={styles.marginLeft}>
                      <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                         Store
                      </Text>
                      <Text
                        style={[styles.securitysubhead, { fontSize: SF(12) }]}
                      >
                       2598 West Street, Holland, MI 49424
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={styles.twoStepMemberCon}>
                <View style={styles.flexRow}>
                  <View style={styles.dispalyRow}>
                    <Image source={store} style={styles.teamMember} />
                    <View style={styles.marginLeft}>
                      <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                         Wear House
                      </Text>
                      <Text
                        style={[styles.securitysubhead, { fontSize: SF(12) }]}>
                          2598 West Street, Holland, MI 49424
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
           {/* </View> */}
        </View>
      </View>

     
    </View>
  );
}
