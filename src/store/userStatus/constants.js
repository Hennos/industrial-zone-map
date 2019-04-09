const userGroupsEnum = Object.freeze({
  fl: 'fl',
  ul: 'ul',
  iogv: 'iogv',
  admin: 'admin',
  operator: 'operator',
  approved: 'approved'
});

const events = Object.freeze({
  setUserStatus: '@@STATUS:SET_USER_STATUS'
});

const keys = Object.freeze({
  authorized: 'authorized',
  groups: 'groups'
});

export { userGroupsEnum, events, keys };
