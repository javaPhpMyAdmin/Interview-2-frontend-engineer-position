import { type SortBy, type User } from '../types.d'
import { UsersList } from './UsersList'

interface MainProps {
  handleSortBy: (sort: SortBy) => void
  handleDelete: (email: string) => void
  sortedUsers: User[]
  showColors: boolean
  filterCountry: string | null
  loadMoreUsers: () => void
  noMoreResults: boolean
  isLoading: boolean
  isError: boolean
}

export function Main ({
  handleSortBy,
  handleDelete,
  sortedUsers,
  showColors,
  filterCountry,
  loadMoreUsers,
  noMoreResults,
  isLoading,
  isError
}: MainProps) {
  return (
    <main>
      <UsersList
        changeSorting={handleSortBy}
        handleDelete={handleDelete}
        users={sortedUsers}
        showColors={showColors}
      />
      {isLoading && <strong>Loading...</strong>}
      {isError && <p>Something went wrong</p>}
      {!isLoading && !isError && sortedUsers?.length === 0 && <p>No users to show</p>}
      {
        !isLoading && !isError && !noMoreResults && <button onClick={loadMoreUsers}>Load more users</button>

      }
      {
        !isLoading && !isError && noMoreResults && sortedUsers?.length !== 0 && filterCountry === null && <p>No more results to show</p>
      }
      {
        !isLoading && !isError && noMoreResults && sortedUsers?.length !== 0 && filterCountry === '' && <p>No more results to show</p>
      }
      {
        !isLoading && !isError && noMoreResults && filterCountry === null && <a href='#'>Go up</a>
      }

      {
        !isLoading && !isError && noMoreResults && filterCountry === '' && <a href='#'>Go up</a>
      }
    </main>
  )
}
