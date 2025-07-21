import { z } from 'zod'
import { EnumValues, getValues } from './common'

export const TRANSFER_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const

export type TransferStatusType = EnumValues<typeof TRANSFER_STATUS>
export const TransferStatusSchema = z.enum(getValues(TRANSFER_STATUS))