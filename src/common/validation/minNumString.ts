import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function MinNumString(min: number, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'minString',
      target: object.constructor,
      propertyName,
      constraints: [min],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return true;

          const num = Number(value);
          return !Number.isNaN(num) && num >= args.constraints[0];
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a number string greater than or equal to ${args.constraints[0]}`;
        },
      },
    });
  };
}
