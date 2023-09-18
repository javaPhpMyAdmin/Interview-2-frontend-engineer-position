import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { UsersList } from './components/UsersList'

const URL_RANDOM_USERS = 'https://randomuser.me/api/?results=100'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalsUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => email !== user.email)
    setUsers(filteredUsers)
  }

  const handleRetriveUsers = () => {
    setUsers(originalsUsers.current)
  }

  useEffect(() => {
    fetch(URL_RANDOM_USERS)
      .then(async res => await res.json())
      .then(data => {
        setUsers(data.results)
        originalsUsers.current = data.results
      }).catch(err => {
        console.log(err)
      })
  }, [])

  const sortUsers = (users: User[]): User[] => {
    console.log('sortUsers')
    return sortByCountry
      ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
      : users
  }

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    return sortUsers(filteredUsers)
  }, [users, sortByCountry])

  return (
    <div>
      <h1>
        Technical interview for a frontend engineer position
      </h1>
      <button onClick={toggleColors}>Colorear filas</button>{' '}
      <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordenar por pais' : 'Ordenar por pais'}
      </button>{' '}
      <button onClick={handleRetriveUsers}>Recuperar usuarios</button>
      <input placeholder='Filtra por pais' onChange={(e) => { setFilterCountry(e.target.value) }} />
     <UsersList handleDelete={handleDelete} users={sortedUsers} showColors={showColors}/>
    </div>
  )
}

export default App
