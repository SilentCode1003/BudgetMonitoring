import { useQuery } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const getTransportation = async () => {
  const res = await budgetAPI.get('/transportation/load')
  return res.data
}

export const useGetTransportation = () => {
  return useQuery({
    queryKey: ['transportation'],
    queryFn: getTransportation,
  })
}