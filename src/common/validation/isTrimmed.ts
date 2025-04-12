import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsTrimmed(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTrimmed',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value !== 'string' || value === value.trim();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should not have leading or trailing spaces`;
        },
      },
    });
  };
}
