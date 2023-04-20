import { GM_registerMenuCommand } from '$'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Root } from './Root'
import { globals, initGlobals } from './hooks/useGlobals'
import './index.css'

initGlobals()

GM_registerMenuCommand('Options', () => {
  globals.mergeState({ showOptions: true })
})

ReactDOM.createRoot(
  (() => {
    const root = document.createElement('div')
    root.style.position = 'fixed'
    root.style.zIndex = '9999'
    document.body.append(root)
    return root
  })(),
).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
