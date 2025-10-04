import { LocationQuery, RouteLocation, RouteMeta, RouteParams, RouteRecord, RouteRecordName } from 'vue-router'

export default function mockRouteLocation(params?: MockRouteLocationParams) : RouteLocation {
  return {
    name: params?.name,
    path: params?.path ?? '',
    params: params?.params ?? {},
    meta: params?.meta ?? {},
    matched: params?.matched ?? [],
    fullPath: params?.fullPath ?? '',
    query: params?.query ?? {},
    hash: params?.hash ?? '',
    redirectedFrom: params?.redirectedFrom
  }
}
 
export interface MockRouteLocationParams {
  name?: RouteRecordName|null
  path?: string
  params?: RouteParams
  meta?: RouteMeta
  matched?: RouteRecord[]
  fullPath?: string
  query?: LocationQuery
  hash?: string
  redirectedFrom?: RouteLocation
}
