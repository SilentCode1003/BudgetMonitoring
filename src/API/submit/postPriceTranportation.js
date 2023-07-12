import { useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const postTransportationPrice = async (requestTranportationPrice) => {
  const res = await budgetAPI.post('/routeprice/getrouteprice', requestTranportationPrice)
  return res.data
}

export const usePostTranportationPrice = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestTranportationPrice) => postTransportationPrice(requestTranportationPrice),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['transportationPrice'] }),
  })
}