import { COLORS } from '@/theme';
import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, View, Image, Text, Keyboard } from 'react-native';
import { GiftedChat, Send, InputToolbar, MessageImage, Bubble } from 'react-native-gifted-chat';
import Modal from 'react-native-modal';
import { messageSend, attachPic, addAttachment, closeX } from '@/assets';
import { ms } from 'react-native-size-matters';
import { styles } from '../Calender.styles';
import { Fonts, crossButton } from '@/assets';

export const ChatRoom = ({ isVisible, setIsVisible, recieverdata }) => {
  const [messages, setMessages] = useState([]);

  const [bottomOffset, setbottomOffset] = useState(0);
  const [showView, setShowView] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const handleKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
    // Additional actions you want to perform when the keyboard is shown
  };

  const handleKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
    // Additional actions you want to perform when the keyboard is hidden
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
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

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Styling for sender's bubble
            backgroundColor: '#007AFF',
          },
          left: {
            // Styling for recipient's bubble
            backgroundColor: '#7C7C7C',
          },
        }}
        textStyle={{
          right: {
            // Styling for sender's text
            color: '#FFFFFF',
          },
          left: {
            // Styling for recipient's text
            color: '#FFFFFF',
          },
        }}
      />
    );
  };
  const renderSend = (props) => {
    return (
      <View style={styles.sendView}>
        <TouchableOpacity>
          <Image source={attachPic} resizeMode="stretch" style={styles.chattingIcon} />
        </TouchableOpacity>

        <TouchableOpacity
        // onPress={moreOptions}
        >
          <Image
            source={showView ? closeX : addAttachment}
            resizeMode="stretch"
            style={styles.chattingIcon}
          />
        </TouchableOpacity>

        <Send {...props} containerStyle={{ justifyContent: 'center' }}>
          <Image source={messageSend} resizeMode="stretch" style={styles.sendIcon} />
        </Send>
      </View>
    );
  };
  const renderAvatar = () => null;
  const renderCustomInputToolbar = (props) => {
    return (
      <View style={{ bottom: isKeyboardOpen ? ms(-40) : ms(-18) }}>
        <InputToolbar
          {...props}
          containerStyle={[
            {
              borderRadius: 20,
              marginHorizontal: 15,
              borderWidth: 0.3,
              borderColor: COLORS.dark_grey,
              paddingHorizontal: 10,
              minHeight: ms(30),
              justifyContent: 'center',
              // position: !isKeyboardOpen ? "absolute" : undefined,
              // bottom: !isKeyboardOpen ? -70 : 0
            },
            // props.text.length >= 42 && Platform.OS == "ios" &&
            // {
            //   position: !isKeyboardOpen ? "absolute" : undefined,
            //   bottom: !isKeyboardOpen ? -70 : 0
            // }
          ]}
          // containerStyle={tw`h-14 justify-center items-center rounded-3 mx-5 mt-2 bg-dark-green`}

          renderSend={(props) => (
            <Send
              {...props}
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginHorizontal: 5,
              }}
            >
              <Image source={messageSend} resizeMode="stretch" style={styles.messageSend} />
            </Send>
          )}
        />
      </View>
    );
  };
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
          <Text style={{ fontFamily: Fonts.SemiBold, fontSize: ms(10) }}>{recieverdata}</Text>
        </View>
        <GiftedChat
          alwaysShowSend={true}
          keyboardShouldPersistTaps={'never'}
          scrollToBottom={true}
          isKeyboardInternallyHandled={true}
          // bottomOffset={bottomOffset}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          renderBubble={renderBubble}
          // renderSend={renderSend}
          renderAvatar={renderAvatar}
          messagesContainerStyle={{
            paddingBottom: ms(15),
          }}
          user={{
            _id: 1,
          }}
          renderInputToolbar={renderCustomInputToolbar}
          renderMessageImage={(props) => {
            return <MessageImage {...props} containerStyle={styles.messageProps}></MessageImage>;
          }}
        />
      </View>
    </Modal>
  );
};
