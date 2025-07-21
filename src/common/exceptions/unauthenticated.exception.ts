import { GenericError } from './generic.exception'

export class UnauthenticatedError extends GenericError {
  constructor (message: string) {
    super(message, 401)
  }
}