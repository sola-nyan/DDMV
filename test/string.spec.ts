import { describe, expect, it } from 'vitest'
import { DDMV, h } from '~/index'

describe('文字型', () => {
  it('必須チェック', () => {
    const Model = DDMV({
      text: h.string({
        string: { required: true },
      }),
    })

    const p1 = Model.validate({ text: 'ok' })
    const p2 = Model.validate({ text: '' })
    const p3 = Model.validate({ text: undefined })

    expect(p1.valid).toBeTruthy()
    expect(p2.valid).toBeFalsy()
    expect(p3.valid).toBeFalsy()
  })

  it('最大', () => {
    const Model = DDMV({
      text: h.string({
        string: { maxLength: 3 },
      }),
    })

    const p1 = Model.validate({ text: 'ok.' })
    const p2 = Model.validate({ text: 'ng..' })
    const p3 = Model.validate({ text: undefined })

    expect(p1.valid).toBeTruthy()
    expect(p2.errors[0].patternId).toEqual('string.maxLength')
    expect(p3.valid).toBeTruthy()
  })

  it('最小', () => {
    const Model = DDMV({
      text: h.string({
        string: { minLength: 3 },
      }),
    })

    const p1 = Model.validate({ text: 'ng' })
    const p2 = Model.validate({ text: 'ok.' })
    const p3 = Model.validate({ text: undefined })

    expect(p1.errors[0].patternId).toEqual('string.minLength')
    expect(p2.valid).toBeTruthy()
    expect(p3.valid).toBeTruthy()
  })
})
