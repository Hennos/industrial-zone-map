import { events } from './constants';

export const constsetFiltersData = filters => ({
  type: events.setFiltersData,
  filters
});

export const constupdateSearchFilterValue = (name, value) => ({
  type: events.updateSearchFilterValue,
  name,
  value
});

export const constinvertFiltersVisability = () => ({
  type: events.invertFiltersVisability
});

export const constrequestSearchObjects = search => ({
  type: events.requestSearchObjects,
  search
});

export const constgetFoundObjects = found => ({
  type: events.getFoundObjects,
  found
});

export const consterrorGetFoundObjects = error => ({
  type: events.errorGetFoundObjects,
  error
});
