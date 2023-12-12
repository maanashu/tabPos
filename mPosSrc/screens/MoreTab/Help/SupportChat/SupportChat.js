import { COLORS } from '@/theme';
import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, StatusBar } from 'react-native';
import { GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
import { messageSend } from '@/assets';
import { ms } from 'react-native-size-matters';
import io from 'socket.io-client';
import { getUser } from '@/selectors/UserSelectors';
import { useSelector } from 'react-redux';
import { Header, ScreenWrapper } from '@mPOS/components';
import styles from './SupportChat.styles';

export const SupportChat = (props) => {
  const [messagesData, setMessages] = useState([]);
  const [messageHeadId, setMessageHeadId] = useState('');
  const [recipientId, setRecipientId] = useState();

  const [isLoading, setisLoading] = useState(false);
  const user = useSelector(getUser);
  const ticketId = props?.route?.params?.id;

  const socket = io(`https://apichat.jobr.com:8007?userId=${user?.posLoginData?.uuid}`, {
    path: '/api/v1/connect',
  });

  useEffect(() => {
    setisLoading(true);
    socket.on('connect', () => {
      console.log('Connected');
      getMessages();
    });

    socket.on('send_message', (msg) => {
      console.log('message sent console', msg);
      setMessageHeadId(msg?.data?.chathead_id);
    });

    socket.on('get_messages', (message) => {
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

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    return () => {
      socket.off('get_messages');
      socket.off('send_message');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on(`JobrUser_${messageHeadId}_room`, (data) => {
      const newMsg = {
        _id: data?.data?._id,
        text: data?.data?.content,
        createdAt: data?.data?.createdAt,
        user: {
          _id: data?.data?.sender_id,
        },
      };
      setMessages((prev) => [...prev, newMsg]);
    });
    return () => {
      socket.off(`JobrUser_${messageHeadId}_room`);
    };
  }, [messageHeadId]);

  const getMessages = () => {
    socket.emit('get_messages', {
      id: ticketId.toString(),
      idtype: 'ticket_id',
    });
  };

  const onSend = (messages = []) => {
    const params = {
      recipient_id: recipientId,
      media_type: 'text',
      content: messages[0]?.text,
      chatHeadType: 'inquiry',
      sender_id: user?.posLoginData?.uuid,
      ticket_id: ticketId.toString(),
    };
    socket.emit('send_message', params);
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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <Header backRequired title={'Support'} style={{ backgroundColor: COLORS.white }} />

      <View style={styles.loaderView}>
        {isLoading && <ActivityIndicator color={COLORS.primary} size={'large'} />}
      </View>
      <GiftedChat
        messages={[...messagesData]?.reverse()}
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
