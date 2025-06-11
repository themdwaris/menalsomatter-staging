import React from 'react'

const Donation = () => {
  return (
    <div className='w-full px-5 h-screen flex items-center justify-center'>
        <div className='flex items-center gap-4'>
           <button className='px-3 py-1.5 rounded-lg bg-navy-700 text-white cursor-pointer transition transform active:scale-90'>Donate $1</button>
           <button className='px-3 py-1.5 rounded-lg border border-navy-700 text-navy-700 cursor-pointer transition transform active:scale-90'>Learn more</button>
        </div>
    </div>
  )
}

export default Donation