import Image from "next/image"

interface Image{
    asset: {
        url: string
    }
}

export interface Creator{
    _id : string
    name : string
    address: string
    slug: {
        current:string
    }
    image : Image
    bio: string
}

export interface Collection{
    _id: String
    title: string
    description: string
    nftCollectionName: String
    addess: string
    slug: {
        current: string
    }
    previewImage: Image
    mainImage: Image
    creator: Creator
}