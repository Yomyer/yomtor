import React from 'react'
import { Button } from '@yomtor/ui'
import Head from 'next/head'
// import { Button } from "@yomtor/ui";

export default () => (
  <>
    <Head>
      <title>Foo</title>
      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width'
      />
    </Head>
    <Button>test</Button>
  </>
)
