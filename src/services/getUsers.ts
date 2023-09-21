const URL_RANDOM_USERS = 'https://randomuser.me/api/?page='
const RESULTS = '&results=10'

const maxPagesToShow = 3

export async function getUsers (page: number = 1) {
  return await fetch(`${URL_RANDOM_USERS}${page}${RESULTS}`)
    .then(async res => await res.json())
    .then(data => {
      const currentPage = data.info.page
      const nextCursor = currentPage >= maxPagesToShow ? undefined : currentPage + 1
      return {
        usersFromApi: data.results,
        nextCursor
      }
    })
}
