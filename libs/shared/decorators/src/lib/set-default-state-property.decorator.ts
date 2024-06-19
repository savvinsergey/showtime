import 'reflect-metadata';

import type { IFacadeState } from '@showtime/shared/interfaces';

export const SetDefaultStateProperty = (field: keyof IFacadeState): PropertyDecorator => {
  return function (target: object, propertyKey) {
    const privateKey = `_${String(propertyKey)}`;
    Reflect.defineProperty(target, propertyKey, {
      get: function () {
        return this[privateKey];
      },
      set: function (newValue: Record<string, IFacadeState>) {
        for (const innerField of Object.keys(newValue)) {
          Reflect.defineProperty(newValue, innerField + '$', {
            value: newValue[innerField][field],
          });
        }
        this[privateKey] = newValue;
      },
      enumerable: false,
      configurable: true,
    });
  };
};
