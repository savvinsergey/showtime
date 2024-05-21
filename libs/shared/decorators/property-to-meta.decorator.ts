import 'reflect-metadata';

export const PropertyToMeta = (metadataKey: string): PropertyDecorator => {
  return function (target: object, propertyKey) {
    const metadata = Reflect.getMetadata(metadataKey, target) || {};

    Reflect.defineProperty(target, propertyKey, {
      get: () => console.error('You can get value of this variable only from metadata'),
      set: (newValue: unknown) => (metadata[propertyKey] = newValue),
      enumerable: false,
      configurable: true,
    });

    Reflect.defineMetadata(metadataKey, metadata, target);
  };
};
