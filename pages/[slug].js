import Link from "next/link";
import Head from 'next/head'
import parse from 'html-react-parser'
import {getPost, getSlugs} from "../utils/wordpress";

export default function PostPage({post}){
    const yoastHead = parse(post.yoast_head)
    //const {yoastHead} = post.yoast_head.toString()
    console.log(post.yoast_head.toString())
    return (
        <div>
        <Head>
        { yoastHead }
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossOrigin="anonymous" />       
      </Head>
        <div className="container pt-5">
            <h1 className="text-center pb-5">{post.title.rendered}</h1>
            <div className="card-text pb-5" dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
        </div>
        </div>
    )
}

//hey Next, these are the possible slugs
export async function getStaticPaths() {

    const paths = await getSlugs("posts");
  
    return {
        paths,
        //this option below renders in the server (at request time) pages that were not rendered at build time
        //e.g when a new blogpost is added to the app
        fallback: 'blocking'
    }
  
  }
  
//access the router, get the id, and get the data for that post

export async function getStaticProps({ params }) {

//const post = await getPost(params.slug);

//return {
 //   props: {
 //   post
 //   },
 //   revalidate: 10, // In seconds
//}





const res = await fetch('https://wp.hauca.win/wp-json/wp/v2/posts?slug='+params.slug)
    const json = await res.json()
    console.log(json)
    return {
        props: {
            post: json[0],
        },
        revalidate: 10, // In seconds
    }


}

