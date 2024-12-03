import { UserProps } from "../types/user"
import Search from "../components/Search/Search"
import User from "../components/User/User"
import Erro from "../components/Erro/Erro"
import Loader from "../components/Loader/Loader"
import { useState } from "react"

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const loadUser = async(userName: string) => {
    setUser(null)
    setIsLoading(true)

    const res = await fetch(`https://api.github.com/users/${userName}`)
    
    const data = await res.json()

    setIsLoading(false)

    if (res.status === 404) {
        setError(true)
        return
    }

    setError(false)

    const { avatar_url, login, location, followers, following} = data

    const userData: UserProps = {
        avatar_url, 
        login,
        location, 
        followers, 
        following 
    }

    setUser(userData)
  }

  return (
    <div>
        <Search loadUser={loadUser}/>
        {isLoading && <Loader />}
        {user && <User {...user}/>}
        {error && <Erro/>}
    </div>
  )
}

export default Home