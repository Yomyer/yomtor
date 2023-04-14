import React, { useEffect, useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import AligmentCenterIcon from './AligmentCenter'
import AligmentStartIcon from './AligmentStart'
import ArrageIcon from './Arrage'
import ArrowIcon from './Arrow'
import ArtboardIcon from './Artboard'
import Artboard2Icon from './Artboard2'
import CenterIcon from './Center'
import CheckIcon from './Check'
import CodeIcon from './Code'
import ConstraintsBarIcon from './ConstraintsBar'
import DistributeIcon from './Distribute'
import DotsVerticalIcon from './DotsVertical'
import EyeIcon from './Eye'
import GroupIcon from './Group'
import HeightIcon from './Height'
import HideIcon from './Hide'
import LinkIcon from './Link'
import LockIcon from './Lock'
import MoreIcon from './More'
import PlayIcon from './Play'
import RadiusIcon from './Radius'
import RotationIcon from './Rotation'
import UnlinkIcon from './Unlink'
import WidthIcon from './Width'
import XAxisIcon from './XAxis'
import YAxisIcon from './YAxis'

const icons = {
  AligmentCenterIcon,
  AligmentStartIcon,
  ArrageIcon,
  ArrowIcon,
  ArtboardIcon,
  Artboard2Icon,
  CenterIcon,
  CheckIcon,
  CodeIcon,
  ConstraintsBarIcon,
  DistributeIcon,
  DotsVerticalIcon,
  EyeIcon,
  GroupIcon,
  HeightIcon,
  HideIcon,
  LinkIcon,
  LockIcon,
  MoreIcon,
  PlayIcon,
  RadiusIcon,
  RotationIcon,
  UnlinkIcon,
  WidthIcon,
  XAxisIcon,
  YAxisIcon
}

type Props = {
  rotate: number
  icon: React.ReactNode
}

const Canvas: React.FC<Props> = ({ icon: Icon, rotate }) => {
  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.1)',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        fontSize: 32
      }}
    >
      <Icon rotate={rotate} size='xl' />
    </div>
  )
}

export default {
  title: 'Utils/Icons',
  component: Canvas,
  argTypes: {}
} as ComponentMeta<typeof Canvas>

const Template: ComponentStory<typeof Canvas> = ({ rotate, ...props }) => {
  return (
    <div
      style={{
        display: 'grid',
        gap: 10,
        gridTemplateColumns: 'repeat(6, 1fr)'
      }}
    >
      {Object.keys(icons).map((key) => (
        <Canvas key={key} icon={icons[key]} rotate={rotate} />
      ))}
    </div>
  )
}

export const Playground = Template.bind({})

Playground.args = {
  rotate: 0
}
