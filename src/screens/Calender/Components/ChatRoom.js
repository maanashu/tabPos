import { COLORS } from '@/theme';
import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, View, Image, Text, Keyboard } from 'react-native';
import { GiftedChat, Send, InputToolbar, MessageImage, Bubble } from 'react-native-gifted-chat';
import Modal from 'react-native-modal';
import {
  messageSend,
  attachPic,
  addAttachment,
  closeX,
  attachIcon,
  AttachIcon,
  pin,
} from '@/assets';
import { ms } from 'react-native-size-matters';
import { styles } from '../Calender.styles';
import { Fonts, crossButton } from '@/assets';
import io from 'socket.io-client';
import ProfileImage from '@/components/ProfileImage';
import { useFocusEffect } from '@react-navigation/native';
// const socket = io('https://apichat.jobr.com:8007/');

export const ChatRoom = ({ isVisible, setIsVisible, customerData, customerAddress }) => {
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [bottomOffset, setbottomOffset] = useState(0);
  const [showView, setShowView] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const handleKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };
  const handleKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };
  const socket = io(`https://apichat.jobr.com:8007?userId=${customerData?.id}`, {
    path: '/api/v1/connect',
  });
  // const socket = io('https://apichat.jobr.com:8007/');

  useFocusEffect(
    React.useCallback(() => {
      socket.on('connect', () => {
        setIsSocketConnected(true);
      });

      return () => {
        socket.on('disconnect', () => {
          setIsSocketConnected(false);
        });
        // Clean up the socket connection when the component unmounts
        socket.disconnect();
      };
    }, [])
  );
  // console.log(' socket', isSocketConnected);
  // useEffect(() => {
  //   socket.on('get_messages', (message) => {
  //     console.log('object,messa', message);
  //     setMessages((previousMessages) =>
  //       GiftedChat.append(previousMessages, {
  //         ...message,
  //         createdAt: new Date(message.createdAt),
  //       })
  //     );
  //   });
  //   return () => {
  //     socket.off('get_messages');
  //   };
  // }, []);

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
    // const params = {
    //   recipient_id: customerData?.id,
    //   media_type: 'text',
    //   business_card: 'e',
    //   content: messages[0]?.text,
    //   chatHeadType: 'directchat',
    // };
    // console.log('Params', params);
    // socket.emit('send_message', {
    //   ...params,
    // });

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
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 2,
            elevation: 4,
          },
          left: {
            // Styling for recipient's bubble
            backgroundColor: '#EFEFEF',
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 2,
            elevation: 4,
          },
        }}
        textStyle={{
          right: {
            // Styling for sender's text
            color: '#FFFFFF',
          },
          left: {
            // Styling for recipient's text
            color: 'black',
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
      <View style={{ bottom: isKeyboardOpen ? ms(-35) : ms(-18) }}>
        <InputToolbar
          {...props}
          containerStyle={[
            {
              borderRadius: 20,
              marginHorizontal: 15,
              borderTopColor: COLORS.primary,
              borderWidth: 1,
              borderColor: COLORS.primary,
              paddingHorizontal: 10,
              minHeight: ms(40),
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
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ alignItems: 'center', alignSelf: 'center' }}
                onPress={() => alert('Coming soon')}
              >
                <Image source={AttachIcon} resizeMode="stretch" style={styles.attachIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
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
              </TouchableOpacity>
            </View>
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
          width: '90%',
          alignSelf: 'center',
          backgroundColor: COLORS.white,
          marginVertical: ms(20),
          borderRadius: ms(10),
          overflow: 'hidden',
          marginTop: isKeyboardOpen ? ms(-20) : ms(0),
        }}
      >
        <TouchableOpacity
          onPress={() => setIsVisible(false)}
          style={[styles.crossEventDetailModal, { zIndex: 99 }]}
        >
          <Image source={crossButton} style={[styles.crossStl, { tintColor: COLORS.white }]} />
        </TouchableOpacity>
        <View
          style={{
            height: ms(40),
            backgroundColor: COLORS.primary,
            width: '100%',
            justifyContent: 'center',
            padding: ms(10),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              marginTop: ms(5),
              justifyContent: 'space-between',
            }}
          >
            <ProfileImage
              source={{ uri: customerData?.profile_photo }}
              style={styles.customerUserProfile}
            />
            <View style={{ marginLeft: ms(6), flex: 1 }}>
              <Text style={[styles.customerName, { color: COLORS.white }]}>
                {customerData?.firstname + ' ' + customerData?.lastname}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={pin}
                  style={[styles.eventAddressIcon, { tintColor: COLORS.white, marginRight: ms(2) }]}
                />
                <Text style={[styles.eventAddress, { color: COLORS.white }]}>
                  {customerAddress}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <GiftedChat
          forceGetKeyboardHeight={true}
          alwaysShowSend={true}
          keyboardShouldPersistTaps={'never'}
          scrollToBottom={true}
          isKeyboardInternallyHandled={true}
          bottomOffset={bottomOffset}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          renderBubble={renderBubble}
          // renderSend={renderSend}
          renderAvatar={renderAvatar}
          messagesContainerStyle={{
            paddingBottom: isKeyboardOpen ? ms(-25) : ms(25),
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
