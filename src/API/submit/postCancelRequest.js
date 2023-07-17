import { useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const postCancelRequest = async (cancelRequestId) => {
  console.log('Payload:', cancelRequestId)
  const res = await budgetAPI.post('/requestbudget/cancel', cancelRequestId)
  return res.data
}

export const usePostCancelRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cancelRequestId) => postCancelRequest(cancelRequestId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['cancel'] }),
  })
}