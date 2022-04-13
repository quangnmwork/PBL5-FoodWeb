import { useCallback } from 'react';

import { signinInput, signupInput } from './../../models/Authentication.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useYupValidationResolver = (validationSchema: any) => {
  const resolver = useCallback(
    async (data: signinInput | signupInput) => {
      console.log(data);
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return {
          values: {},
          errors: error
        };
      }
    },
    [validationSchema]
  );
  return resolver;
};
