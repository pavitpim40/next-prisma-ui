import {GetStaticProps,GetStaticPaths} from 'next'
import {User,Pet} from "../index"

function User({ data }:any) {
    return (
      <ul>
       {data.user.fname} {data.user.lname} {data.user.avatar}
       {data.user.pets.map((pet:Pet)=> (
           <li key={pet.id}>
               {pet.name} {pet.avatar}
           </li>
       ))}
       </ul>
    )
  }
  
  // This function gets called at build time on server-side.
  // It may be called again, on a serverless function, if
  // revalidation is enabled and a new request comes in
  export const getStaticProps:GetStaticProps = async (context) =>  {

    const res = await fetch(`http://localhost:8002/user/${context.params?.id}`)
    const data = await res.json()
  
    return {
      props: {
        data,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    }
  }
  
  // This function gets called at build time on server-side.
  // It may be called again, on a serverless function, if
  // the path has not been generated.
  export const  getStaticPaths:GetStaticPaths = async ()=> {
    const res = await fetch('http://localhost:8002/user')
    const data = await res.json()
    console.log(data)
    // Get the paths we want to pre-render based on posts
    const paths = data.users.map((user:User) => ({
      params: { id: String(user.id) },
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
  }
  
  export default User