import { request } from '@/utils/request'

export const getNumber = (data) => request('api/v2/public/nft-review/getNumberOfPeople', 'get',data,false)
export const addPeople = (data) => request('api/v2/public/nft-review/list','post',data,false)
export const getdiamondHanded = (data) => request('may/diamondHanded','get',data,true)
export const getgainsss = (data) => request('may/gainsss','get',data,true)
export const getpaperhands = (data) => request('may/paperhands','get',data,true)
// export const getKnowledge = (data: KnowledgeParams) =>
//   request<KnowledgesRes>('/patient/home/knowledge', 'GET', data)