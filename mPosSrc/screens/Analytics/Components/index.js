import React from 'react';
import { ActivityIndicator, Platform, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SF, SH } from '@/theme';
import { NewChartKit, Spacer } from '@mPOS/components';
import { styles } from '../styles';
import { ms } from 'react-native-size-matters';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
    <View
      style={[
        styles.totalProductCon,
        style,
        isLoading && {
          height: Platform.OS === 'android' ? windowHeight * 0.35 : windowHeight * 0.28,
        },
      ]}
    >
      <TouchableOpacity onPress={onPress} disabled={disabled} style={{ paddingBottom: ms(10) }}>
        <Spacer space={SH(10)} />
        <View>
          <View>
            <Text style={styles.darkBlackText}>{header}</Text>
            <Text style={[styles.darkBlackText, { fontSize: SF(24) }]}>
              {isLoading ? <ActivityIndicator color={COLORS.primary} size={'small'} /> : subHeader}
            </Text>
          </View>
          {rightHeader && (
            <View style={{ flexDirection: 'row', marginTop: ms(5) }}>
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
