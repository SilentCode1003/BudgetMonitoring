
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const postOrigin = async (originPayload) => {
  const res = await budgetAPI.post('/route/getorigin', originPayload)
  console.log('Payload:', originPayload)
  return res.data
}

export const usePostOrigin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (originPayload) => postOrigin(originPayload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['origin'] }),
  })
}
