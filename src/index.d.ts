type ResponseBase = {
  readonly responseHeaders: string
  /**
   * Unsent = 0,
   * Opened = 1,
   * HeadersReceived = 2,
   * Loading = 3,
   * Done = 4
   */
  readonly readyState: 0 | 1 | 2 | 3 | 4
  readonly response: any
  readonly responseText: string
  readonly responseXML: Document | null
  readonly status: number
  readonly statusText: string
}

type TResponse<TContext> = ResponseBase & {
  readonly finalUrl: string
  readonly context: TContext
}

interface IRequestProps {
  data?: object
  method?: 'GET' | 'HEAD' | 'POST'
  url: string
}
