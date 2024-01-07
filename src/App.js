import { useState } from 'react';
import {  useDispatch, useSelector } from "react-redux";

import Weather from './components/Weather';
import Spinner from './components/Spinner';
import { fetchWeather } from "./redux/weather/action";

function App() {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weatherReducer = useSelector((state) => state.weather);
  const weather = weatherReducer?.data || null;
  const loading = weatherReducer?.loading || false;
  const error = weatherReducer?.errors || null;
  
  const getWeather = async (e) => {
    e.preventDefault();
    dispatch(fetchWeather(city));
    setCity('');
  }

  return (
      <main className="">
        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]"/>
        {/* Background Image */}
        <img src="https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"

         alt='background' className='absolute object-fill h-full w-full overflow-hidden'
        />
        <div className='relative flex justify-between items-center max-w-[600px] w-full m-auto pb-0 p-2 sm:px-4 pt-8 text-white z-10'>
          <form onSubmit={getWeather} className='flex justify-between gap-2 items-center w-full m-auto px-3 py-1.5 bg-transparent border-2 border-gray-300 text-white rounded-xl'>
            <div className='w-full'>
              <input type="text" placeholder='Enter City Name' value={city} onChange={(e) => setCity(e.target.value)} 
                className='text- bg-transparent border-none text-white p-2 rounded-md focus:outline-none h-full w-full'
              />
            </div>
              <button type='submit' className="text-gray-400" title='search'> 
                <i className='fas fa-search text-lg'/>
              </button>
          </form>
        </div>
        {/* Weather */}
        { weather?.main && !loading && !error ? 
          <Weather weather={weather}/>
        :
        loading && 
          <div className='flex justify-center items-center w-full mt-10'>
            <Spinner />
          </div>
        }
        { error && city.length === 0 &&
        <div className='relative flex justify-center items-center w-full mt-8 z-[100]'>
          <p className='text-gray-300 font-semibold'>Oops! Could not fetch data. Try another city.</p>
        </div>
        } 
      </main>
  )
}

export default App;