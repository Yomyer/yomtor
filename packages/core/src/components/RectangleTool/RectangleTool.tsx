import { PaperScope, Path, ToolEvent } from '@yomtor/paper'
import { round } from '@yomtor/utils'
import { YomtorTheme } from '@yomtor/styles'
import { useObjectTool } from '../../utils/use-object-tool'
import { Rectangle } from '@yomtor/cursors'

export default useObjectTool({
  onPhantom: ({ event, canvas, theme }) =>
    new Path.Rectangle({
      from: round(event.downPoint),
      to: round(event.point),
      strokeColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.light[9],
      strokeWidth: 1 / canvas.view.zoom,
      guide: true,
      parent: canvas.guidesLayer
    }),
  onObject: ({ event, theme }) =>
    new Path.Rectangle({
      from: round(event.downPoint),
      to: round(event.point),
      strokeColor: theme.colors.primary[5],
      fillColor: theme.colors.primary[5],
      name: 'Rectangle'
    }),
  name: 'Rectangle',
  hotKey: 'r',
  cursor: Rectangle
})
