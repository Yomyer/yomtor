import React, { useEffect, useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ArrageIcon from './Arrage'
import ArrowIcon from './Arrow'
import ArtboardIcon from './Artboard'
import Artboard2Icon from './Artboard2'
import CenterIcon from './Center'
import CodeIcon from './Code'
import DistributeIcon from './Distribute'
import DotsVerticalIcon from './DotsVertical'
import GroupIcon from './Group'
import HideIcon from './Hide'
import LockIcon from './Lock'
import MoreIcon from './More'
import PlayIcon from './Play'

const icons = {
  ArrageIcon,
  ArrowIcon,
  ArtboardIcon,
  Artboard2Icon,
  CenterIcon,
  CodeIcon,
  DistributeIcon,
  DotsVerticalIcon,
  GroupIcon,
  HideIcon,
  LockIcon,
  MoreIcon,
  PlayIcon
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
      <Icon rotate={rotate} />
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
