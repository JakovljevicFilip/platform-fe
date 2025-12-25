/**
 * Task Input Validation
 * -----------------------------------------------------------------------------
 * Application-level UI input validation for Task use cases.
 * Implements the Domain InputValidation contract.
 */
import { TaskSettings } from '../../../../Domain/TaskSettings'

import type { InputFieldValidation } from 'src/application/Platform/AggregateSchema/Application/Input/InputValidation'

export const taskInput: {
  content: InputFieldValidation<string>
} = {
  content: {
    rules: [
      (v: string) => !!v || 'Required',
      (v: string) => v.trim().length >= TaskSettings.minBodyLength || 'Too short',
      (v: string) => v.trim().length <= TaskSettings.maxBodyLength || 'Too long',
    ],

    isValid(value: string): boolean {
      return this.rules.every(rule => rule(value) === true)
    },
  },
}
