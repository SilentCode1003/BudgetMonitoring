import { useMutation } from '@tanstack/react-query'
import { axios } from '../axios'
import pako from 'pako'

export const postTicket = async (newTicket) => {
  const compressedData = pako.gzip(JSON.stringify(newTicket))
  const res = await axios.post('/assignticket/save', compressedData, {
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json',
    },
  })
  return res.data
}

export const usePostTicket = () => {
  return useMutation({
    mutationKey: ['ticket'],
    mutationFn: (newTicket) => postTicket(newTicket),
  })
}