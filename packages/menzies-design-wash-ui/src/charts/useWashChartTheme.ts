import { useEffect, useState } from 'react'
import { THEME_CHANGE_EVENT } from '../theme'
import { useWashOptional } from '../WashProvider'

/**
 * Returns a revision token that changes when Wash pigment/mode or data-theme updates.
 * Use as a dependency when memoizing chart options.
 */
export function useWashChartTheme(): string {
  const wash = useWashOptional()
  const [revision, setRevision] = useState(0)

  useEffect(() => {
    function bump() {
      setRevision((value) => value + 1)
    }

    window.addEventListener(THEME_CHANGE_EVENT, bump)

    const observer = new MutationObserver(bump)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, bump)
      observer.disconnect()
    }
  }, [])

  const pigment = wash?.pigment ?? 'auto'
  const mode = wash?.mode ?? 'auto'
  const dataTheme =
    typeof document !== 'undefined'
      ? (document.documentElement.getAttribute('data-theme') ?? 'none')
      : 'none'

  return `${revision}:${pigment}:${mode}:${dataTheme}`
}
