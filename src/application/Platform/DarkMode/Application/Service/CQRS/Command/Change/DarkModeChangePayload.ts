import type { DarkMode } from 'src/application/Platform/DarkMode/Domain/DarkMode'

export interface DarkModeChangePayload {
  darkMode: DarkMode
  newValue: boolean
}
