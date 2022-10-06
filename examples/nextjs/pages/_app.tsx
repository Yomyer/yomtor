import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { YomtorProvider } from '@yomtor/styles'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <YomtorProvider
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light'
        }}
      >
        <Component {...pageProps} />
      </YomtorProvider>
    </>
  )
}
