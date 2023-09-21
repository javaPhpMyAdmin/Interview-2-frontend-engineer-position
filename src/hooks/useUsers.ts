// import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { getUsers } from '../services/getUsers'
import { type User } from '../types'

// USING REACT QUERY FOR PRACTICE
// export function useUsers () {
//   const {
//     isLoading,
//     isError,
//     data,
//     fetchNextPage,
//     hasNextPage,
//     refetch
//   } = useInfiniteQuery<PropsApi>(
//     ['/getUsers'],
//     getUsers,
//     {
//       getNextPageParam: (lastPage) => lastPage.nextCursor,
//       refetchOnWindowFocus: false
//     }
//   )
//
//   return {
//     isLoading,
//     isError,
//     data,
//     fetchNextPage,
//     hasNextPage,
//     refetch
//   }
// }

interface UsersProps {
  usersFromApi: User[]
  nextCursor?: number
}

export function useUsers () {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [noMoreResults, setNoMoreResults] = useState(false)

  const originalsUsers = useRef<User[]>([])

  const getMoreUsers = () => {
    setCurrentPage(currentPage + 1)
  }

  const loadUsers = (people: User[]) => {
    setUsers(people)
  }

  const retrieveUsers = () => {
    setUsers(originalsUsers.current)
  }

  useEffect(() => {
    setIsLoading(true)
    getUsers(currentPage)
      .then((data: UsersProps) => {
        originalsUsers.current = [...users, ...data.usersFromApi]
        if (data.nextCursor === undefined) { setNoMoreResults(true) }
        setUsers([...users, ...data.usersFromApi])
      })
      .catch(e => {
        console.log(e)
        setIsError(true)
      })
      .finally(() => { setIsLoading(false) })
  }, [currentPage])

  return {
    users,
    loadUsers,
    isLoading,
    isError,
    retrieveUsers,
    getMoreUsers,
    noMoreResults
  }
}
