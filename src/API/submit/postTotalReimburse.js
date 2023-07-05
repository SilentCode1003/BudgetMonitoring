import { useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const postTotalReimburse = async (requestTotalReimburse) => {
  const res = await budgetAPI.post('/reimbursement/gettotalreimburse', requestTotalReimburse)
  return res.data
}

export const usePostTotalReimburse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestTotalReimburse) => postTotalReimburse(requestTotalReimburse),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['request'] }),
  })
}