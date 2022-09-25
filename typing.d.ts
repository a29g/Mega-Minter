import Image from "next/image"
import { BigNumber } from "ethers"

interface Image {
    assets: {
        url: string
    }
}

export interface Creator {
    _id: string
    name: string
    address: string
    slug: {
        current: string
    }
    image: Image
    bio: string
}

export interface Collection {
    _id: string
    title: string
    description: string
    nftCollectionName: string
    address: string
    slug: {
        current: string
    }
    creator: Creator
    mainImage: Image
    previewImage: Image
}

export interface NFT {
    description: string
    id: BigNumber
    image: string
    name: string
    properties: object
    uri: string
}