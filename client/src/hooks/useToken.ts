import { useState, useEffect } from 'react'
import { User } from '../interfaces/userInterface'
import UserService from '../services/UserService'

const useToken = (
  setLoggedUser: React.Dispatch<React.SetStateAction<User | null>>
): [string | null, React.Dispatch<React.SetStateAction<string | null>>] => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    async function fetchData(): Promise<void> {
      if (token !== null) {
        try {
          const userService = new UserService()
          const response = await userService.getInfo(token)
          setLoggedUser(response.payload)
        } catch (err) {
          setLoggedUser(null)
          setToken(null)
          localStorage.clear()
        }
      }
    }

    void fetchData()
  }, [token, setToken, setLoggedUser])
  return [token, setToken]
}

export default useToken
