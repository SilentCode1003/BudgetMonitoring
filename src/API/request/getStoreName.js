import { useQuery } from '@tanstack/react-query'
import { ticketAPI } from '../axios'

export const getClientName = async () => {
  const res = await ticketAPI.get('/client/load')
  return res.data
}

export const useGetClientName = () => {
  return useQuery({
    queryKey: ['client'],
    queryFn: getClientName,
  })
}