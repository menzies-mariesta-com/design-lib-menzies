import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import { Dialog } from './Dialog'

function DialogHarness() {
  const [open, setOpen] = useState(true)
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      title="Demo dialog"
      description="Dialog body"
    >
      <p>Inner content</p>
    </Dialog>
  )
}

describe('Dialog', () => {
  it('closes on escape key', async () => {
    const user = userEvent.setup()
    render(<DialogHarness />)

    expect(screen.getByText('Demo dialog')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByText('Demo dialog')).not.toBeInTheDocument()
  })
})
