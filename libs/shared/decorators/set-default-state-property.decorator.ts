import 'reflect-metadata';
import { IFacadeState } from '../interfaces';

export const SetDefaultStateProperty = (field: keyof IFacadeState): PropertyDecorator => {
  return function (target: Object, propertyKey) {
    let value: Record<string, IFacadeState> = {};
    Reflect.defineProperty(target, propertyKey, {
      get: () => {
        return value;
      },
      set: (newVal: Record<string, IFacadeState>) => {
        Object.keys(newVal).forEach((innerField: string) => {
          Object.defineProperty(newVal, innerField + '$', {
            value: newVal[innerField][field],
          });
        });
        value = newVal;
      },
      enumerable: true,
      configurable: true,
    });
  };
};
