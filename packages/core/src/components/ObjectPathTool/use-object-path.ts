import { Artboard, Item, Path } from '@yomtor/paper'
import { ObjectPathEvent } from './ObjectPathTool.props'
export const useObjectPath = ({
  type,
  theme,
  canvas,
  dragging,
  event
}: ObjectPathEvent): Item => {
  const styles = {
    fillColor: theme.colors.dark[0]
  }

  switch (type) {
    case 'artboard':
      return new Artboard({
        fillColor: 'white',
        clipped: true,
        name: 'Artboard',
        ...(!dragging
          ? { point: event.downPoint.round().subtract(50), size: 100 }
          : { point: event.downPoint.round(), size: 1 })
      })
      break
    case 'polygon':
      return new Path.RegularPolygon({
        ...styles,
        name: 'Oval',
        sides: 3,
        center: event.downPoint.round(),
        ...(!dragging ? { radius: 50 } : { radius: 1 })
      })
      break
    case 'oval':
      return new Path.Ellipse({
        ...styles,
        name: 'Oval',
        ...(!dragging
          ? { point: event.downPoint.round().subtract(50), size: 100 }
          : { point: event.downPoint.round(), size: 1 })
      })
      break
    default:
      return new Path.Rectangle({
        ...styles,
        name: 'Rectangle',
        ...(!dragging
          ? { point: event.downPoint.round().subtract(50), size: 100 }
          : { point: event.downPoint.round(), size: 1 })
      })
      break
  }
}
