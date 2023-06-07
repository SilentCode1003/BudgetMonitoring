import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getClientName = async () => {
  const res = await axios.get('/client/load')
  return res.data
}

export const userGetClientName = () => {
  return useQuery({
    queryKey: ['client'],
    queryFn: getClientName,
  })
}