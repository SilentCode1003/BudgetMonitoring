import { useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetAPI } from '../axios'

export const postLogin = async (loginData) => {
  const res = await budgetAPI.post('/login/employeelogin', loginData)
  return res.data
}

export const usePostLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (loginData) => postLogin(loginData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['request'] }),
  })
}