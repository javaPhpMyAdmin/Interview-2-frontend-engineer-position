import { useUsers } from '../hooks/useUsers'
import { type SortBy, type User } from '../types.d'
import { UsersList } from './UsersList'

interface MainProps {
  handleSortBy: (sort: SortBy) => void
  handleDelete: (email: string) => void
  sortedUsers: User[]
  showColors: boolean
  filterCountry?: string
  loadMoreUsers: () => void
}

export function Main ({
  handleSortBy,
  handleDelete,
  sortedUsers,
  showColors,
  filterCountry,
  loadMoreUsers
}: MainProps) {
  const { users, isLoading, isError, noMoreResults } = useUsers()
  return (
    <main>
      <UsersList
        changeSorting={handleSortBy}
        handleDelete={handleDelete}
        users={sortedUsers}
        showColors={showColors}
      />
      {isLoading && <strong>Cargando...</strong>}
      {isError && <p>Ha habido un error</p>}
      {!isLoading && !isError && users?.length === 0 && <p>No hay usuarios</p>}
      {
        !isLoading && !isError && !noMoreResults && <button onClick={loadMoreUsers}>Cargar mas datos</button>

      }
      {
        !isLoading && !isError && noMoreResults && <p>No hay mas resultados</p>
      }
      {
        !isLoading && !isError && noMoreResults && filterCountry === null && <a href='#'>Ir al inicio</a>
      }
    </main>
  )
}
