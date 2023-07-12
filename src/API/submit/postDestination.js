import { useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const postDestination = async (origin) => {
  const res = await budgetAPI.post('/route/getdestination', origin)
  return res.data
}

export const usePostDestination = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (origin) => postDestination(origin),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['request'] }),
  })
}