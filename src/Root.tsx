import { unsafeWindow } from '$'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Badge } from './components/Badge'
import { Panel } from './components/Panel'
import { Settings } from './components/Settings'
import { Spinner } from './components/Spinner'
import { useGlobals } from './hooks/useGlobals'
import { usePopOver } from './hooks/usePopOver'
import { translateChat } from './services'

export const Root = () => {
  const [selected, setSelected] = useState('')
  const [translated, setTranslated] = useState('')

  const rootRef = useRef<HTMLDivElement>(null)

  const { hide, show, shown } = usePopOver()

  const [apiStatus, setApiStatus] = useState<
    'initial' | 'pending' | 'success' | 'failure'
  >('initial')

  const { dstLang, defaultDstLang } = useGlobals((state) => state.options)

  const onClickBadge = useCallback(() => {
    setApiStatus('pending')

    translateChat(selected, dstLang || defaultDstLang)
      .then((t) => {
        setTranslated(t || '')
        setApiStatus('success')
      })
      .catch(() => setApiStatus('failure'))
  }, [selected, defaultDstLang, dstLang])

  useEffect(() => {
    const callback = (event: MouseEvent) => {
      const selection = unsafeWindow.getSelection()
      const newSelected = selection?.toString() || ''

      const hasSelection = newSelected.length !== 0
      const isClickedInside =
        rootRef.current && rootRef.current.contains(event.target as HTMLElement)

      if (isClickedInside) {
        //
      } else {
        if (!hasSelection) {
          hide()
        } else if (newSelected !== selected) {
          setSelected(newSelected)
          setTranslated('')
          setApiStatus('initial')

          const range = selection?.getRangeAt(0)
          if (range)
            show(range, () => unsafeWindow.document.getElementById('__popover'))
        }
      }
    }

    unsafeWindow.document.addEventListener('mouseup', callback)
    return () => unsafeWindow.document.removeEventListener('mouseup', callback)
  }, [])

  return (
    <div style={{ width: '100vw' }}>
      <div id="__popover" ref={rootRef}>
        <Badge
          shown={shown && apiStatus === 'initial'}
          onClick={onClickBadge}
        />
        <Panel shown={shown && translated !== ''} selected={translated} />
        {apiStatus === 'pending' && <Spinner />}
      </div>

      <Settings />
    </div>
  )
}
