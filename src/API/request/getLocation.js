import { useQuery } from '@tanstack/react-query'
import { ticketAPI } from '../axios'

export const getLocation = async () => {
  const res = await ticketAPI.get('/location/load')
  return res.data
}

export const useGetLocation = () => {
  return useQuery({
    queryKey: ['concern'],
    queryFn: getLocation,
  })
}