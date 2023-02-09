import { Color, PaperScope, Path, ToolEvent } from '@yomtor/paper'
import { round } from '@yomtor/utils'
import { YomtorTheme } from '@yomtor/styles'
import { useObjectTool } from '../../utils/use-object-tool'
import { Rectangle } from '@yomtor/cursors'

export default useObjectTool({
  object: Path.Rectangle,
  attrs: ({ event, canvas, theme }) => ({
    fillColor: theme.colors.dark[0],
    strokeColor: theme.colors.primary[5],
    strokeWidth: 1 / canvas.view.zoom
  }),
  onPhantom: ({ event, canvas, theme }) =>
    new Path.Rectangle({
      from: round(event.downPoint),
      to: round(event.point),
      fillColor: theme.colors.dark[0],
      strokeColor: theme.colors.primary[5],
      strokeWidth: 1 / canvas.view.zoom,
      guide: true,
      parent: canvas.guidesLayer
    }),
  onObject: ({ event, theme }) =>
    new Path.Rectangle({
      from: round(event.downPoint),
      to: round(event.point),
      fillColor: theme.colors.dark[0],
      name: 'Rectangle'
    }),
  name: 'Rectangle',
  hotKey: 'r',
  cursor: Rectangle
})
