import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typing'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center py-10 px-10 2xl:px-0">
      <Head>
        <title>Mega-Minters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mb-10  text-4xl font-light">
        {' '}
        <span className="font-bold underline decoration-yellow-800/50 ">
          DankApes
        </span>{' '}
        market place
      </h1>
      <main className="rounded-lg bg-slate-200 p-10 shadow-xl shadow-blue-300">
        <div className="md: grid grid-cols-2 space-x-3 lg:grid-cols-3 2xl:grid-cols-4">
          {collections.map((collection) => (
            <Link href={`/nft/${collection.slug.current}`}>
              <div className="flex flex-col items-center transition-all duration-200 hover:scale-110">
                <img
                  className="h-96 w-60 rounded-2xl object-cover"
                  src={urlFor(collection.mainImage).url()}
                  alt=""
                ></img>
                <div className="p-5">
                  <h2 className="text-3xl">{collection.title}</h2>
                  <p className="mt-2 text-sm text-teal-600">
                    {collection.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
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

  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections,
    },
  }
}
