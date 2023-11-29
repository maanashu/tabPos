import { COLORS } from '@/theme';
import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, View, Image, Text, Keyboard, ActivityIndicator } from 'react-native';
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
  const [messagesData, setMessages] = useState([]);
  const [messageHeadId, setMessageHeadId] = useState('');
  const [recipientId, setRecipientId] = useState();
  console.log('recedddipt', recipientId);

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
      setisLoading(true);
      socket.on('connect', () => {
        setIsSocketConnected(true);
        console.log('Connected');
        getMessages();
      });
      return () => {
        socket.on('disconnect', () => {
          setIsSocketConnected(false);
        });
        socket.disconnect();
      };
    }, [])
  );

  const getMessages = () => {
    socket.emit('get_messages', {
      id: ticketId.toString(),
      idtype: 'ticket_id',
    });

    socket.on('get_messages', (message) => {
      console.log('messages', message?.data?.data?.[0]?.recipient_id);
      setRecipientId(message?.data?.data?.[0]?.recipient_id);
      setMessageHeadId(message?.data?.data?.[0]?.chathead_id);
      const arr = message?.data?.data.map((item) => {
        return {
          _id: item?._id,
          text: item?.content,
          createdAt: item?.createdAt,
          user: {
            _id: item?.sender_id,
          },
        };
      });
      setMessages(arr);
      setisLoading(false);
    });
  };

  const onSend = (messages = []) => {
    const params = {
      recipient_id: recipientId,
      media_type: 'text',
      content: messages[0]?.text,
      chatHeadType: 'directchat',
      sender_id: user?.posLoginData?.uuid,
    };
    console.log('params: ' + JSON.stringify(params));
    socket.emit('send_message', params);

    socket.on('send_message', (msg) => {
      console.log('sending message', msg);
      setMessageHeadId(msg?.data?.chathead_id);
    });

    socket.on(`JobrUser_${messageHeadId}_room`, (data) => {
      console.log('room resp', data);
      const newMsg = {
        _id: data?.data?._id,
        text: data?.data?.content,
        user: {
          _id: data?.data?.sender_id,
        },
      };
      setMessages([...messagesData, newMsg]);
    });
  };

  const renderSend = (props) => {
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <Image source={messageSend} resizeMode="stretch" style={styles.messageSend} />
      </Send>
    );
  };

  return (
    <ScreenWrapper>
      <Header backRequired title={'Support'} style={{ backgroundColor: COLORS.white }} />

      <View style={styles.loaderView}>
        {isLoading && <ActivityIndicator color={COLORS.primary} size={'large'} />}
      </View>
      <GiftedChat
        messages={messagesData}
        showAvatarForEveryMessage={false}
        renderAvatar={false}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user?.posLoginData?.uuid,
        }}
        alwaysShowSend
        messagesContainerStyle={{
          paddingHorizontal: ms(8),
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
