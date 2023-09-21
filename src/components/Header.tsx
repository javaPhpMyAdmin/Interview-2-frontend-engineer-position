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
      <button onClick={toggleColors}>Color rows</button>{' '}
      <button onClick={toggleSortByCountry}>
        {sorting === SortBy.COUNTRY ? 'Undo' : 'Order by country'}
      </button>{' '}
      <button onClick={handleRetriveUsers}>Retrieve deleted users</button>
      <input placeholder='Filter by country' onChange={(e) => { setFilterCountry(e.target.value) }} />
    </header>

  )
}
