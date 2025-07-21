import { GenericError } from './generic.exception'

export class NotFoundError extends GenericError {
  constructor (message: string) {
    super(message, 404)
  }
}