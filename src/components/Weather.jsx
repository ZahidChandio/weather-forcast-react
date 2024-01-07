import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Weather({ weather, isLoading, isError }) {
    const [constantCitiesWeather, setConstantCitiesWeather] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const constantCities = ['New York', 'Dubai', 'London', 'Berlin', 'Kutaisi'];

    const getWeathers = async (city) => {
        setLoading(true);
        try {
            constantCities.forEach(async(city) =>  {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=a3a022a3ada4a6f27abeb7085072fced`);
                setConstantCitiesWeather(prev => [...prev, response.data]);
            });
            setError(null);
        } catch (error) {
            console.log(error);
            setError(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getWeathers();
    }, []);
  return (
    <div className='flex flex-col justify-between w-full h-[85vh] m-auto p-4 text-gray-300 z-10 border'>
        { weather?.main && !isLoading && !isError ?
            <div className='relative flex flex-col gap-8 sm:gap-12 max-w-[700px] w-full mx-auto text-gray-300 z-10 mt-8'>
                {/* Top */}
                <div className='relatie flex justify-between'>
                    <div className='flex flex-col gap-0 sm:gap-2 items-center'>
                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
                            alt='weather icon'
                            // width='100'
                            // height='100'
                            className='h-20 sm:h-[100px] w-20 sm:w-[100px]'
                        />
                        <span className='text-lg sm:text-2xl font-semibold'>{weather.weather[0].main}</span>
                    </div>
                    <p className='text-4xl sm:text-7xl md:text-7xl'><span className='text-3xl'>Temp</span> {weather?.main?.temp?.toFixed(0)}&#176;</p>
                </div>
                {/* Bottom */}
                <div className='bg-black/50 relative p-4 sm:p-8 rounded-md'>
                    <p className='text-3xl text-center pb-4 sm:pb-6'>Weather in {weather?.name}</p>
                    <div className='flex gap-6 sm:gap-4 justify-center sm:justify-between items-center flex-wrap'>
                        <div className='text-center'>
                            <p className='text-lg sm:text-2xl font-bold'>{weather?.main?.feels_like?.toFixed(0)}&#176;</p>
                            <p className='sm:text-lg'>Feels Like</p>
                        </div>
                        <div className='text-center'>
                            <p className='text-lg sm:text-2xl font-bold'>{weather?.main?.humidity}%</p>
                            <p className='sm:text-lg'>Humidity</p>
                        </div>
                        <div className='text-center'>
                            <p className='text-lg sm:text-2xl font-bold'>{weather?.wind?.speed?.toFixed(0)} km/h</p>
                            <p className='sm:text-lg'>Wind Speed</p>
                        </div>  
                        <div className='text-center'>
                            <p className='text-lg sm:text-2xl font-bold'>{weather?.main?.pressure?.toFixed(0)} km/h</p>
                            <p className='sm:text-lg'>Pressure</p>
                        </div>  
                    </div>
                </div>
            </div>:<div></div>
        }
        <div className='flex gap-4 justify-between flex-wrap'>
            {constantCitiesWeather.map((city, index) => (           
                <div className='flex flex-col gap-4 items-center justify-center text-white relative rounded-md sm:min-w-[170px]' key={index}>
                    <p className='text-xl sm:text-3xl text-cente font-semibold'>{city?.name}</p>
                    <div className='flex gap-6 sm:gap-4 justify-center sm:justify-between items-center flex-wrap'>
                        <div className='text-center'>
                            <p className='text-lg sm:text-2xl md:text-3xl font-bold'>{city?.main?.temp?.toFixed(0)}&#176;</p>
                            <p className='sm:text-lg md:text-xl'>Temp</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Weather
