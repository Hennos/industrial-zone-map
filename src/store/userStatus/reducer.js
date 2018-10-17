import Immutable from 'immutable';

import {
  userGroupsEnum,
  events,
  keys,
} from './constants';
import initialState from './initialState';

function handleSetUserStatus(prevState, { user }) {
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
    .set(keys.groups, groups);
}

const handlers = new Map([
  [events.setUserStatus, handleSetUserStatus],
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
};

export default reducer;
