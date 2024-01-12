"use client";

import { UnsplashImage } from "@/models/unsplash-image";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { Button, Form, Spinner } from "react-bootstrap";
import styles from "./SearchPage.module.css"

export default function SearchPage(){
    const [searchResults,setSearchResults]=useState<UnsplashImage[]|null>(null)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData=new FormData(e.target as HTMLFormElement);
        const query=formData.get("query")?.toString().trim();

        if(query){
           try{
            setSearchResults(null)
            setError(false)
            setLoading(true)
            const response=await fetch("/api/search?query="+query);
            const images:UnsplashImage[]=await response.json()
            setSearchResults(images)
           }catch(error){
            console.log(error);
            setError(true)
           }finally{
            setLoading(false)
           }
        }
    }
    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label>Search query</Form.Label>
                    <Form.Control name="query" placeholder="E.g. cats, hotdogs, ...">

                    </Form.Control>

                </Form.Group>
                <Button type="submit" className="mb-3" disabled={loading}>Search</Button>
            </Form>
            <div className="d-flex flex-column align-items-center">
                {loading && <Spinner animation="border"/>}
                {error && <p>Something went wrong. Please try again</p>}
                {searchResults?.length===0 && <p>Nothing found. Try a different query!</p>}
            </div>

            {searchResults && <>
            {searchResults.map((image)=>(
                <Image src={image.urls.raw} width={250} height={250} alt={image.description} key={image.urls.raw} className={styles.image}/>
            ))}
            </>}
        </div>
    )
}