import { STATUS } from '@/constants';

const { ERROR, LOADING, NOT_STARTED, SUCCESS } = STATUS;

export const statusSelector = (action, state) => state.status[action];

export const hasStatusSelector = (action, status, state) =>
  state.status[action] === status;

export const notStartedSelector = (actions, state) =>
  actions.reduce((prevState, value) => {
    const status = state.status[value] || NOT_STARTED;
    return prevState && status === NOT_STARTED;
  }, true);

export const isLoadingSelector = (actions, state) =>
  actions.reduce((prevState, value) => {
    const status = state.status[value] || NOT_STARTED;
    return prevState || status === LOADING; {/* <DropDownPicker
    ArrowUpIconComponent={({ style }) => (
      <Image source={dropdown2} style={styles.dropDownIcon} />
    )}
    ArrowDownIconComponent={({ style }) => (
      <Image source={dropdown2} style={styles.dropDownIcon} />
    )}
    // style={styles.dropdown}
    // containerStyle={[
    //   styles.containerStyle,
    //   { zIndex: Platform.OS === 'ios' ? 100 : 1 },
    // ]}
    style={styles.dropdown}
    containerStyle={styles.containerStyle}
    dropDownContainerStyle={styles.dropDownContainerStyle}
    listItemLabelStyle={styles.listItemLabelStyle}
    labelStyle={styles.labelStyle}
    selectedItemLabelStyle={styles.selectedItemLabelStyle}
    open={statusModalOpen}
    value={statusModalValue}
    items={statusItems}
    setOpen={setStatusModelOpen}
    setValue={setStatusModalValue}
    setItems={setStatusItems}
    placeholder="Status"
    placeholderStyle={styles.placeholderStyle}
  /> */}
  }, false);

export const hasErrorsSelector = (actions, state) =>
  actions.reduce((prevState, value) => {
    const status = state.status[value] || NOT_STARTED;
    return prevState || status === ERROR;
  }, false);

export const successSelector = (actions, state) =>
  actions.reduce((prevState, value) => {
    const status = state.status[value] || NOT_STARTED;
    return prevState && status === SUCCESS;
  }, true);

export const fullStatusSelector = (action, state) => {
  const status = state.status[action];
  const error = state.error[action];
  const isLoading = status === LOADING;
  return { status, isLoading, error };
};
