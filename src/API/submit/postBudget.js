import { useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const postRequestBudget = async (requestBudget) => {
  const res = await budgetAPI.post('/requestbudget/gettotalrequest', requestBudget)
  console.log(res.data.msg);
  return res.data
}

export const usePostBudget = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestBudget) => postRequestBudget(requestBudget),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['request'] }),
  })
}