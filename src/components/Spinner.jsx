import React from 'react';

import spinnerIcon from '../static/icons/spinner.svg';

function Spinner() {
  return (
    <div>
      <img src={spinnerIcon} className='animate-spin h-20 w-20 fill-gray-300' alt="Spinner"/>
    </div>
  )
}

export default Spinner
