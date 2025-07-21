import { applyDecorators, SetMetadata } from '@nestjs/common';

export function Public(): MethodDecorator {
  return applyDecorators(SetMetadata('public-route', true));
}
