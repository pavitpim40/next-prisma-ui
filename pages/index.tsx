import type { GetServerSideProps, NextPage } from 'next'
import  Link  from 'next/link'
export  interface User {
  id: number,
  username : string
  fname: string
  lname: string
  avatar: string
}
export  interface Pet {
  id: number,
  name : string
  avatar: string
}

export interface Pet {

}
const Home: NextPage = ({data}:any) => {
  return (
    <div>
      <ul>
    {data.users.map((user:User) => (
      <li>{user.fname} {user.lname}
        <Link href={`/user/${user.id}`}>
          More...
        </Link>
      </li>
    ))}
    </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8002/user`)
  
  const data = await res.json()
  console.log(data)
  // Pass data to the page via props
  return { props: { data } }
}


export default Home
