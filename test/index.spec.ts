import { expect, it } from 'vitest'
import module from '~/index'

/**
 * module output test.
 */
it('module output', () => {
  expect(module).toBe('mylib')
})
