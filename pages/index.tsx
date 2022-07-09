import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

const Home: NextPage<Props> = ({ posts }: Props) => {
  console.log('psops', posts)
  return (
    <div className="max-w-5xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to read, write and connect.
          </h1>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            temporibus nemo doloribus corporis! Voluptates, inventore.
          </h2>
        </div>
        <img
          src="https://o.remove.bg/downloads/6d6905d6-f72e-4a70-a418-1dd993a04547/png-transparent-medium-logo-publishing-blog-business-medium-angle-text-trademark-thumbnail-removebg-preview.png"
          alt=""
          className="hidden md:inline-flex h-32 lg:h-full"
        />
      </div>
      {/* posts */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer overflow-hidden">
              <img
                src={urlFor(post.mainImage).url()}
                className="h-60 w-full object-cover group-hover:scale-105
                transition-all duration-200 ease-in-out border rounded-lg
                "
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">{`${post.description} by ${post.author.name}`}</p>
                </div>
                <img
                  className="w-12 h-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]
  {
      _id, 
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug,
      _createdAt
    }`

  const post = await sanityClient.fetch(query)

  return {
    props: {
      posts: post,
    },
  }
}

export default Home
