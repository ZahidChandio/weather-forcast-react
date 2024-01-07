import { useState } from 'react';

import Weather from './components/Weather';
import Spinner from './components/Spinner';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=a3a022a3ada4a6f27abeb7085072fced`);
        setWeatherData(response.data);
        setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
    setCity('');
  }

  return (
      <main className="h-screen overflow-hidden">
        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]"/>
        {/* Background Image */}
        <img src="https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"

         alt='background' className='absolute object-fill h-full w-full overflow-hidden'
        />
        <div className='relative flex justify-between items-center max-w-[600px] w-full m-auto pb-0 p-2 sm:px-4 pt-6 text-white z-10'>
          <div className='flex flex-col gap-5 items-center justify-center w-full'>
            <h3 className='text-center text-3xl sm:text-4xl font-semibold text-white'>Weather Forecast</h3>
            <form onSubmit={getWeather} className='flex justify-between gap-2 items-center w-full m-auto px-3 py-1.5 sm:py-2 bg-transparent border-2 border-gray-300 text-white rounded-xl'>
              <div className='w-full'>
                <input type="text" placeholder='Enter City Name' value={city} onChange={(e) => setCity(e.target.value)} 
                  className='text- bg-transparent border-none text-white p-2 rounded-md focus:outline-none h-full w-full'
                />
              </div>
                <button type='submit' className="text-gray-400 outline-none" title='search'> 
                  <i className='fas fa-search text-lg'/>
                </button>
            </form>
          </div>
        </div>
        {/* Weather */}
        <Weather weather={weatherData} isWeatherLoading={loading} isError={error}/>
        { loading && 
          <div className='flex justify-center items-center w-full mt-10'>
            <Spinner />
          </div>
        }
        { !loading && error && city.length === 0 &&
        <div className='relative flex justify-center items-center w-full mt-8 z-[100]'>
          <p className='text-gray-300 font-semibold'>Oops! Could not fetch data. Try another city.</p>
        </div>
        } 
      </main>
  )
}

export default App;