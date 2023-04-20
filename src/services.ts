import { chat, completions } from './openai'

export const translateComp = async (source: string) => {
  const response = await completions(
    `translate following text into Chinese: \n${source}`,
  )

  const { choices } = response
  const translated = choices[0].text
  return translated
}

export const translateChat = async (source: string, dst: string) => {
  const response = await chat([
    {
      role: 'system',
      content: `Translate words into ${dst}, no other words.`,
    },
    {
      role: 'user',
      content: source,
    },
  ])

  const { choices } = response
  const translated = choices[0].message?.content
  return translated
}
