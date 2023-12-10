import 'reflect-metadata';

export const PropertyToMeta = (metadataKey: string): PropertyDecorator => {
  return (target: any, propertyKey) => {
    const metadata = Reflect.getMetadata(metadataKey, target) || {};

    Reflect.defineProperty(target, propertyKey, {
      get: () => console.error('You can get value of this variable only from metadata'),
      set: (newVal: unknown) => (metadata[propertyKey] = newVal),
      enumerable: true,
      configurable: true,
    });

    Reflect.defineMetadata(metadataKey, metadata, target);
  };
};
