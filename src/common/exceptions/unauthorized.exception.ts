import { GenericError } from './generic.exception'

export class UnauthorizedError extends GenericError {
  constructor (message: string) {
    super(message, 403)
  }
}