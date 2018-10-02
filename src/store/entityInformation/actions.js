import { events } from './constants';

const accessToInformationBlock = block => ({
  type: events.accessToInformationBlock,
  block,
});

const accessToSearchBlock = () => accessToInformationBlock('SEARCH');
const accessToObjectDetailsBlock = () => accessToInformationBlock('OBJECT_DETAILS');
const accessToZoneDetailsBlock = () => accessToInformationBlock('ZONE_DETAILS');

export {
  accessToInformationBlock,
  accessToSearchBlock,
  accessToObjectDetailsBlock,
  accessToZoneDetailsBlock,
};
