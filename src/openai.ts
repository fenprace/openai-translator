import { GM_xmlhttpRequest, GM_getValue } from '$'
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
  CreateCompletionResponse,
} from 'openai'
import { globals } from './hooks/useGlobals'

const getApiKey = () => {
  const key = globals.getState().options.apiKey
  if (!key) throw new Error('No API key provided')
  return key
}

const request = <T>({
  url,
  data,
  method,
}: IRequestProps): Promise<TResponse<T>> => {
  console.log(data)

  const apiKey = getApiKey()
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method,
      onerror: reject,
      onload: resolve,
      url,
    })
  })
}

export const completions = async (
  prompt: string,
): Promise<CreateCompletionResponse> => {
  const response = await request<CreateCompletionResponse>({
    data: {
      max_tokens: 2048,
      model: 'text-davinci-003',
      prompt,
      temperature: 0,
    },
    method: 'POST',
    url: 'https://api.openai.com/v1/completions',
  })

  console.log(response)
  const { responseText } = response
  const openAiResponse = JSON.parse(responseText)
  return openAiResponse
}

export const chat = async (
  messages: ChatCompletionRequestMessage[],
): Promise<CreateChatCompletionResponse> => {
  const response = await request<CreateChatCompletionRequest>({
    data: {
      max_tokens: 2048,
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0,
    },
    method: 'POST',
    url: 'https://api.openai.com/v1/chat/completions',
  })

  console.log(response)
  const { responseText } = response
  const openAiResponse = JSON.parse(responseText)
  return openAiResponse
}
