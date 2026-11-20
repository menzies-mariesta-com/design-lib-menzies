import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'

declare global {
  // eslint-disable-next-line no-var
  var __UI_SDK_STRICT__: boolean | undefined
}

globalThis.__UI_SDK_STRICT__ = true

HTMLElement.prototype.showPopover = function showPopover() {}
HTMLElement.prototype.hidePopover = function hidePopover() {}
Element.prototype.getAnimations = () => []
Element.prototype.scrollIntoView = function scrollIntoView() {}
Element.prototype.checkVisibility = () => true
Element.prototype.getClientRects = () => [] as unknown as DOMRectList
document.elementFromPoint = () => null
document.elementsFromPoint = () => []
window.matchMedia =
  window.matchMedia ??
  ((query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {
        return false
      },
    }) as MediaQueryList)

globalThis.ResizeObserver ??= class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

document.head.append(
  Object.assign(document.createElement('style'), {
    textContent: '[popover] { display: block !important }',
  }),
)

afterEach(cleanup)
