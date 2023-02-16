import { request } from '@/utils/request'

export const getNumber = (data) => request('api/v2/public/nft-review/getNumberOfPeople', 'get',data,false)
export const addPeople = (data) => request('api/v2/public/nft-review/list','post',data,false)
export const updateStatisticData = (data) => request('api/v2/public/nft-review/updateStatisticData','post',data,false)
export const getdiamondHanded = (data) => request('may/diamondHanded','get',data,true)
export const getgainsss = (data) => request('may/gainsss','get',data,true)
export const getpaperhands = (data) => request('may/paperhands','get',data,true)
export const getPersonalOverview = (data) => request('may/getPersonalOverview','get',data,true)
export const getPersonalDetails = (data) => request('may/getPersonalDetails','get',data,true)
export const getLongestHoldingPeriodNft = (data) => request('may/getLongestHoldingPeriodNft','get',data,true)
export const getShortestHoldingPeriodNft = (data) => request('may/getShortestHoldingPeriodNft','get',data,true)
export const getUserHoldBlueChipNft = (data) => request('may/getUserHoldBlueChipNft','get',data,true)
export const getUserNftPriceToZeroNft = (data) => request('may/getUserNftPriceToZeroNft','get',data,true)
export const getUserLabel = (data) => request('may/getUserLabel','get',data,true)
// export const getKnowledge = (data: KnowledgeParams) =>
//   request<KnowledgesRes>('/patient/home/knowledge', 'GET', data)