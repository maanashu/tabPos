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
import { getUser } from '@/selectors/UserSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, sendChat } from '@/actions/ChatAction';
import { Loader } from '@/components/Loader';
import { TYPES } from '@/Types/Types';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getMessagesData } from '@/selectors/ChatSelector';
// const socket = io('https://apichat.jobr.com:8007/');

export const ChatRoom = ({ isVisible, setIsVisible, customerData, customerAddress }) => {
  const dispatch = useDispatch();
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [bottomOffset, setbottomOffset] = useState(0);
  const [showView, setShowView] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [attachModal, setAttachModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingMsg, setisLoadingMsg] = useState(false);
  const user = useSelector(getUser);
  const chatData = useSelector(getMessagesData);
  const USER_DATA = user?.posLoginData?.user_profiles;
  const handleKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };
  const handleKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };
  // const socket = io(`https://apichat.jobr.com:8007?userId=${user?.posLoginData?.uid}`, {
  //   path: '/api/v1/connect',
  // });
  // useFocusEffect(
  //   React.useCallback(() => {
  //     socket.on('connect', () => {
  //       console.log(socket?.id);
  //       setIsSocketConnected(true);
  //     });
  //     return () => {
  //       socket.on('disconnect', () => {
  //         setIsSocketConnected(false);
  //       });
  //       socket.disconnect();
  //     };
  //   }, [])
  // );
  // useEffect(() => {
  //   socket.emit('get_messages', {
  //     id: customerData?.uid,
  //     idtype: 'partnerid',
  //   });
  //   socket.on('get_messages', (message) => {
  //     console.log('object,messa', JSON.stringify(message));

  //     const arr = message?.data?.data.map((item) => {
  //       return {
  //         _id: item?._id,
  //         text: item?.content,
  //       };
  //     });
  //     console.log('Sdsad', arr);
  //     setMessages(arr);
  //     // setMessages((previousMessages) =>
  //     //   GiftedChat.append(previousMessages, {
  //     //     arr,
  //     //     // createdAt: new Date(message.createdAt),
  //     //   })
  //     // );
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

  // const onSend = useCallback((messages = []) => {
  //   const params = {
  //     recipient_id: customerData?.uid,
  //     // sender_id: user?.posLoginData?.uuid,
  //     media_type: 'text',
  //     business_card: 'e',
  //     content: messages[0]?.text,
  //     chatHeadType: 'directchat',
  //   };
  //   console.log('Params', params);
  //   socket.emit('send_message', { params });

  //   // socket.on('send_message', (message) => {
  //   //   console.log('messgae', JSON.stringify(message));
  //   // });

  //   socket.emit('get_messages', {
  //     id: customerData?.uid,
  //     idtype: 'partnerid',
  //   });
  //   socket.on('get_messages', (message) => {
  //     console.log('object,messa', JSON.stringify(message));
  //   });
  //   setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  // }, []);
  // console.log('ss', JSON.stringify(messages));

  // const onDeleteMessage = () => {
  //   socket.emit('delete_messagehead', {
  //     chathead_id: '64edd095f73f461358b9a985',
  //   });
  //   socket.on('delete_messagehead', (message) => {
  //     console.log('Deleted', JSON.stringify(message));
  //   });
  // };
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
            marginVertical: ms(2),
          },
          left: {
            // Styling for recipient's bubble
            backgroundColor: '#EFEFEF',
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 2,
            elevation: 4,
            marginVertical: ms(2),
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

        <Send {...props} containerStyle={{ justifyContent: 'center', marginVertical: ms(2) }}>
          <Image source={messageSend} resizeMode="stretch" style={styles.sendIcon} />
        </Send>
      </View>
    );
  };
  const isLoadingMessages = useSelector((state) => isLoadingSelector([TYPES.GET_MESSAGES], state));
  const isLoadingSendMessage = useSelector((state) => isLoadingSelector([TYPES.SEND_CHAT], state));
  const renderAvatar = () => null;
  const renderCustomInputToolbar = (props) => {
    return (
      <View style={{ bottom: isKeyboardOpen ? ms(-35) : ms(-16) }}>
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
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 2,

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
                    marginVertical: ms(3),
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

  //API methods
  // const allMessages = useSelector((state) => state?.chat?.getMessages?.messages);
  useEffect(() => {
    // dispatch(getMessages(23));
    if (chatData) {
      console.log('sdsdsdsdsd');
      const formattedMessages = formatMessages(chatData?.getMessages?.messages)?.reverse();
      // setMessages(formattedMessages);
    }
  }, [chatData]);

  const formatMessages = (messages) => {
    return messages?.map((message) => {
      return {
        _id: message.recipient_id,
        text: message.content,
        createdAt: new Date(message.created_at),
        user: {
          _id: message.sender_id,
          avatar: null,

          // You can add more user properties if needed, like name, avatar, etc.
        },
      };
    });
  };
  const onSend = useCallback((newMessages) => {
    setisLoading(true);
    dispatch(
      sendChat({
        recipient_id: customerData?.uid,
        content: newMessages[0]?.text,
      })
    )
      .then((res) => {
        setisLoading(false);
        setisLoadingMsg(true);
        dispatch(getMessages(res?.payload?.messagehead_id))
          .then((res) => {
            setisLoadingMsg(false);
            // const formattedMessages = formatMessages(chatData?.getMessages?.messages)?.reverse();
            // setMessages(formattedMessages);
          })
          .catch((error) => {
            setisLoadingMsg(false);
          });
      })
      .catch((error) => {
        setisLoading(false), console.log('Catsasahshashahsahsahshash', error);
      });
  }, []);

  return (
    <Modal isVisible={isVisible}>
      <View
        style={{
          flex: 1,
          width: '55%',
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
        {isLoadingSendMessage && <Loader message="Sending message..." />}
        {isLoadingMessages && <Loader message="Loading new messages..." />}
        <GiftedChat
          maxComposerHeight={ms(50)}
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
            paddingHorizontal: ms(8),
            paddingBottom: isKeyboardOpen ? ms(-25) : ms(25),
          }}
          user={{
            _id: user?.posLoginData?.uid,
            name: USER_DATA?.firstname,
            email: USER_DATA?.email,
            phoneNumber: USER_DATA?.phone_no,
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
