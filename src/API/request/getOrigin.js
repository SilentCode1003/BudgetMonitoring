import { useQuery } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const getOrigin = async () => {
  const res = await budgetAPI.get('/route/getorigin')
  return res.data
}

export const useGetOrigin = () => {
  return useQuery({
    queryKey: ['issue'],
    queryFn: getOrigin,
  })
}