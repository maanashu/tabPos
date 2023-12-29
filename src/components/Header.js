import React, { memo } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import moment from 'moment';

import { COLORS, SF, Fonts } from '@/theme';
import { Sun, Divider } from '@/assets';

const Header = ({ invoiceNo, posIn }) => {
  const currentTime = moment.utc().format('h:mm A');
  const currentDate = moment.utc().format('dddd, Do MMMM YYYY');

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={Sun} style={styles.icon} />
        <Text style={styles.dateText}>{currentTime}</Text>
        <Image source={Divider} style={styles.divider} />
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.invoiceText}>{`Invoice No: ${invoiceNo ?? 0}`}</Text>
        <Text style={styles.invoiceText}>{`POS No: ${posIn ?? 0}`}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.walkInText}>Walk-in</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: ms(25),
    paddingHorizontal: ms(10),
    backgroundColor: COLORS.sky_grey,

    // flex: 0.98,
  },
  leftSection: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  middleSection: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: ms(4),
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: ms(20),
    alignSelf: 'center',
    position: 'absolute',
    right: ms(8),
  },
  icon: {
    width: ms(18),
    height: ms(18),
  },
  divider: {
    width: ms(1),
    height: ms(20),
  },
  dateText: {
    fontSize: SF(14),
    color: COLORS.faded_purple,
  },
  invoiceText: {
    fontSize: SF(14),
    color: COLORS.faded_purple,
    marginHorizontal: ms(10),
  },
  walkInText: {
    fontSize: SF(14),
    color: COLORS.faded_purple,
    marginHorizontal: ms(4),
  },
});

export default memo(Header);
