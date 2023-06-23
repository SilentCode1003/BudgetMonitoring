import { useQuery } from '@tanstack/react-query'
import { ticketAPI } from '../axios'

export const getConcern = async () => {
  const res = await ticketAPI.get('/concern/load')
  return res.data
}

export const useGetConcern = () => {
  return useQuery({
    queryKey: ['concern'],
    queryFn: getConcern,
  })
}