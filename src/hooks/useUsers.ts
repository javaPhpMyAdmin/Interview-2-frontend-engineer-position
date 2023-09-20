// import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { getUsers } from '../services/getUsers'
import { type User } from '../types'

interface PropsApi {
  users: User[]
  nextCursor: number
}
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

export function useUsers () {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const originalsUsers = useRef<User[]>([])

  const retrieveUsers = () => {
    setUsers(originalsUsers.current)
  }

  useEffect(() => {
    setIsLoading(true)
    getUsers()
      .then(usrs => {
        originalsUsers.current = usrs
        setUsers(usrs)
      })
      .catch(e => { setIsError(true) })
      .finally(() => { setIsLoading(false) })
  }, [])

  return {
    users,
    setUsers,
    isLoading,
    isError,
    retrieveUsers
  }
}
