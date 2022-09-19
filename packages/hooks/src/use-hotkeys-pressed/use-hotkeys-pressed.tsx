import hotkeys from 'hotkeys-js'

export const useIsHotkeyPressed = (key: string) => hotkeys.isPressed(key)
