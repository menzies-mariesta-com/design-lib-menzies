import {
  createContext,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'

type TabsCtx = {
  value: string
  setValue: (v: string) => void
  baseId: string
}

const TabsContext = createContext<TabsCtx | null>(null)

export type TabsProps = {
  defaultValue: string
  children: ReactNode
  className?: string
  boxed?: boolean
}

export function Tabs({ defaultValue, children, className, boxed }: TabsProps) {
  const [value, setValue] = useState(defaultValue)
  const baseId = useId()
  return (
    <TabsContext.Provider value={{ value, setValue, baseId }}>
      <div
        className={[boxed && 'tabs-box', 'tabs', className]
          .filter(Boolean)
          .join(' ')}
        role="tablist"
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export type TabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string
  children: ReactNode
  panel?: ReactNode
}

export function Tab({ value, children, panel, className, ...rest }: TabProps) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tab must be used within Tabs')
  const selected = ctx.value === value
  const tabId = `${ctx.baseId}-tab-${value}`
  const panelId = `${ctx.baseId}-panel-${value}`
  return (
    <>
      <button
        type="button"
        role="tab"
        id={tabId}
        aria-selected={selected}
        aria-controls={panelId}
        tabIndex={selected ? 0 : -1}
        className={['tab cursor-pointer', selected && 'tab-active', className]
          .filter(Boolean)
          .join(' ')}
        onClick={() => ctx.setValue(value)}
        {...rest}
      >
        {children}
      </button>
      {panel ? (
        <div
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId}
          hidden={!selected}
          className="w-full p-4"
        >
          {panel}
        </div>
      ) : null}
    </>
  )
}
