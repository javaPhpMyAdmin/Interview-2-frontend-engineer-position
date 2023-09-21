import { SortBy } from '../types.d'

interface HeaderProps {
  toggleColors: () => void
  toggleSortByCountry: () => void
  sorting: string
  handleRetriveUsers: () => void
  setFilterCountry: (country: string) => void
}

export function Header ({ toggleColors, toggleSortByCountry, handleRetriveUsers, sorting, setFilterCountry }: HeaderProps) {
  return (
    <header>
      <button onClick={toggleColors}>Colorear filas</button>{' '}
      <button onClick={toggleSortByCountry}>
        {sorting === SortBy.COUNTRY ? 'No ordenar por pais' : 'Ordenar por pais'}
      </button>{' '}
      <button onClick={handleRetriveUsers}>Recuperar usuarios</button>
      <input placeholder='Filtra por pais' onChange={(e) => { setFilterCountry(e.target.value) }} />
    </header>

  )
}
