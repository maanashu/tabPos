import { Image } from 'react-native';
import React from 'react';
import { userImage } from '@/assets';

const ProfileImage = ({ source, style }) => {
  return <Image source={source?.uri ? source : userImage} style={style} />;
};

export default ProfileImage;
