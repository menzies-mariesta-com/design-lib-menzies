import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { createSyncGroupId } from './sync'

const SyncedChartsContext = createContext<string | null>(null)

export type SyncedChartsProps = {
  /** Shared ApexCharts group id. Generated when omitted. */
  syncGroupId?: string
  children: ReactNode
  className?: string
}

/**
 * Provider for linked Wash charts. Child `SyncedChart` components (or charts with
 * `syncGroup` from `useSyncedChartsGroup()`) share zoom, pan, and x-axis range.
 */
export function SyncedCharts({ syncGroupId, children, className }: SyncedChartsProps) {
  const groupId = useMemo(
    () => syncGroupId ?? createSyncGroupId(),
    [syncGroupId],
  )

  return (
    <SyncedChartsContext.Provider value={groupId}>
      <div className={['wash-synced-charts flex flex-col gap-3', className].filter(Boolean).join(' ')}>
        {children}
      </div>
    </SyncedChartsContext.Provider>
  )
}

/** Read the active sync group from the nearest `SyncedCharts` provider. */
export function useSyncedChartsGroup(): string | null {
  return useContext(SyncedChartsContext)
}
