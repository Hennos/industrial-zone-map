import { createSelector } from 'reselect';

import { keys as loaderKeys } from '../../../../store/loader/constants';
import {
  keys as objectDetailsKeys,
  areaPropsEnum,
  employerObjectPropsEnum
} from '../../../../store/objectDetails/constants';
import { closeObjectDetails } from '../../../../store/objectDetails/actions';

const getLoader = state => state.loader;
const getLoadStatusSelector = createSelector(
  getLoader,
  loader => loader.get(loaderKeys.areaPropertiesLoadStatus)
);

const getReadyStatus = state => state.objectDetails[objectDetailsKeys.ready];

const getPropsName = state => state.objectDetails[objectDetailsKeys.properties];
const getPropsData = state => state.objectDetails[objectDetailsKeys.propsData];
const getPropsValue = state => state.objectDetails[objectDetailsKeys.propsValue];
const getPhotos = createSelector(
  getPropsValue,
  values => values.photos || null
);
const getDescription = createSelector(
  getPropsValue,
  values => values.description || null
);
const getAreaProperties = createSelector(
  getPropsName,
  getPropsData,
  getPropsValue,
  (names, datas, values) =>
    names
      .filter(name => Object.values(areaPropsEnum).includes(name))
      .map(name => ({
        name,
        data: datas[name],
        value: values[name] || null
      }))
);
const getEmployerProperties = createSelector(
  getPropsName,
  getPropsData,
  getPropsValue,
  (names, datas, values) =>
    names
      .filter(name => Object.values(employerObjectPropsEnum).includes(name))
      .map(name => ({
        name,
        data: datas[name],
        value: values[name] || null
      }))
);

export const mapStateToProps = state => ({
  propsLoadStatus: getLoadStatusSelector(state),
  ready: getReadyStatus(state),
  description: getDescription(state),
  photos: getPhotos(state),
  areaProperties: getAreaProperties(state),
  employerProperties: getEmployerProperties(state)
});

export const mapDispatchToProps = dispatch => ({
  onCloseObjectDetails: () => dispatch(closeObjectDetails())
});
