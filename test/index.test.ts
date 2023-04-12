import {
  simple1,
  simple2
} from './fixtures/markdown'

import { replace } from '../src'

describe('core', () => {
  test('basic 1', async () => {
    const {
      before,
      after
    } = await simple1()

    const result = replace(
      before,
      {
        content: 'new content'
      }
    )

    expect(result.content).toBe(after)
    expect(result.numReplaced).toBe(1)
  })

  test('basic 2', async () => {
    const {
      before,
      after
    } = await simple2()

    const result = replace(
      before,
      {
        Content: 'new content'
      }
    )

    expect(result.content).toBe(after)
    expect(result.numReplaced).toBe(1)
  })
})
