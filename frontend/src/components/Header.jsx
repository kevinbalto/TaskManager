import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='px-4 py-5 bg-white border-b'>
        <div className='md:flex md:justify-between'>
            <h2 className='text-4xl text-gray-600 font-black text-center'>
                Task Manager
            </h2>
            <input 
                type="search" 
                placeholder='Search Projects'
                className='rounded-lg lg:w-96 block p-2 border'
            />
            <div className='flex items-center gap-4'>
                <Link 
                    to="/projects"
                    className='font-bold'>
                        Projects
                </Link>
                <button
                    type='button'
                    className='text-white text-sm bg-red-600 p-3 rounded font-bold'
                >
                    Log out
                </button>
            </div>
        </div>
    </header>
  )
}
