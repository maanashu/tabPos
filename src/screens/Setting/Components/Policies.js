import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import { ellipse } from '@/assets';
import { LEGALDATA, policyLabelData } from '@/constants/flatListData';
import Modal from 'react-native-modal';
import { moderateVerticalScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';

export function Policies() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);

  const legalArray = getSettingData?.getSetting?.legal;
  console.log('legalArray', legalArray);
  const [countryId, setCountryId] = useState(null);
  const [legalModal, setLegalModal] = useState(false);

  const Item = ({ item, onPress, tintColor }) => (
    <TouchableOpacity
      style={styles.legalViewStyle}
      onPress={() => setLegalModal(true)}
    >
      <View style={styles.dateViewStyle}>
        <View>
          <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
            {item.publishDate}
          </Text>
          <Text style={[styles.securitysubhead, { fontSize: SF(10) }]}>
            {item.dateTime}
          </Text>
        </View>

        <TouchableOpacity style={styles.activebuttonStyle}>
          {/* <Image
            source={ellipse}
            style={[styles.circlImageStyle, { tintColor }]}
          /> */}
          <Text style={styles.activeTextStyle}>{item.active}</Text>
        </TouchableOpacity>
      </View>
      <Spacer space={SH(5)} />
      <View style={{ alignItems: 'center' }}>
        <View style={styles.legalView}>
          <Text style={[styles.selectHead, { fontSize: SF(14) }]}>
            {item.titleName}
          </Text>
          <Spacer space={SH(3)} />
          <Text style={styles.securitysubhead}>{item.title}</Text>
          <Spacer space={SH(1)} />
          <Text style={styles.securitysubhead}>{item.title1}</Text>
        </View>
      </View>
      <Spacer space={SH(5)} />
      <Text style={styles.updateTextStyle}>{item.update}</Text>
      <Text style={styles.updateTextStyle}>{item.Lastupdatedate}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const tintColor = item.id === countryId ? COLORS.primary : null;

    return (
      <Item
        item={item}
        onPress={() => setCountryId(item.id)}
        tintColor={tintColor}
      />
    );
  };
  return (
    <View>
      <Text style={styles.HeaderLabelText}>Policies</Text>
      <Spacer space={SH(20)} />
      <FlatList
        numColumns={3}
        data={policyLabelData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={LEGALDATA}
      />
      <Modal animationType="slide" transparent={true} isVisible={legalModal}>
        <View style={styles.legalModalCon}>
          <View style={{ paddingHorizontal: moderateVerticalScale(12) }}>
            <Spacer space={SH(10)} />
            <Text style={styles.refundPolicy}>
              Terms and Conditions for Company Name
            </Text>
            <Spacer space={SH(10)} />
            <Text style={[styles.refundPolicy, { fontSize: SF(13) }]}>
              {strings.settings.intro}
            </Text>
            <Spacer space={SH(5)} />
            <Text style={[styles.refundPolicyRegular, { fontSize: SF(13) }]}>
              These Website Standard Terms and Conditions written on this
              webpage shall manage your use of our website, Webiste Name
              accessible at Website.com. These Terms will be applied fully and
              affect to your use of this Website. By using this Website, you
              agreed to accept all terms and conditions written in here. You
              must not use this Website if you disagree with any of these
              Website Standard Terms and Conditions. Minors or people below 18
              years old are not allowed to use this Website. Intellectual
              Property Rights Other than the content you own, under these Terms,
              Company Name and/or its licensors own all the intellectual
              property rights and materials contained in this Website. You are
              granted limited license only for purposes of viewing the material
              contained on this Website.
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <View style={styles.closeCon}>
            <TouchableOpacity
              style={styles.closeButtonCon}
              onPress={() => setLegalModal(false)}
            >
              <Text style={styles.Close}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
