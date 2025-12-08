export interface FullResponse<T, U extends number> {
  'statusCode': U;
  'headers': object;
  'body': T;
}

export type GetRuntimesPidMetricsRequest = {
  path: {
    'pid': number;
  }
}

/**
 * Default Response
 */
export type GetRuntimesPidMetricsResponseOK = { 'dataMem': Array<{ 'date': string; 'rss': number; 'totalHeap': number; 'usedHeap': number; 'newSpace': number; 'oldSpace': number }>; 'dataCpu': Array<{ 'date': string; 'cpu': number; 'eventLoop': number }>; 'dataLatency': Array<{ 'date': string; 'p90': number; 'p95': number; 'p99': number }>; 'dataReq': Array<{ 'date': string; 'count': number; 'rps': number }>; 'dataKafka': Array<{ 'date': string; 'producers': number; 'producedMessages': number; 'consumers': number; 'consumersStreams': number; 'consumersTopics': number; 'consumedMessages': number; 'hooksMessagesInFlight': number; 'hooksDlqMessagesTotal': number }>; 'dataUndici': Array<{ 'date': string; 'idleSockets': number; 'openSockets': number; 'pendingRequests': number; 'queuedRequests': number; 'activeRequests': number; 'sizeRequests': number }>; 'dataWebsocket': Array<{ 'date': string; 'connections': number }>; 'dataNodejs': Array<{ 'date': string; 'resources': number }> }
export type GetRuntimesPidMetricsResponses =
  FullResponse<GetRuntimesPidMetricsResponseOK, 200>

export type GetRuntimesPidMetricsServiceIdRequest = {
  path: {
    'pid': number;
    'serviceId': string;
  }
}

/**
 * Default Response
 */
export type GetRuntimesPidMetricsServiceIdResponseOK = { 'dataMem': Array<{ 'date': string; 'rss': number; 'totalHeap': number; 'usedHeap': number; 'newSpace': number; 'oldSpace': number }>; 'dataCpu': Array<{ 'date': string; 'cpu': number; 'eventLoop': number }>; 'dataLatency': Array<{ 'date': string; 'p90': number; 'p95': number; 'p99': number }>; 'dataReq': Array<{ 'date': string; 'count': number; 'rps': number }>; 'dataKafka': Array<{ 'date': string; 'producers': number; 'producedMessages': number; 'consumers': number; 'consumersStreams': number; 'consumersTopics': number; 'consumedMessages': number; 'hooksMessagesInFlight': number; 'hooksDlqMessagesTotal': number }>; 'dataUndici': Array<{ 'date': string; 'idleSockets': number; 'openSockets': number; 'pendingRequests': number; 'queuedRequests': number; 'activeRequests': number; 'sizeRequests': number }>; 'dataWebsocket': Array<{ 'date': string; 'connections': number }>; 'dataNodejs': Array<{ 'date': string; 'resources': number }> }
export type GetRuntimesPidMetricsServiceIdResponses =
  FullResponse<GetRuntimesPidMetricsServiceIdResponseOK, 200>

export type GetRuntimesPidMetricsServiceIdWorkerIdRequest = {
  path: {
    'pid': number;
    'serviceId': string;
    'workerId': number;
  }
}

/**
 * Default Response
 */
export type GetRuntimesPidMetricsServiceIdWorkerIdResponseOK = { 'dataMem': Array<{ 'date': string; 'rss': number; 'totalHeap': number; 'usedHeap': number; 'newSpace': number; 'oldSpace': number }>; 'dataCpu': Array<{ 'date': string; 'cpu': number; 'eventLoop': number }>; 'dataLatency': Array<{ 'date': string; 'p90': number; 'p95': number; 'p99': number }>; 'dataReq': Array<{ 'date': string; 'count': number; 'rps': number }>; 'dataKafka': Array<{ 'date': string; 'producers': number; 'producedMessages': number; 'consumers': number; 'consumersStreams': number; 'consumersTopics': number; 'consumedMessages': number; 'hooksMessagesInFlight': number; 'hooksDlqMessagesTotal': number }>; 'dataUndici': Array<{ 'date': string; 'idleSockets': number; 'openSockets': number; 'pendingRequests': number; 'queuedRequests': number; 'activeRequests': number; 'sizeRequests': number }>; 'dataWebsocket': Array<{ 'date': string; 'connections': number }>; 'dataNodejs': Array<{ 'date': string; 'resources': number }> }
export type GetRuntimesPidMetricsServiceIdWorkerIdResponses =
  FullResponse<GetRuntimesPidMetricsServiceIdWorkerIdResponseOK, 200>

export type GetRuntimesRequest = {
  query?: {
    'includeAdmin'?: boolean;
  }
}

/**
 * Default Response
 */
