import { useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const postRequestData = async (requestData) => {
  const res = await budgetAPI.post('/requestbudget/save', requestData)
  console.log(res.data.msg);
  return res.data
}

export const usePostRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestData) => postRequestData(requestData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['request'] }),
  })
}