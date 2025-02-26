import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';
import { ApiCacheProvider } from '../utils/ApiCacheContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Clash of Clans Tracker</title>
        <meta name="description" content="Track your Clash of Clans clan progress and members" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ApiCacheProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApiCacheProvider>
    </>
  );
}

export default MyApp; 