import { DuplicateError } from './duplicate.exception'
import { GenericError } from './generic.exception'
import { InvalidError } from './invalid.exception'
import { NotFoundError } from './notFound.exception'
import { UnauthenticatedError } from './unauthenticated.exception'
import { UnauthorizedError } from './unauthorized.exception'

export const ServiceExceptions = {
  DuplicateError,
  NotFoundError,
  UnauthenticatedError,
  InvalidError,
  UnauthorizedError,
  GenericError,
}