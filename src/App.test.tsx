import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import App from '@/App'

describe('accessible app navigation', () => {
  test('provides a skip link, home navigation, and a named main landmark', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute(
      'href',
      '#main-content',
    )
    expect(screen.getByRole('link', { name: /back to aralmate home/i })).toHaveAttribute(
      'href',
      '/',
    )
    expect(screen.getByRole('main', { name: /add a school message/i })).toHaveAttribute(
      'id',
      'main-content',
    )
  })

  test('moves focus and offers clear navigation when switching between input and dashboard', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /try demo/i }))

    const dashboardMain = screen.getByRole('main', { name: /task dashboard/i })
    expect(dashboardMain).toHaveFocus()
    expect(screen.getByRole('button', { name: /add another message/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /add another message/i }))

    const inputMain = screen.getByRole('main', { name: /add a school message/i })
    expect(inputMain).toHaveFocus()
    expect(screen.getByRole('button', { name: /back to task dashboard/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /back to task dashboard/i }))
    expect(screen.getByRole('main', { name: /task dashboard/i })).toHaveFocus()
  })
})
