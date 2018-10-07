import Immutable from 'immutable';

import {
  loadStatusEnum,
  userGroupsEnum,
  events,
  keys,
} from './constants';
import initialState from './initialState';

function handleLoadUserStatus(prevState) {
  return prevState
    .set(keys.loadStatus, loadStatusEnum.loading);
}

function handleSuccessLoadUserStatus(prevState, { user }) {
  const {
    is_authorized: authorized,
    user_groups: userGroups,
  } = user;

  const groups = Immutable.Map([
    [userGroupsEnum.fl, userGroups.fl],
    [userGroupsEnum.ul, userGroups.ul],
    [userGroupsEnum.iogv, userGroups.iogv],
    [userGroupsEnum.admin, userGroups.admin],
    [userGroupsEnum.operator, userGroups.operator],
    [userGroupsEnum.approved, userGroups.approved],
  ]);

  return prevState
    .set(keys.authorized, authorized)
    .set(keys.groups, groups)
    .set(keys.loadStatus, loadStatusEnum.success);
}

function handleErrorLoadUserStatus(prevState, { error }) {
  return prevState
    .set(keys.loadErrorMessage, error.toString())
    .set(keys.loadStatus, loadStatusEnum.error);
}

const handlers = new Map([
  [events.loadUserStatus, handleLoadUserStatus],
  [events.successLoadUserStatus, handleSuccessLoadUserStatus],
  [events.errorLoadUserStatus, handleErrorLoadUserStatus],
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
};

export default reducer;
