import { COLORS } from '@/theme';
import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, View, Image, Text, Keyboard } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Modal from 'react-native-modal';
import { ms } from 'react-native-size-matters';
import { styles } from '../Calender.styles';
import { Fonts, crossButton } from '@/assets';

export const ChatRoom = ({ isVisible, setIsVisible }) => {
  const [messages, setMessages] = useState([]);

  const [bottomOffset, setbottomOffset] = useState(0);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  useEffect(() => {
    const keyboardListenerDidShow = Keyboard.addListener('keyboardDidShow', () => {
      setbottomOffset(100); // Make sure you have the state variable setBottomOffset defined
    });

    const keyboardListenerDidHide = Keyboard.addListener('keyboardDidHide', () => {
      setbottomOffset(0); // Make sure you have the state variable setBottomOffset defined
    });

    return () => {
      keyboardListenerDidShow.remove();
      keyboardListenerDidHide.remove();
    };
  }, []);

  return (
    <Modal isVisible={isVisible}>
      <View
        style={{
          flex: 1,
          width: '50%',
          alignSelf: 'center',
          backgroundColor: COLORS.white,
          marginVertical: ms(20),
          borderRadius: ms(10),
          overflow: 'hidden',
        }}
      >
        <TouchableOpacity
          onPress={() => setIsVisible(false)}
          style={[styles.crossEventDetailModal, { zIndex: 99 }]}
        >
          <Image source={crossButton} style={styles.crossStl} />
        </TouchableOpacity>
        <View
          style={{
            height: ms(40),
            backgroundColor: COLORS.textInputBackground,
            width: '100%',
            justifyContent: 'center',
            padding: ms(10),
          }}
        >
          <Text style={{ fontFamily: Fonts.SemiBold, fontSize: ms(10) }}>Customer Name</Text>
        </View>
        <GiftedChat
          isKeyboardInternallyHandled={true}
          bottomOffset={bottomOffset}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </Modal>
  );
};
