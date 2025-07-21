import { GenericError } from './generic.exception'

export class InvalidError extends GenericError {
  constructor (message: string) {
    super(message, 400)
  }
}