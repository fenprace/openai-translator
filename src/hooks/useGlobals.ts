import { GM_getValue, GM_setValue } from '$'
import { produce } from 'immer'
import { GM_KEYS } from '../const'
import { Store, useSelector } from './useStore'

interface IGlobal {
  showOptions: boolean
  options: {
    apiKey?: string
    defaultDstLang: string
    dstLang?: string
  }
}

export const globals = new Store<IGlobal>({
  showOptions: false,
  options: {
    defaultDstLang: 'Simplified Chinese',
  },
})

export const useGlobals = useSelector(globals)

export const initGlobals = () => {
  try {
    const raw = GM_getValue(GM_KEYS.OPTIONS, '')
    const options = JSON.parse(raw)

    if (options.apiKey) {
      globals.mergeState({ options })
    } else {
      globals.mergeState({ showOptions: true, options })
    }
  } catch (e) {}
}

export const updateOptions = (newOptions: Partial<IGlobal['options']>) => {
  const options = {
    ...globals.getState().options,
    ...newOptions,
  }

  GM_setValue(GM_KEYS.OPTIONS, JSON.stringify(options))
  globals.mergeState({ options })
}
