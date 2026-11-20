import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Select } from './Select'

const options = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
]

describe('Select', () => {
  it('opens, selects an option, and closes on outside click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <div>
        <Select
          label="Team"
          options={options}
          placeholder="Choose team"
          onChange={onChange}
        />
        <button type="button">Outside</button>
      </div>,
    )

    const trigger = screen.getByRole('combobox', { name: 'Team' })
    await user.click(trigger)
    await user.click(screen.getByRole('button', { name: 'Beta' }))

    expect(onChange).toHaveBeenCalledWith('beta')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    await user.click(trigger)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Outside' }))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
