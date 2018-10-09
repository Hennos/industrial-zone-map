const loadStatusEnum = Object.freeze({
  none: 'NONE',
  loading: 'LOADING',
  success: 'SUCCESS',
  error: 'ERROR',
});

const userGroupsEnum = Object.freeze({
  fl: 'fl',
  ul: 'ul',
  iogv: 'iogv',
  admin: 'admin',
  operator: 'operator',
  approved: 'approved',
});

const events = Object.freeze({
  loadUserStatus: '@@STATUS:LOAD_USER_STATUS',
  successLoadUserStatus: '@@STATUS:SUCCESS_LOAD_USER_STATUS',
  errorLoadUserStatus: '@@STATUS:ERROR_LOAD_User_STATUS',
});

const keys = Object.freeze({
  loadStatus: 'loadStatus',
  loadErrorMessage: 'loadErrorMessage',
  authorized: 'authorized',
  groups: 'groups',
});

export {
  loadStatusEnum,
  userGroupsEnum,
  events,
  keys,
};
