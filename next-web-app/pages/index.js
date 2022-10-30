import Head from 'next/head'
import Image from 'next/image'
import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import Canvas from '../components/canvas';

export default function Home() {

  return (
    <div>
      <Head>
        <title>Something About Us...</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className='h-screen bg-gradient-to-b from-slate-900 to-slate-800'>
        {/* Headline Intorduction */}
        <h1 className="flex items-center place-content-center pt-12 text-white text-6xl font-bold"> 
          Home Page <a className='ml-4 underline text-blue-600 hover:text-blue-500' href=''>About Us!</a>
        </h1>

        <Canvas />
        
      </main>
    </div>
  )
}
