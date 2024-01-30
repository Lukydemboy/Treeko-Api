import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { HTTP_HEADER } from '../constants';

export enum TokenType {
  Access = 'access',
  Refresh = 'refresh',
}

export function ApiAuthorizationHeader(tokenType: TokenType) {
  const description = `Bearer token (${tokenType} token)`;

  return applyDecorators(
    ApiHeader({
      name: HTTP_HEADER.AUTHORIZATION,
      description: description,
    }),
  );
}
