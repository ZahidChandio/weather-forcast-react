import Image from 'next/image';
import React from 'react'

function Weather({ weather }) {
  return (
    <div className='relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 text-gray-300 z-10'>
        {/* Top */}
        <div className='relatie flex justify-between pt-12'>
            <div className='flex flex-col items-center'>
                <Image src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                    alt='/'
                    width='100'
                    height='100'
                />
                <p className='text-2xl'>{weather.weather[0].main}</p>
            </div>
            <p className='text-6xl sm:text-7xl md:text-9xl'>{weather?.main?.temp?.toFixed(0)}&#176;</p>
        </div>
        {/* Bottom */}
        <div className='bg-black/50 relative p-6 sm:p-8 rounded-md'>
            <p className='text-2xl text-center pb-4 sm:pb-6'>Weather in {weather?.name}</p>
            <div className='flex justify-between'>
                <div className=''>
                    <p className='text-lg sm:text-2xl font-semibold'>{weather?.main?.feels_like?.toFixed(0)}&#176;</p>
                    <p className='sm:text-xl'>Feels Like</p>
                </div>
                <div className=''>
                    <p className='text-lg sm:text-2xl font-semibold'>{weather?.main?.humidity}%</p>
                    <p className='sm:text-xl'>Humidity</p>
                </div>
                <div className=''>
                    <p className='text-lg sm:text-2xl font-semibold'>{weather?.wind?.speed?.toFixed(0)} km/h</p>
                    <p className='sm:text-xl'>Wind</p>
                </div>  
            </div>
        </div>
    </div>
  )
}

export default Weather
