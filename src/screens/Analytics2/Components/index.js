import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SF, SH } from '@/theme';
import { NewChartKit, Spacer } from '@/components';
import { styles } from '../Analytics2.styles';

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
      <Spacer space={SH(10)} />
      <View style={styles.displayFlex}>
        <View>
          <Text style={styles.darkBlackText}>{header}</Text>
          <Text style={[styles.darkBlackText, { fontSize: SF(24) }]}>
            {isLoading ? <ActivityIndicator color={COLORS.primary} size={'small'} /> : subHeader}
          </Text>
        </View>
        {rightHeader && (
          <View>
            <View style={styles.flexAlign}>
              <View style={styles.bullets} />
              <Text style={styles.bulletText}>{bulletText ? bulletText : 'Delivered'}</Text>
            </View>
            <View style={styles.flexAlign}>
              <View style={[styles.bullets, { backgroundColor: COLORS.violet }]} />
              <Text style={styles.bulletText}>{'Returned'}</Text>
            </View>
            <View style={styles.flexAlign}>
              <View style={[styles.bullets, { backgroundColor: COLORS.red }]} />
              <Text style={styles.bulletText}>{'Cancelled'}</Text>
            </View>
          </View>
        )}
      </View>
      {isLoading ? (
        <View style={styles.loaderView}>
          <ActivityIndicator color={COLORS.primary} size={'small'} />
        </View>
      ) : (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
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
        </TouchableOpacity>
      )}
    </View>
  );
}
