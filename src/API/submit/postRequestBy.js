import { useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const postRequestData = async (requestData) => {
  const res = await budgetAPI.post('/requestbudget/getrequest', requestData)
  return res.data
}

export const usePostRequest = () => {
  const queryClient = useQueryClient()

  return useMutation(postRequestData, {
    onSuccess: () => {
      queryClient.invalidateQueries('request')
    },
  })
}
