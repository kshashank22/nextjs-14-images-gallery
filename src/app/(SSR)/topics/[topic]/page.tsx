import { UnsplashImage } from "@/models/unsplash-image"
import Image from "next/image"
import styles from "./TopicPage.module.css"
import {Alert} from "@/components/bootstrap"
import { Metadata } from "next"

//export const dynamicParams=false;
interface PageProps{
    params:{topic:string},
}
export function generateMetadata({params:{topic}}:PageProps):Metadata{
    return{
        title:topic+" -NextJS 14 Image Gallery "
    }
}

export function generateStaticParams(){
    return ["fruits","temples","bikes"].map(topic=>({topic}))
}

export default async function Page({params:{topic}}:PageProps){
    const response=await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
    const images:UnsplashImage[]=await response.json()
    
    return(
        <div>
            <Alert>
                This page <strong>Refers to Generate Static Params </strong>page
            </Alert>
            <h1>{topic}</h1>
            {images.map((image)=>(
                <Image className={styles.image} src={image.urls.raw} width={250} height={250} alt={image.description} key={image.urls.raw}/>
            ))}
        </div>
    )
}