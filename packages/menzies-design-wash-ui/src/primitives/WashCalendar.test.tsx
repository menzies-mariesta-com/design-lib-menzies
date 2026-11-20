import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { WashCalendar } from './WashCalendar'

describe('WashCalendar', () => {
  it('renders month grid and reports view change via Today', async () => {
    const user = userEvent.setup()
    const onViewDateChange = vi.fn()

    render(
      <WashCalendar
        defaultViewDate="2026-06-15"
        onViewDateChange={onViewDateChange}
        aria-label="Test calendar"
      />,
    )

    expect(screen.getByRole('application', { name: 'Test calendar' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Today' }))

    expect(onViewDateChange).toHaveBeenCalled()
    const last = onViewDateChange.mock.calls.at(-1)?.[0] as string
    expect(last).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})