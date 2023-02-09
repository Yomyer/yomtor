import { Path } from '@yomtor/paper'
import { ObjectpathEvent } from './ObjectPathTool.props'
import { round } from '@yomtor/utils'

export const useObjectPath = ({
  type,
  theme,
  canvas,
  dragging,
  event
}: ObjectpathEvent) => {
  const styles = {
    fillColor: theme.colors.dark[0],
    strokeColor: theme.colors.primary[5],
    strokeWidth: 1 / canvas.view.zoom
  }

  switch (type) {
    default:
      return new Path.Rectangle({
        ...styles,
        name: 'Rectangle',
        ...(!dragging
          ? { point: round(event.downPoint).subtract(50), size: 100 }
          : { point: round(event.downPoint), size: 1, actived: true })
      })
      break
  }
}
