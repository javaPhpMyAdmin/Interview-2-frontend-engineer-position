import { useMemo, useState } from 'react'
import './App.css'
import { type User, SortBy } from './types.d'
import { useUsers } from './hooks/useUsers'
import { Header } from './components/Header'
import { Main } from './components/Main'

function App () {
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

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

  const {
    users,
    loadUsers,
    retrieveUsers,
    getMoreUsers,
    noMoreResults,
    isLoading,
    isError
  } = useUsers()

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const loadMoreUsers = () => {
    getMoreUsers()
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user: User) => email !== user.email)
    loadUsers(filteredUsers)
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
        <Header
          toggleColors={toggleColors}
          toggleSortByCountry={toggleSortByCountry}
          sorting={sorting}
          handleRetriveUsers={handleRetriveUsers}
          setFilterCountry={setFilterCountry}
        />
        <Main
          isLoading={isLoading}
          isError={isError}
          noMoreResults={noMoreResults}
          loadMoreUsers={loadMoreUsers}
          showColors={showColors}
          sortedUsers={sortedUsers}
          handleDelete={handleDelete}
          handleSortBy={handleSortBy}
          filterCountry={filterCountry}
        />
    </div>
  )
}

export default App
