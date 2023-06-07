import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getIssue = async () => {
  const res = await axios.get('/issue/load')
  return res.data
}

export const useGetIssue = () => {
  return useQuery({
    queryKey: ['issue'],
    queryFn: getIssue,
  })
}