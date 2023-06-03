import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getAssignTicketDetails = async () => {
  const res = await axios.get('/assignticket/getassignticketdetail')
  return res.data
}

export const useGetAssignTicketDetails = () => {
  return useQuery({
    queryKey: ['assignticketdetails'],
    queryFn: getAssignTicketDetails,
  })
}