import { useQuery } from '@tanstack/react-query'
import { ticketAPI } from '../axios'

export const getIssue = async () => {
  const res = await ticketAPI.get('/issue/load')
  return res.data
}

export const useGetIssue = () => {
  return useQuery({
    queryKey: ['issue'],
    queryFn: getIssue,
  })
}