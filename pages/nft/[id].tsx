import React, { useEffect, useState } from 'react'
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typing'
import Link from 'next/link'
import { BigNumber } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  collection: Collection
}

function NFTdropPage({ collection }: Props) {
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [priceInEth, setPriceInEth] = useState<string>()

  const [loading, setLoading] = useState<boolean>(true)

  const nftDrop = useNFTDrop(collection.address)
  //AUTH
  const connectWithMM = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()
  //
  useEffect(() => {
    if (!nftDrop) return

    const fetchPrice = async () => {
      const claimedConditions = await nftDrop.claimConditions.getAll()

      setPriceInEth(claimedConditions?.[0].currencyMetadata.displayValue)
    }

    const fetchNFTDropData = async () => {
      setLoading(true)

      const claimed = await nftDrop.getAllClaimed()
      const total = await nftDrop.totalSupply()

      setClaimedSupply(claimed.length)
      setTotalSupply(total)

      setLoading(false)
    }

    !priceInEth && fetchPrice()
    fetchNFTDropData()
  }, [nftDrop])

  const mintNFT = () => {
    if (!nftDrop || !address) return

    const quantity = 1 //How many NFT you want to MINT

    setLoading(true)

    const notification = toast.loading('Minting...', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      },
    })

    nftDrop
      .claimTo(address, quantity)
      .then(async (tx) => {
        const claimedTokenId = tx[0].id
        const claimedNFT = await tx[0].data() // Get the claimed NFT metadata

        console.log(claimedTokenId)

        toast('Succesfully Minted! Congratulations on your new NFT', {
          icon: '🏆',
          duration: 6000,
          style: {
            background: 'green',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })
      })
      .catch((err) => {
        console.log(err)
        toast('Whoops... Something went wrong!', {
          style: {
            background: 'red',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss(notification)
      })
  }

  //console.log(address)
  return (
    <div className=" flex h-screen flex-col lg:grid lg:grid-cols-10">
      <Toaster position="top-center" />
      {/* Left */}

      <div className="bg-300 animate-move rounded-l bg-black lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-8 lg:min-h-screen lg:py-2">
          <div className="rounded-xl bg-gradient-to-br from-white to-purple-600 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72 "
              src={urlFor(collection.previewImage).url()}
              alt=""
            />
          </div>

          <div className="space-y-2 p-5 text-center ">
            <h1 className="text-4xl font-bold text-yellow-500">
              {collection.nftCollectionName}
            </h1>
            <h2 className="font-mono text-xl text-white">
              {collection.description}
            </h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col bg-black p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link href={'/'}>
            <h1 className="w-52 cursor-pointer font-serif text-2xl font-extralight text-white sm:w-80 ">
              {' '}
              <span className="font-bold text-yellow-500 underline decoration-orange-500 ">
                TopShot
              </span>{' '}
              market place
            </h1>
          </Link>

          <button
            onClick={() => (address ? disconnect() : connectWithMM())}
            className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-black lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? 'Sign out' : 'Sign in'}
          </button>
        </header>

        <hr className="my-2 border-2" />
        {address && (
          <p className="pt-3 text-center text-sm text-orange-500">
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

          {loading ? (
            <p className="animate-bounce pt-5 text-xl text-yellow-500">
              {' '}
              Loading Supply count....
            </p>
          ) : (
            <p className="pt-5 text-xl text-yellow-500">
              {' '}
              {claimedSupply} / {totalSupply?.toString()} NFT out of well mate
            </p>
          )}
        </div>

        {/*Mint button */}
        <button
          onClick={mintNFT}
          disabled={
            loading || claimedSupply === totalSupply?.toNumber() || !address
          }
          className="mt-10 h-14 w-full rounded-full bg-yellow-500 font-bold text-black disabled:bg-yellow-500"
        >
          {loading ? (
            <>Loading</>
          ) : claimedSupply === totalSupply?.toNumber() ? (
            <>Sold Out</>
          ) : !address ? (
            <>Sign in to mint</>
          ) : (
            <span>Mint NFT ({priceInEth} ETH)</span>
          )}
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
    address,
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
