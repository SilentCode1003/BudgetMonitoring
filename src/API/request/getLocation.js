import { useQuery } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const getLocation = async () => {
  const res = await budgetAPI.get('/location/load')
  return res.data
}

export const useGetLocation = () => {
  return useQuery({
    queryKey: ['concern'],
    queryFn: getLocation,
  })
}