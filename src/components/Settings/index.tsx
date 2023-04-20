import { produce } from 'immer'
import { useCallback, useEffect, useState } from 'react'
import { globals, updateOptions, useGlobals } from '../../hooks/useGlobals'
import classes from './styles.module.css'

export const Settings = () => {
  const show = useGlobals((state) => state.showOptions)
  const options = useGlobals((state) => state.options)

  const [apiKey, setApiKey] = useState(options.apiKey)
  const [dstLang, setDstLang] = useState(options.defaultDstLang)

  const onChangeApiKey: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setApiKey(e.target.value)
    }, [])

  const onChangeDstLang: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setDstLang(e.target.value)
    }, [])

  const onSave = useCallback(() => {
    if (apiKey) updateOptions({ apiKey })
    if (dstLang) updateOptions({ defaultDstLang: dstLang })
    if (apiKey && dstLang) globals.mergeState({ showOptions: false })
  }, [apiKey, dstLang])

  if (!show) return null
  return (
    <div className={classes.backdrop}>
      <div className={classes.card}>
        <p className={classes.text}>
          Is this the first time you using this translator? Please take a few
          steps to setup:
        </p>

        <div className={classes.spacer} />

        <p className={classes.text}>
          First, an OpenAI API key is required to enable the translator.
        </p>

        <input
          className={classes.input}
          value={apiKey}
          placeholder="sk-************************************"
          required
          onChange={onChangeApiKey}
        />

        <div className={classes.spacer} />

        <p className={classes.text}>
          Second, which language you want translate into by default?
          <br />
          You can write it down below in natural language, such 'American
          English', 'Cantonese', '简体中文' or '関西弁'.
        </p>

        <input
          className={classes.input}
          value={dstLang}
          placeholder="Simplified Chinese"
          required
          onChange={onChangeDstLang}
        />

        <div className={classes.spacer} />

        <p className={classes.text}>
          That's all. Click 'Done' below then you are all set!
        </p>

        <button className={classes.button} onClick={onSave}>
          Done
        </button>
      </div>
    </div>
  )
}
