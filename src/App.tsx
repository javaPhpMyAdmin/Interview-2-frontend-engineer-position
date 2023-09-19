import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { type User, SortBy } from './types.d'
import { UsersList } from './components/UsersList'

const URL_RANDOM_USERS = 'https://randomuser.me/api/?results=100'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalsUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => email !== user.email)
    setUsers(filteredUsers)
  }

  const handleRetriveUsers = () => {
    setUsers(originalsUsers.current)
  }

  const handleSortBy = (sort: SortBy) => {
    setSorting(sort)
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
    if (sorting === SortBy.NONE) return users

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }
    return users.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
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
  }, [users, sorting])

  return (
      <div>
      <h1>
        Technical interview for a frontend engineer position
      </h1>

      <header>
            <button onClick={toggleColors}>Colorear filas</button>{' '}
      <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por pais' : 'Ordenar por pais'}
      </button>{' '}
      <button onClick={handleRetriveUsers}>Recuperar usuarios</button>
      <input placeholder='Filtra por pais' onChange={(e) => { setFilterCountry(e.target.value) }} />
      </header>
     <UsersList changeSorting={handleSortBy} handleDelete={handleDelete} users={sortedUsers} showColors={showColors}/>
    </div>
  )
}

export default App
