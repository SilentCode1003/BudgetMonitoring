import { useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const postRequestBalance = async (requestBalance) => {
  const res = await budgetAPI.post('/budget/getbalance', requestBalance)
  return res.data
}

export const usePostBalance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestBalance) => postRequestBalance(requestBalance),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['request'] }),
  })
}