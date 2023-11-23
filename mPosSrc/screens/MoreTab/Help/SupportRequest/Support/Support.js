import React, { useRef, useState } from 'react';
import { Dimensions, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, ScreenWrapper, Spacer } from '@/components';
import { strings } from '@mPOS/localization';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';
import { Images } from '@mPOS/assets';
import styles from './Support.styles';
import { addNewTicket } from '@/actions/SupportActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/SupportTypes';
import { getSupportData } from '@/selectors/SupportSelector';
import { getAuthData } from '@/selectors/AuthSelector';
import { getUser } from '@/selectors/UserSelectors';
import { capitalizeFirstLetter } from '@/utils/GlobalMethods';
import { COLORS, SH } from '@/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { emailReg } from '@/utils/validators';
import Toast from 'react-native-toast-message';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export function Support() {
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.ADD_NEW_TICKET], state));

  const actionRef = useRef();
  const dispatch = useDispatch();
  const SUBJECT = useSelector(getSupportData);
  const getData = useSelector(getAuthData);
  const getUserData = useSelector(getUser);
  console.log('jusers: ' + JSON.stringify(getData?.getProfile?.email));

  const profileData = getData?.getProfile;
  const emailID = getData?.getProfile?.email ?? '';
  const username = profileData?.user_profiles?.username ?? '';

  const [firstName, setFirstName] = useState(capitalizeFirstLetter(username));
  const [email, setEmail] = useState(emailID ?? '');

  const [textArea, setTextArea] = useState('');
  const [makeOpen, setMakeOpen] = useState(false);
  const [makeValue, setMakeValue] = useState(null);
  const [subject, setSubject] = useState([]);
  const [subjectModalOpen, setSubjectModalOpen] = useState(false);
  const [showVisible, setShowVisible] = useState(false);
  const [ticketImage, setTicketImage] = useState('');
  const [subjectValue, setSubjectValue] = useState(null);
  const [subjectitem, setSubjectItem] = useState(null);
  const [supportImage, setSupportImage] = useState('');
  const [notes, setNotes] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [chatHeadId, setChatHeadId] = useState('');

  const suppoprtTicketHandler = () => {
    if (!email) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.validation.enterEmail,
        visibilityTime: 1500,
      });
      return;
    } else if (email && emailReg.test(email) === false) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.validation.enterValidEmail,
        visibilityTime: 1500,
      });
      return;
    } else if (!subjectValue) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.validation.subject,
        visibilityTime: 1500,
      });
      return;
    } else if (!notes) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.validation.enterDescription,
        visibilityTime: 1500,
      });
      return;
    } else if (!ticketImage) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.validation.uploadDocuemnt,
        visibilityTime: 1500,
      });
      return;
    } else {
      const data = {
        subject_id: subjectValue,
        department_id: subjectValue,
        email: email,
        name: firstName,
        notes: notes,
        document_url: ticketImage,
        type: 'support',
      };
      dispatch(
        addNewTicket(data, (res) => {
          setShowVisible(true);
          setTicketId(res?.payload?.id);
          console.log('ticket resp-,', JSON.stringify(res));
          console.log('ticket body-,', JSON.stringify(data));
          const socketData = {
            sender_id: getUserData?.payload?.uuid,
            recipient_id: subjectValue.toString(),
            chatHeadType: 'inquiry',
            ticket_id: res?.payload?.id.toString(),
            media_type: 'text',
            content: notes,
          };
          socket.emit('send_message', socketData);
          socket.on('send_message', (message) => {
            console.log('send msg payload: ' + JSON.stringify(message));
            setChatHeadId(message?.data?.chathead_id);
          });
        })
      );
    }
  };

  const openPickerHandler = (index) => {
    if (index === 0) {
      // cameraOpenPicker();
      alert('kdhsd');
    } else if (index === 1) {
      alert('kdhsd');
    }
  };
  return (
    <ScreenWrapper>
      <View style={styles.ticketContainer}>
        <Text style={styles.header}>{strings.supportTicket.heading}</Text>
        <Spacer space={SH(8)} />
        <Text style={styles.description}>{strings.supportTicket.subheading}</Text>

        <Spacer space={SH(30)} />
        <View style={styles.profileDataCon}>
          {/* <Text style={styles.nameText}>Name</Text> */}
          <View style={styles.imageTextView}>
            <Image source={Images.userProfileIcon} style={styles.userIcon} />
            <TextInput
              placeholder="name"
              selectTextOnFocus={false}
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
          </View>
        </View>
        <Spacer space={SH(15)} />
        <View style={styles.profileDataCon}>
          {/* <Text style={styles.nameText}>Name</Text> */}
          <View style={styles.imageTextView}>
            <Image source={Images.email} style={styles.userIcon} />
            <TextInput
              placeholder="email"
              placeholderTextColor={COLORS.darkGray}
              selectTextOnFocus={false}
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>
        </View>
        <Spacer space={SH(7)} />
        <DropDownPicker
          ArrowUpIconComponent={({ style }) => (
            <Image source={Images.dropdown} style={styles.dropDownIcon} />
          )}
          ArrowDownIconComponent={({ style }) => (
            <Image source={Images.dropdown} style={styles.dropDownIcon} />
          )}
          style={styles.dropdown}
          containerStyle={[styles.containerStyle, { zIndex: Platform.OS === 'ios' ? 100 : 2 }]}
          open={subjectModalOpen}
          value={subjectValue}
          items={subject}
          setOpen={setSubjectModalOpen}
          setValue={setSubjectValue}
          setItems={setSubjectItem}
          placeholder="Select subject"
          placeholderStyle={{ color: '#A7A7A7', fontStyle: 'italic' }}
        />
        <Spacer space={SH(7)} />
        <View style={styles.profileDataCon}>
          {/* <Text style={styles.nameText}>Name</Text> */}
          <View style={styles.notesView}>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              multiline
              placeholderTextColor={COLORS.grey}
              placeholder="Write here"
              style={styles.textArea}
            />
          </View>
        </View>

        <Spacer space={SH(15)} />
        <View
          style={[
            styles.cameraInput,
            supportImage && { height: windowHeight * 0.3, borderWidth: 0 },
          ]}
        >
          <TouchableOpacity style={styles.uploadView}>
            {/* <TouchableOpacity style={styles.uploadView} onPress={() => actionRef.current.show()}> */}
            {supportImage ? (
              <View style={[styles.cameraInput, { zIndex: Platform.OS === 'ios' ? -20 : 0 }]}>
                <TouchableOpacity onPress={() => actionRef.current.show()}>
                  <Image
                    source={{ uri: supportImage }}
                    style={[styles.cameraInput, supportImage && { height: windowHeight * 0.3 }]}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.iconView}>
                <Image source={Images.galleryIcon} style={styles.galleryIcon} />
                <Image source={Images.upload} style={styles.uploadIcon} />
                <Text style={styles.uploadText}>{strings.supportTicket.uploadFile}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Spacer space={SH(30)} />
        <Button
          pending={isLoading}
          onPress={suppoprtTicketHandler}
          // onPress={() => navigate(NAVIGATION.supportDetails)}
          style={styles.selectedButton}
          title={strings.supportTicket.button}
          textStyle={styles.selectedText}
        />
        {/* <ActionSheet
          ref={actionRef}
          title={strings.supportTicket.actionTitle}
          options={[
            strings.supportTicket.cameraOption,
            strings.supportTicket.galleryOption,
            strings.supportTicket.cancelOption,
          ]}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => openPickerHandler(index)}
        /> */}
      </View>
    </ScreenWrapper>
  );
}
