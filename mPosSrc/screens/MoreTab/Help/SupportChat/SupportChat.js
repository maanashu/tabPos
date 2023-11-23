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
import { Header, ScreenWrapper } from '@mPOS/components';
import styles from './SupportChat.styles';
// const socket = io('https://apichat.jobr.com:8007/');

export const SupportChat = (props) => {
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
  const ticketId = props?.route?.params?.id;

  const socket = io(`https://apichat.jobr.com:8007?userId=${user?.posLoginData?.uuid}`, {
    path: '/api/v1/connect',
  });
  useFocusEffect(
    React.useCallback(() => {
      socket.on('connect', () => {
        setIsSocketConnected(true);
        console.log('Connected');
        socket.emit('get_messages', {
          id: ticketId.toString(),
          idtype: 'ticket_id',
          // id: '652791b827509704e2b0b922',
          // idtype: 'chathead',
        });
        socket.on('get_messages', (message) => {
          // console.log('getMessagesLog', message?.data?.data?.[0]?.chathead_id);
          // setMessageHeadId(message?.data?.data?.[0]?.chathead_id);
          // const arr = message?.data?.data.map(item => {
          //   return {
          //     _id: item?._id,
          //     text: item?.content,
          //     createdAt: item?.createdAt,
          //     user: {
          //       _id: item?.sender_id,
          //     },
          //     // recipient_id: item?.recipient_id,
          //     // sender_id: item?.sender_id,
          //   };
          // });
          console.log('get messg', message?.data?.data);
          // setMessages(arr);
        });
      });
      return () => {
        socket.on('disconnect', () => {
          setIsSocketConnected(false);
        });
        socket.disconnect();
      };
    }, [])
  );

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

  const renderSend = (props) => {
    return (
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
    );
  };

  return (
    <ScreenWrapper>
      <Header backRequired title={'Support'} style={{ backgroundColor: COLORS.white }} />

      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        renderAvatar={false}
        onSend={(messages) => onSend(messages)}
        // renderInputToolbar={renderCustomInputToolbar}
        user={{
          _id: 1,
        }}
        alwaysShowSend
        messagesContainerStyle={{
          // paddingHorizontal: ms(8),
          paddingBottom: ms(10),
        }}
        renderSend={renderSend}
        renderInputToolbar={(props) => {
          return <InputToolbar {...props} containerStyle={styles.inputToolbarStyle}></InputToolbar>;
        }}
      />
    </ScreenWrapper>
  );
};
