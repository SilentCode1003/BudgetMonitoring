import { useQuery } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const getRequestBudget = async () => {
  const res = await budgetAPI.get('/requestbudget/load')
  return res.data
}

export const useGetRequestBudget = () => {
  return useQuery({
    queryKey: ['request'],
    queryFn: getRequestBudget,
  })
}