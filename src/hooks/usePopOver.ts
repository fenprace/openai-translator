import { createPopper, Instance, VirtualElement } from '@popperjs/core'
import { useRef, useState } from 'react'

export const usePopOver = () => {
  const instanceRef = useRef<Instance | null>(null)
  const popOverRef = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  const hide = () => {
    if (!instanceRef.current) return

    setShown(false)
    instanceRef.current.destroy()
  }

  const show = (
    reference: VirtualElement | Element,
    getPopOver: () => HTMLElement | null,
  ) => {
    if (instanceRef.current) instanceRef.current.destroy()

    if (!popOverRef.current) popOverRef.current = getPopOver()
    if (!popOverRef.current) return

    setShown(true)
    instanceRef.current = createPopper(reference, popOverRef.current, {
      placement: 'bottom-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    })
  }

  return {
    hide,
    show,
    shown,
  }
}
