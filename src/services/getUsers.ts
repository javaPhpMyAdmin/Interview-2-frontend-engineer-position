const URL_RANDOM_USERS = 'https://randomuser.me/api/?results=10'

// const maxPagesToShow = 3

// USING REACT QUERY PAGINATION
// export async function getUsers ({ pageParam = 1 }: { pageParam?: number }) {
//   return await fetch(`${URL_RANDOM_USERS}&page=${pageParam}`)
//     .then(async res => await res.json())
//     .then(data => {
//       const currentPage = data.info.page
//       const nextCursor = currentPage > maxPagesToShow ? undefined : currentPage + 1
//       return {
//         users: data.results,
//         nextCursor
//       }
//     })
// }

export async function getUsers () {
  return await fetch(`${URL_RANDOM_USERS}`)
    .then(async res => await res.json())
    .then(data => {
      return data.results
    })
}
