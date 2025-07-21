import { GenericError } from './generic.exception'

export class DuplicateError extends GenericError {
  constructor (message: string) {
    super(message, 409)
  }
}