export type GetRuntimesResponseOK = Array<{ 'pid': number; 'cwd': string; 'argv': Array<string>; 'uptimeSeconds': number; 'execPath': string; 'nodeVersion': string; 'projectDir': string; 'packageName': string; 'packageVersion': string; 'url': string; 'platformaticVersion': string; 'selected': boolean }>
export type GetRuntimesResponses =
  FullResponse<GetRuntimesResponseOK, 200>

export type GetRuntimesPidHealthRequest = {
  path: {
    'pid': number;
  }
}

/**
 * Default Response
 */
export type GetRuntimesPidHealthResponseOK = { 'status': 'OK' | 'KO' }
export type GetRuntimesPidHealthResponses =
  FullResponse<GetRuntimesPidHealthResponseOK, 200>

export type GetRuntimesPidServicesRequest = {
  path: {
    'pid': number;
  }
}

/**
 * Default Response
 */
export type GetRuntimesPidServicesResponseOK = { 'entrypoint': string; 'production': boolean; 'applications': Array<{ 'id': string; 'type': string; 'status': string; 'version': string; 'localUrl': string; 'entrypoint': boolean; 'workers'?: number; 'url'?: string; 'dependencies': Array<string>; [key: string]: unknown } | { 'id': string; 'status': string }> }
export type GetRuntimesPidServicesResponses =
  FullResponse<GetRuntimesPidServicesResponseOK, 200>

export type GetRuntimesPidOpenapiServiceIdRequest = {
  path: {
    'pid': number;
    'serviceId': string;
  }
}

export type GetRuntimesPidOpenapiServiceIdResponseOK = unknown
export type GetRuntimesPidOpenapiServiceIdResponses =
  FullResponse<GetRuntimesPidOpenapiServiceIdResponseOK, 200>

export type PostRuntimesPidRestartRequest = {
  path: {
    'pid': number;
  }
  body: {
  }
}

export type PostRuntimesPidRestartResponseOK = unknown
export type PostRuntimesPidRestartResponses =
  FullResponse<PostRuntimesPidRestartResponseOK, 200>

export type PostRecordPidRequest = {
  path: {
    'pid': number;
  }
  body: {
    'mode': 'start' | 'stop';
    'profile': 'cpu' | 'heap';
    /**
     * Directory or file path for the output HTML. Defaults to cwd with auto-generated filename.
     */
    'outputPath'?: string;
  }
}

/**
 * Default Response
 */
export type PostRecordPidResponseOK = { 'path'?: string }
export type PostRecordPidResponses =
  FullResponse<PostRecordPidResponseOK, 200>



export interface Backend {
  setBaseUrl(newUrl: string): void;
  setDefaultHeaders(headers: object): void;
  setDefaultFetchParams(fetchParams: RequestInit): void;
  /**
   * @param req - request parameters object
   * @returns the API response
   */
  getRuntimesPidMetrics(req: GetRuntimesPidMetricsRequest): Promise<GetRuntimesPidMetricsResponses>;
  /**
   * @param req - request parameters object
   * @returns the API response
   */
  getRuntimesPidMetricsServiceId(req: GetRuntimesPidMetricsServiceIdRequest): Promise<GetRuntimesPidMetricsServiceIdResponses>;
  /**
   * @param req - request parameters object
   * @returns the API response
   */
  getRuntimesPidMetricsServiceIdWorkerId(req: GetRuntimesPidMetricsServiceIdWorkerIdRequest): Promise<GetRuntimesPidMetricsServiceIdWorkerIdResponses>;
  /**
   * @param req - request parameters object
   * @returns the API response
   */
  getRuntimes(req: GetRuntimesRequest): Promise<GetRuntimesResponses>;
  /**
   * @param req - request parameters object
   * @returns the API response
   */
  getRuntimesPidHealth(req: GetRuntimesPidHealthRequest): Promise<GetRuntimesPidHealthResponses>;
  /**
   * @param req - request parameters object
   * @returns the API response
   */
  getRuntimesPidServices(req: GetRuntimesPidServicesRequest): Promise<GetRuntimesPidServicesResponses>;
  /**
   * @param req - request parameters object
   * @returns the API response
   */
  getRuntimesPidOpenapiServiceId(req: GetRuntimesPidOpenapiServiceIdRequest): Promise<GetRuntimesPidOpenapiServiceIdResponses>;
  /**
   * @param req - request parameters object
   * @returns the API response
   */
  postRuntimesPidRestart(req: PostRuntimesPidRestartRequest): Promise<PostRuntimesPidRestartResponses>;
  /**
   * @param req - request parameters object
   * @returns the API response
   */
  postRecordPid(req: PostRecordPidRequest): Promise<PostRecordPidResponses>;
}
type PlatformaticFrontendClient = Omit<Backend, 'setBaseUrl'>
type BuildOptions = {
  headers?: object
}
export default function build(url: string, options?: BuildOptions): PlatformaticFrontendClient
