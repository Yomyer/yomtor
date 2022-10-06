import React from 'react'
import { Text, TextProps } from '@yomtor/ui'

const codeTemplate = (props: string) => `
import { Text } from '@yomtor/ui'

function Demo() {
  return (
    <Text${props}>
    {/* Text content */}
    </Text>
  );
}
`
function Wrapper(props: TextProps) {
  return (
    <Text {...props}>
      Lorem ipsum dolor sit amet consectetur adipiscing elit diam cubilia
      bibendum, neque suspendisse semper nisl euismod ut quisque sociis vel,
      ante iaculis massa suscipit aliquam nullam tincidunt fringilla tortor.
      Torquent nullam quam vehicula ad maecenas cursus pretium aenean, per
      viverra eleifend phasellus mauris nostra cum sapien taciti, rhoncus sem ut
      convallis laoreet ridiculus sollicitudin. Commodo in magnis quis volutpat
      et felis accumsan aliquet, praesent non aenean turpis fermentum taciti
      pulvinar. Viverra interdum justo vivamus nunc consequat montes id congue
      metus, sociis vehicula hendrerit leo nec egestas sapien.
    </Text>
  )
}

export const configurator: MantineDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'size',
      type: 'size',
      defaultValue: 'md'
    },
    {
      name: 'lineClamp',
      type: 'number',
      initialValue: 4,
      min: 0,
      max: 10
    }
  ]
}
