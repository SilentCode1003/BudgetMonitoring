import { useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const postLocationLists = async (locationLists) => {
  console.log('Payload:', locationLists)
  const res = await budgetAPI.post('/requestbudget/getrequestdetail', locationLists)
  return res.data
}

export const usePostLocationLists = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (locationLists) => postLocationLists(locationLists),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['locationLists'] }),
  })
}