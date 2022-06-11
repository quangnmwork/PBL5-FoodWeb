import lodash from 'lodash';

export const checkObjectExist = (obj: any) => {
  return !lodash.isEmpty(obj);
};
