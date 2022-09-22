import React from 'react'
import { Text } from './Text'

export default {
  title: 'UI/Typography/Text'
}

export function Default() {
  return (
    <>
      <Text size='xs'>Extra small text</Text>
      <Text size='sm'>Small text</Text>
      <Text size='md'>Default text</Text>
      <Text size='lg'>Large text</Text>
      <Text size='xl'>Extra large text</Text>
      <Text weight={500}>Semibold</Text>
      <Text weight={700}>Bold</Text>
      <Text italic>Italic</Text>
      <Text underline>Underlined</Text>
      <Text strikethrough>Strikethrough</Text>
      <Text variant='link' component='a' href='https://mantine.dev'>
        Link variant
      </Text>
      <Text color='primary'>Primary color text</Text>
      <Text color='info'>Info color text</Text>
      <Text color='warning'>Warning color text</Text>
      <Text color='error'>Error color text</Text>
      <Text transform='uppercase'>Uppercase</Text>
      <Text transform='capitalize'>capitalized text</Text>
      <Text align='center'>Aligned to center</Text>
      <Text align='right'>Aligned to right</Text>
    </>
  )
}
