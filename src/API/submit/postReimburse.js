
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const postReimburseData = async (reimburseData) => {
  const res = await budgetAPI.post('/reimbursement/save', reimburseData)
  console.log(res.data.msg);
  return res.data
}

export const usePostReimburse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reimburseData) => postReimburseData(reimburseData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['reimburse'] }),
  })
}