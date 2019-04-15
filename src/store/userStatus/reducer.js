import Immutable from 'immutable';

import { userGroupsEnum, events, keys } from './constants';
import initialState from './initialState';

function handleSetUserStatus(prevState, { user }) {
  const { is_authorized: authorized } = user;
  const userGroups = user.user_groups || {};

  const groups = Immutable.Map([
    [userGroupsEnum.fl, userGroups.fl || null],
    [userGroupsEnum.ul, userGroups.ul || null],
    [userGroupsEnum.iogv, userGroups.iogv || null],
    [userGroupsEnum.admin, userGroups.admin || true],
    [userGroupsEnum.operator, userGroups.operator || null],
    [userGroupsEnum.approved, userGroups.approved || null]
  ]);

  return prevState.set(keys.authorized, authorized).set(keys.groups, groups);
}

const handlers = new Map([[events.setUserStatus, handleSetUserStatus]]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
};

export default reducer;
