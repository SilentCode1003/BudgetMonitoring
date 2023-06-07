import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getConcern = async () => {
  const res = await axios.get('/concern/load')
  return res.data
}

export const useGetConcern = () => {
  return useQuery({
    queryKey: ['concern'],
    queryFn: getConcern,
  })
}