/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'
import { format } from "date-fns";
const JobCard = ({job}) => {
  const {price, title, description, category, deadLine, bid_count, _id} = job || {}

  return (
    <Link
      to={`/job/${_id}`}
      className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all'
    >
      <div className='flex items-center justify-between'>
        <span className='text-xs font-light text-gray-800 '>
          Deadline: {format(new Date(deadLine), 'P')}
        </span>
        <span className={`px-3 py-1 text-[8px] text-blue-800 uppercase
          ${category === 'Web Development' && 'text-red-600'}
          ${category === 'Digital Marketing' && 'text-green-600'}
          bg-blue-200 rounded-full`}>
          {category}
        </span>
      </div>

      <div>
        <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
          {title}
        </h1>

        <p className='mt-2 text-sm text-gray-600 '>
          {description}
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>
          Range: {`$${price.minPrice} - $${price.maxPrice}`}
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>Total Bids: {bid_count}</p>
      </div>
    </Link>
  )
}

export default JobCard
