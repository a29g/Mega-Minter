import React from 'react'
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";

function NFTdropPage() {

    //AUTH
    const connectWithMM = useMetamask()
    const address = useAddress()
    const disconnect = useDisconnect()
    //

    console.log(address)
  return (
    <div className='flex h-screen flex-col lg:grid lg:grid-cols-10'>
        {/* Left */}

        <div className=' bg-gradient-to-br from-blue-700 to-orange-600 lg:col-span-4'>
            <div className='flex flex-col items-center justify-center py-2 lg: min-h-screen '>

                <div className='bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>

                <img className='w-44 rounded-xl object-cover lg:h-96 lg:w-72 ' 
                src="https://cdn.sanity.io/images/9ep8u6nk/production/ee298e2fb78803f3226dcde22f1f2a8d69f56fad-600x600.png" alt="" />
                
                </div>
                
                <div className='space-y-2 p-5 text-center '>
                    <h1 className='text-4xl font-bold text-black' >
                        Maha Minters
                    </h1>
                    <h2 className='text-xl text-gray-300' >
                        Collection of boldest and strongest apes of minters ally
                    </h2>
                </div>
            
            </div>

        </div>

        {/* Right */}
        <div className='flex flex-1 flex-col p-12 lg:col-span-6'>
            {/* Header */}
            <header className='flex items-center justify-between'>
                <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80 '>
                    {' '}
                    <span className='font-extrabold underline decoration-yellow-600/50 '>
                        Minters
                    </span>
                        {' '} 
                        market place
                </h1>
                <button onClick={() => (address ? disconnect() : connectWithMM())} 
                className='rounded-full bg-rose-400 px-4 py-2 text-sm font-bold text-white lg:px-5 lg:py-3 lg:text-base'>
                    
                    {address ? 'Sign out' : 'Sign in'}
                
                </button>
            </header>

            <hr className='my-2 border-2'/>
            {address && (
                <p className='pt-3 text-center text-sm text-rose-800'>You're logged in with wallet {address.substring(0,5)}...{address.substring(address.length-5)} </p>
            )}


            {/* conetent */}
            <div className='mt-10 flex flex-1 flex-col items-center sapce-y-6 lg:space-y-1 lg:justify-center'>
                <img className='w-80 object-cover pb-10 lg:h-40' 
                src="https://cdn.sanity.io/images/9ep8u6nk/production/f72570921cab407c11a39c8e1717f5607718e14d-2951x2430.webp" alt="" />

                <h1 className='text-3xl font-semibold lg:text-5xl lg:font-bold'>Dropping the g's for all the homies</h1>
                <p className='pt-5 text-xl text-green-600'> 13 out of the well mate</p>

            </div>

            {/* button */}
            <button className='h-16 w-full bg-orange-600 rounded-full text-white mt-10 font-bold'>
                Mint NFT (0.01 ETH)
            </button>



        </div>


    </div>
  )
}

export default NFTdropPage