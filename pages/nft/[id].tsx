import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typing'
import Link from 'next/link'

interface Props {
  collection: Collection
}

function NFTdropPage({ collection }: Props) {
  //AUTH
  const connectWithMM = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()
  //

  console.log(address)
  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* Left */}

      <div className=" bg-gradient-to-br from-blue-700 to-orange-600 lg:col-span-4">
        <div className="lg: flex min-h-screen flex-col items-center justify-center py-2 ">
          <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72 "
              src={urlFor(collection.previewImage).url()}
              alt=""
            />
          </div>

          <div className="space-y-2 p-5 text-center ">
            <h1 className="text-black-500 text-4xl font-bold">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link href={'/'}>
            <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80 ">
              {' '}
              <span className="font-bold underline decoration-yellow-800/50 ">
                DankApes
              </span>{' '}
              market place
            </h1>
          </Link>

          <button
            onClick={() => (address ? disconnect() : connectWithMM())}
            className="rounded-full bg-orange-400 px-4 py-2 text-sm font-bold text-white lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? 'Sign out' : 'Sign in'}
          </button>
        </header>

        <hr className="my-2 border-2" />
        {address && (
          <p className="pt-3 text-center text-sm text-rose-800">
            You're logged in with wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}{' '}
          </p>
        )}

        {/* content */}
        <div className="sapce-y-6 mt-10 flex flex-1 flex-col items-center lg:justify-center lg:space-y-1">
          <img
            className="w-80 object-cover pb-10 lg:h-60"
            src={urlFor(collection.mainImage).url()}
            alt=""
          />

          <h1 className="text-3xl font-semibold lg:text-4xl lg:font-bold">
            {collection.title}
          </h1>
          <p className="pt-5 text-xl text-green-600">
            {' '}
            13 out of the well mate
          </p>
        </div>

        {/* button */}
        <button className="mt-10 h-14 w-full rounded-full bg-orange-600 font-bold text-white">
          Mint NFT (0.01 ETH)
        </button>
      </div>
    </div>
  )
}

export default NFTdropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
    _id,
    title,
    description,
    nftCollectionName,
    mainImage{
      asset
    },
    previewImage{
      asset
    },
    slug{
      current
    },
    creator->{
      _id,
      name,
      address,
      slug{
      current
      },
    }
  }`

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })

  if (!collection) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection,
    },
  }
}
