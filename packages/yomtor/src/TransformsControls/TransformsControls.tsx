import { TransformsControlsProps } from './TransformsControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useRef, useState } from 'react'
import {
  ActionIcon,
  Control,
  Input,
  NumberInput,
  Select,
  Checkbox,
  GroupInput
} from '@yomtor/ui'
import {
  HeightIcon,
  RotationIcon,
  UnlinkIcon,
  LinkIcon,
  RadiusShorthandIcon,
  RadiusIcon,
  WidthIcon,
  XAxisIcon,
  YAxisIcon,
  OrientationIcon,
  MinimizeIcon,
  G360Icon
} from '@yomtor/icons'
import {
  ChangeFlag,
  Artboard,
  Group,
  Size,
  Item,
  Shorthand,
  Path,
  Shape
} from '@yomtor/paper'
import {
  countBy,
  find,
  findKey,
  isBoolean,
  isEmpty,
  isNumber,
  isString,
  size
} from 'lodash'
import { round } from '@yomtor/utils'
import { ItemData } from './data'
import { SelectItem } from '@mantine/core'

const defaultProps: Partial<TransformsControlsProps> = {
  visible: false
}

export const TransformsControls = (props: TransformsControlsProps) => {
  const { visible: isVisible } = useComponentDefaultProps(
    'ObjectControls',
    defaultProps,
    props
  )
  const { canvas } = useEditorContext()
  const [visible, setVisible] = useState<boolean>(isVisible)
  const [x, setX] = useState<number | ''>('')
  const [y, setY] = useState<number | ''>('')
  const [width, setWidth] = useState<number | ''>('')
  const [height, setHeight] = useState<number | ''>('')
  const [angle, setAngle] = useState<number | ''>('')
  const [radius, setRadius] = useState<Shorthand | ''>('')
  const [combo, setCombo] = useState<string>()
  const [artboard, setArboard] = useState<boolean>()
  const [clipped, setClipped] = useState<boolean>()
  const [canRadius, setCanRadius] = useState<boolean>()
  const [canCorners, setCanCorners] = useState<boolean>()
  const [independentCorners, setIndependentCorners] = useState<boolean>()
  const [rotate, setRotate] = useState<number>(0)
  const [constraintProportions, setConstraintProportions] = useState<
    boolean | ''
  >('')
  const [disableGroup, setDisabelGroup] = useState<boolean>(false)
  const update = useRef<boolean>(true)

  useEffect(() => {
    setVisible(isVisible)
  }, [isVisible])

  useEffect(() => {
    const group = ItemData.find((item) => item.value === 'group')
    group.disabled = disableGroup
  }, [disableGroup])

  useEffect(() => {
    if (!canvas) return

    canvas.project.on('changed', (type) => {
      if (
        type & (ChangeFlag.ACTIVE | ChangeFlag.MATRIX) &&
        // update.current &&
        canvas.project.activeItems.length
      ) {
        const x = countBy(
          canvas.project.activeItems.map((item) =>
            round(
              item.info.topLeft.x -
                (item.artboard && item.artboard.info.topLeft.x),
              2
            )
          )
        )
        const y = countBy(
          canvas.project.activeItems.map((item) =>
            round(
              item.info.topLeft.y -
                (item.artboard && item.artboard.info.topLeft.y),
              2
            )
          )
        )
        const width = countBy(
          canvas.project.activeItems.map((item) => round(item.info.width, 2))
        )
        const height = countBy(
          canvas.project.activeItems.map((item) => round(item.info.height, 2))
        )
        const angle = countBy(
          canvas.project.activeItems.map((item) =>
            round(item.info.inheritedAngle, 2)
          )
        )

        const disableGroup = countBy(
          canvas.project.activeItems.map(
            (item) => item instanceof Artboard && !item.children.length
          )
        )

        const artboard = countBy(
          canvas.project.activeItems.map((item) => item instanceof Artboard)
        )

        const combo = countBy(
          canvas.project.activeItems.map((item) => item.className)
        )

        const constraintProportions = countBy(
          canvas.project.activeItems.map((item) => item.constraintProportions)
        )

        const radius = countBy(
          canvas.project.activeItems.map((item) => {
            return item.borderRadius
          })
        )

        const clipped = countBy(
          canvas.project.activeItems
            .filter((item) => item instanceof Artboard)
            .map((item: Artboard) => item.clipped)
        )

        const independentCorners = countBy(
          canvas.project.activeItems.map((item) => {
            return item.independentCorners
          })
        )

        const canRadius = countBy(
          canvas.project.activeItems
            .filter((item) => item instanceof Path)
            .map((item: Path) => {
              return item.canApplyBorderRadius()
            })
        )

        const canCorners = countBy(
          canvas.project.activeItems
            .filter((item) => item instanceof Path)
            .map((item: Path) => {
              return item.isRectangle() && item.canApplyBorderRadius()
            })
        )

        ItemData.forEach((item) => delete item.selected)

        setX(size(x) === 1 ? parseFloat(findKey(x)) : '')
        setY(size(y) === 1 ? parseFloat(findKey(y)) : '')
        setWidth(size(width) === 1 ? parseFloat(findKey(width)) : '')
        setHeight(size(height) === 1 ? parseFloat(findKey(height)) : '')
        setAngle(size(angle) === 1 ? parseFloat(findKey(angle)) : '')

        setRadius(
          size(radius) === 1 && new Shorthand(findKey(radius)).top !== null
            ? new Shorthand(findKey(radius))
            : ''
        )

        setConstraintProportions(
          size(constraintProportions) === 1
            ? findKey(constraintProportions) === 'true'
            : ''
        )
        setDisabelGroup(!!disableGroup.true)
        setCombo(
          size(combo) === 1
            ? ItemData.find((data) => data.label === findKey(combo))?.value
            : null
        )

        setCanCorners(
          size(canCorners) === 1 ? findKey(canCorners) === 'true' : false
        )
        setCanRadius(
          size(canRadius) === 1 ? findKey(canRadius) === 'true' : false
        )
        setIndependentCorners(
          size(independentCorners) === 1
            ? findKey(independentCorners) === 'true'
            : false
        )
        setArboard(size(artboard) === 1 ? findKey(artboard) === 'true' : false)
        setClipped(size(clipped) === 1 ? findKey(clipped) === 'true' : false)
      }

      if (type & (ChangeFlag.ACTIVE | ChangeFlag.TOOL)) {
        setVisible(
          !!canvas.project.activeItems.length &&
            !canvas.getTool('TransformTool').hide
        )
      }

      if (type & ChangeFlag.MATRIX) {
        const s = countBy(
          canvas.project.activeItems.map(
            (item) =>
              `${round(item.info.width, 2)}x${round(item.info.height, 2)}`
          )
        )

        ItemData.filter((item) => item.right).forEach(
          (item) => delete item.selected
        )

        const sizeSelected = ItemData.find((data) => findKey(s) === data.right)
        if (sizeSelected) {
          sizeSelected.selected = true
        }
      }
    })
  }, [canvas])

  const changeHandler = (
    key: string,
    value?: number | boolean,
    mixed?: boolean
  ) => {
    canvas.project.activeItems.forEach((item) => {
      if (['x', 'y'].includes(key)) {
        item.info.topLeft[key] =
          item.artboard && !mixed
            ? value + item.artboard.info.topLeft[key]
            : !mixed
            ? value
            : item.info.topLeft[key] + value
      }
      if (['width', 'height'].includes(key) && isNumber(value)) {
        const diff = value - item.info[key]
        item.info[key] = !mixed ? value : item.info[key] + value

        if (item.constraintProportions) {
          const reverse = { width: 'height', height: 'width' }[key]
          const func = { width: setHeight, height: setWidth }[key]
          item.info[reverse] = item.info[reverse] + (!mixed ? diff : value)
          !mixed && func(item.info[reverse])
        }
      }
      if (['angle'].includes(key) && isNumber(value)) {
        item.info.angle = !mixed ? value : item.info.angle + value
      }
      if (['radius'].includes(key) && isNumber(value)) {
        item.borderRadius = new Shorthand(
          !mixed ? value : item.borderRadius.top + value
        )
      }
      if (['top', 'right', 'bottom', 'left'].includes(key) && isNumber(value)) {
        item.borderRadius[key] = !mixed ? value : item.borderRadius[key] + value
      }
      if (['constraintProportions'].includes(key) && isBoolean(value)) {
        setConstraintProportions((item.constraintProportions = value))
      }
      if (['independentCorners'].includes(key) && isBoolean(value)) {
        setIndependentCorners((item.independentCorners = value))
      }
      if (
        ['clipped'].includes(key) &&
        isBoolean(value) &&
        item instanceof Artboard
      ) {
        setClipped((item.clipped = value))
      }
      if (
        (['portratit'].includes(key) && height < width) ||
        (['landscape'].includes(key) && height >= width)
      ) {
        const width = item.info.width

        item.info.width = item.info.height
        item.info.height = width
      }
      if (['fit'].includes(key) && item instanceof Artboard) {
        item.fitBounds()
      }
    })
  }

  const classHandler = (value: string) => {
    const actives = [...canvas.project.activeItems]

    let size: Size
    const regex = /^(\d+)x(\d+)/
    if (regex.exec(value)) {
      const match = regex.exec(value)
      size = new Size(parseInt(match[1]), parseInt(match[2]))
      value = 'artboard'
    }

    if (['artboard', 'group'].includes(value)) {
      const types = {
        artboard: Artboard,
        group: Group
      }

      actives.forEach((item) => {
        let clone: Item
        if (item.className !== types[value].prototype.className) {
          clone = new types[value](item.children)
          item.replaceWith(clone)
          clone.actived = true
        } else {
          clone = item
        }

        if (size) {
          clone.info.width = size.width
          clone.info.height = size.height
        }
      })

      setCombo(value)
    }
  }

  return visible ? (
    <Control>
      {combo && (
        <Control.Title
          end={19}
          title={
            <Select
              data={ItemData}
              value={combo}
              inherit
              onChange={classHandler}
            />
          }
          start={1}
        >
          {artboard && (
            <>
              <Control.Panel start={21} end={30}>
                <GroupInput>
                  <ActionIcon
                    icon={<OrientationIcon />}
                    actived={height >= width}
                    onClick={() => changeHandler('portratit')}
                  />
                  <ActionIcon
                    icon={<OrientationIcon rotate={90} />}
                    actived={height < width}
                    onClick={() => changeHandler('landscape')}
                  />
                </GroupInput>
              </Control.Panel>
              <Control.Panel start={32} end={33}>
                <ActionIcon
                  icon={<MinimizeIcon />}
                  onClick={() => changeHandler('fit')}
                />
              </Control.Panel>
            </>
          )}
        </Control.Title>
      )}
      <Control.Group rowGap={8}>
        <Control.Panel start={1} end={14}>
          <NumberInput
            icon={<XAxisIcon />}
            value={x}
            onChange={(value: number, mixed: boolean) =>
              changeHandler('x', value, mixed)
            }
            mixed={isEmpty(x.toString())}
            empty={false}
          />
        </Control.Panel>
        <Control.Panel start={16} end={30}>
          <NumberInput
            icon={<YAxisIcon />}
            value={y}
            onChange={(value: number, mixed: boolean) =>
              changeHandler('y', value, mixed)
            }
            mixed={isEmpty(y.toString())}
            empty={false}
          />
        </Control.Panel>
        <Control.Panel start={1} end={14}>
          <NumberInput
            icon={<WidthIcon />}
            value={width}
            min={1}
            onChange={(value: number, mixed: boolean) =>
              changeHandler('width', value, mixed)
            }
            mixed={isEmpty(width.toString())}
            empty={false}
          />
        </Control.Panel>
        <Control.Panel start={16} end={30}>
          <NumberInput
            icon={<HeightIcon />}
            value={height}
            min={1}
            onChange={(value: number, mixed: boolean) =>
              changeHandler('height', value, mixed)
            }
            mixed={isEmpty(height.toString())}
            empty={false}
          />
        </Control.Panel>
        <Control.Panel start={32} end={33}>
          <ActionIcon
            icon={
              constraintProportions ||
              isEmpty(constraintProportions.toString()) ? (
                <LinkIcon />
              ) : (
                <UnlinkIcon />
              )
            }
            onClick={() =>
              changeHandler('constraintProportions', !constraintProportions)
            }
            actived={!!constraintProportions}
          />
        </Control.Panel>
        <Control.Panel start={1} end={14}>
          <NumberInput
            icon={<RotationIcon />}
            value={angle}
            onChange={(value: number, mixed: boolean) =>
              changeHandler('angle', value, mixed)
            }
            mixed={isEmpty(angle.toString())}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value)) ? `${value}º` : ``
            }
            empty={false}
          />
        </Control.Panel>
        {canRadius && (
          <Control.Panel start={16} end={30}>
            <NumberInput
              icon={<RadiusIcon />}
              disabled={independentCorners}
              value={!isString(radius) && (radius.regular ? radius.top : '')}
              min={0}
              onChange={(value: number, mixed: boolean) =>
                changeHandler('radius', value, mixed)
              }
              draggable={!isString(radius) && radius.regular}
              mixed={
                isEmpty(radius.toString()) ||
                (!isString(radius) && !radius.regular)
              }
              empty={false}
            />
          </Control.Panel>
        )}
        {canCorners && (
          <Control.Panel start={32} end={33}>
            <ActionIcon
              icon={<RadiusShorthandIcon />}
              onClick={() =>
                changeHandler('independentCorners', !independentCorners)
              }
              actived={independentCorners}
            />
          </Control.Panel>
        )}
        {independentCorners && (
          <Control.Panel start={1} end={30}>
            <GroupInput
              onBlur={() => {
                setRotate(0)
              }}
            >
              <NumberInput
                icon={<RadiusIcon rotate={rotate} />}
                value={!isString(radius) && radius.top}
                min={0}
                onChange={(value: number, mixed: boolean) =>
                  changeHandler('top', value, mixed)
                }
                mixed={isEmpty(radius.toString())}
                style={{ flex: '1 0 33%' }}
                empty={false}
              />
              <NumberInput
                value={!isString(radius) && radius.right}
                min={0}
                onChange={(value: number, mixed: boolean) =>
                  changeHandler('right', value, mixed)
                }
                mixed={isEmpty(radius.toString())}
                onFocus={() => {
                  setRotate(90)
                }}
                empty={false}
              />
              <NumberInput
                value={!isString(radius) && radius.bottom}
                min={0}
                onChange={(value: number, mixed: boolean) =>
                  changeHandler('bottom', value, mixed)
                }
                mixed={isEmpty(radius.toString())}
                onFocus={() => {
                  setRotate(180)
                }}
                empty={false}
              />
              <NumberInput
                value={!isString(radius) && radius.left}
                min={0}
                onChange={(value: number, mixed: boolean) =>
                  changeHandler('left', value, mixed)
                }
                mixed={isEmpty(radius.toString())}
                onFocus={() => {
                  setRotate(270)
                }}
                empty={false}
              />
            </GroupInput>
          </Control.Panel>
        )}
        {artboard && (
          <Control.Panel start={2} end={30}>
            <Checkbox
              label='Clip content'
              checked={clipped}
              onChange={(event) =>
                changeHandler('clipped', event.currentTarget.checked)
              }
            />
          </Control.Panel>
        )}
      </Control.Group>
    </Control>
  ) : null
}
