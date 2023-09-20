import { useMemo, useState } from 'react'
import './App.css'
import { type User, SortBy } from './types.d'
import { UsersList } from './components/UsersList'
import { useUsers } from './hooks/useUsers'

function App () {
  // const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // USING REACT QUERY
  // const {
  //   isLoading,
  //   isError,
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   refetch
  // } = useUsers()

  // const users = data?.pages?.flatMap(page => page.users)

  const { users, setUsers, isLoading, isError, retrieveUsers } = useUsers()

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const loadMoreData = () => {
    // void fetchNextPage()
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user: User) => email !== user.email)
    setUsers(filteredUsers)
  }

  const handleRetriveUsers = () => {
    retrieveUsers()
  }

  const handleSortBy = (sort: SortBy) => {
    setSorting(sort)
  }

  const sortUsers = (filteredUsers: User[]) => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }
    return filteredUsers?.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }

  const filteredUsers = useMemo(() => {
    console.log('country', filterCountry?.length)
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter((user: User) => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    return sortUsers(filteredUsers)
  }, [filteredUsers, sorting])

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
      <main>
        <UsersList changeSorting={handleSortBy} handleDelete={handleDelete} users={sortedUsers} showColors={showColors} />
        {isLoading && <strong>Cargando...</strong>}
        {isError && <p>Ha habido un error</p>}
        {!isLoading && !isError && users?.length === 0 && <p>No hay usuarios</p>}
        {
          !isLoading && !isError && <button onClick={loadMoreData}>Cargar mas datos</button>

        }
        {/*
          !isLoading && !isError && <p>No hay mas resultados</p>
        */}
      </main>
    </div>
  )
}

export default App
