import { useMutation } from 'react-query'
import { API_ADVERTISEMENT_UPDATE } from '../config/endpointapi'
import { putAxios } from '../Http'

const updateAdvertisement = async (params) => {
  return await putAxios(API_ADVERTISEMENT_UPDATE, params)
}

const useAdvertisementUpdate = () => {
  return useMutation(updateAdvertisement)
}

export default useAdvertisementUpdate
