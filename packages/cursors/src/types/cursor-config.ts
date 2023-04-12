import { CursorIcon } from './cursor-icon'

export type CursorConfig = {
  default: CursorIcon
  scope: HTMLElement
  styles: { [key: string]: HTMLStyleElement }
}
