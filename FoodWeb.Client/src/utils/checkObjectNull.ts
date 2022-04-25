import { DynamicObject } from '../models/DynamicObject.model';
import lodash from 'lodash';

export const checkObjectExist = (obj: DynamicObject) => {
  return !lodash.isEmpty(obj);
};
