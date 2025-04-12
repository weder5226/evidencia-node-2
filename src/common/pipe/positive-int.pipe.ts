import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  private readonly MIN_ID = 1;
  private readonly MAX_INT = 2147483647; // Database INTEGER max

  transform(value: string, metadata: ArgumentMetadata): number {
    const parsed = Number(value);

    if (!Number.isInteger(parsed)) {
      throw new BadRequestException(`Validation failed: ${metadata.data} is not an integer`);
    }

    if (parsed < this.MIN_ID || parsed > this.MAX_INT) {
      throw new BadRequestException(
        `Validation failed: ${metadata.data} must be a valid positive integer`,
      );
    }

    return parsed;
  }
}
