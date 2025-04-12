import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsDecimalString(
  maxIntegers: number,
  maxDecimals: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDecimalString',
      target: object.constructor,
      propertyName,
      constraints: [maxIntegers, maxDecimals],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return true;

          const [maxInts, maxDecs] = args.constraints as [number, number];
          const parts =
            value.startsWith('-') || value.startsWith('+')
              ? value.slice(1).split('.')
              : value.split('.');
          if (parts.length > 2) return false;

          let [ints = '', decs = ''] = parts;

          // Limpiar ceros a la izquierda en la parte entera y ceros a la derecha en la parte decimal
          ints = ints.replace(/^0+/, '');
          decs = decs.replace(/0+$/, '');

          // Validar cada parte (solo si hay contenido)
          if (ints !== '' && (!/^\d+$/.test(ints) || ints.length > maxInts)) return false;
          if (decs !== '' && (!/^\d+$/.test(decs) || decs.length > maxDecs)) return false;

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [maxInts, maxDecs] = args.constraints as [number, number];
          return `${args.property} must be a decimal string with up to ${maxInts} integer digits and ${maxDecs} decimal places`;
        },
      },
    });
  };
}
