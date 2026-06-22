import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'src/pages/index.astro'), 'utf8')

describe('landing page accessibility', () => {
  test('provides skip navigation, a real home link, and a named main target', () => {
    expect(source).toContain('href="#main-content"')
    expect(source).toContain('>Skip to main content</a>')
    expect(source).toContain('href="/"')
    expect(source).toContain('<main id="main-content"')
  })

  test('keeps section navigation available on mobile', () => {
    expect(source).toContain('aria-label="Mobile section navigation"')
    expect(source).toContain('>Navigate</summary>')
  })

  test('exposes tabs, loading updates, and FAQ expansion state', () => {
    expect(source).toContain('role="tablist"')
    expect(source).toContain('aria-selected="true"')
    expect(source).toContain('role="status"')
    expect(source).toContain('aria-live="polite"')
    expect(source).toContain('aria-expanded="false"')
    expect(source).toContain("toggle.setAttribute('aria-expanded'")
  })
})
