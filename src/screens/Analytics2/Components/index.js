import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SF, SH } from '@/theme';
import { NewChartKit, Spacer } from '@/components';
import { styles } from '../Analytics2.styles';
import { ms } from 'react-native-size-matters';

export function HomeGraph({
  header,
  subHeader,
  data,
  labels,
  arrayLength,
  onPress,
  rightHeader,
  data1,
  data2,
  bulletText,
  disabled,
  style,
  isLoading,
  filter,
  startDated,
  endDated,
}) {
  return (
    <View style={[styles.totalProductCon, style]}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Spacer space={SH(10)} />
        {/* <View style={styles.displayFlex}> */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.darkBlackText, { flex: 1 }]}>{header}</Text>
          <Text style={styles.darkBlackText}>
            {isLoading ? <ActivityIndicator color={COLORS.dark_blue} size={'small'} /> : subHeader}
          </Text>
        </View>
        {rightHeader && (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: ms(4) }}>
            <View style={styles.bulletView}>
              <View style={[styles.bullets, { backgroundColor: COLORS.medium_purple }]} />
              <Text style={[styles.bulletText, { color: COLORS.dark_purple }]}>
                {bulletText ? bulletText : 'Delivered'}
              </Text>
            </View>
            <View style={[styles.bulletView, { backgroundColor: COLORS.light_yellow }]}>
              <View style={[styles.bullets, { backgroundColor: COLORS.medium_yellow }]} />
              <Text style={[styles.bulletText, { color: COLORS.dark_yellow }]}>{'Returned'}</Text>
            </View>
            <View style={[styles.bulletView, { backgroundColor: COLORS.light_red }]}>
              <View style={[styles.bullets, { backgroundColor: COLORS.medium_red }]} />
              <Text style={[styles.bulletText, { color: COLORS.dark_red }]}>{'Cancelled'}</Text>
            </View>
          </View>
        )}
        {/* </View> */}
        {isLoading ? (
          <View style={styles.loaderView}>
            <ActivityIndicator color={COLORS.dark_blue} size={'small'} />
          </View>
        ) : (
          <NewChartKit
            data={data}
            arrayLength={arrayLength}
            labels={labels}
            data1={data1}
            data2={data2}
            filter={filter}
            startDated={startDated}
            endDated={endDated}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
