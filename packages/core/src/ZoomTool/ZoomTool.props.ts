import { PaperScope } from '@yomtor/paper'

export interface ZoomToolProps {
  factor?: number
  max?: number
  min?: number
  pixelGrid?: boolean
  children?:
    | React.ReactNode
    | ((zoom: number, canvas: PaperScope) => React.ReactNode)
}
