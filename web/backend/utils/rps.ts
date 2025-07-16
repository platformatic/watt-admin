import { RequestDataPoint } from '../schemas'

export const getReqRps = (count: number, req: RequestDataPoint[]) => Math.abs(count - (req[req.length - 1]?.count || 0))
