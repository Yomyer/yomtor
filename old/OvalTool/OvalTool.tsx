import { Path } from '@yomtor/paper'
import { round } from '@yomtor/utils'
import { useObjectTool } from '../../utils/use-object-tool'
import { Rectangle } from '@yomtor/cursors'

export default useObjectTool({
  onPhantom: ({ event, canvas, theme }) =>
    new Path.Ellipse({
      from: round(event.downPoint),
      to: round(event.point),
      fillColor: theme.colors.dark[0],
      strokeWidth: 1 / canvas.view.zoom,
      guide: true,
      parent: canvas.guidesLayer
    }),
  onObject: ({ event, theme }) =>
    new Path.Ellipse({
      from: round(event.downPoint),
      to: round(event.point),
      fillColor: theme.colors.dark[0],
      name: 'Oval'
    }),
  name: 'Oval',
  hotKey: 'o'
})
