import { useSyncExternalStore } from 'react'
import { THEME_CHANGE_EVENT } from '@menzies-mariesta-com/menzies-design-wash-ui/theme'
import type { ShowcaseCodeTheme } from './showcase-highlighter'

function readTheme(): ShowcaseCodeTheme {
  if (typeof document === 'undefined') return 'github-light'
  const attr = document.documentElement.getAttribute('data-theme') ?? ''
  return attr.endsWith('-dark') ? 'github-dark' : 'github-light'
}

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange)
  return () => {
    observer.disconnect()
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange)
  }
}

export function useShowcaseCodeTheme(): ShowcaseCodeTheme {
  return useSyncExternalStore(subscribe, readTheme, (): ShowcaseCodeTheme => 'github-light')
}
