import { describe, expect, it } from 'vitest'
import { DDMV, h } from '~/index'

describe('数字型', () => {
  it('型チェック', () => {
    const Model = DDMV({
      p1: h.number(),
      p2: h.number(),
      p3: h.number(),
      p4: h.number(),
      p5: h.number(),
      p6: h.number(),
      p7: h.number(),
      p8: h.number(),
      p9: h.number(),
      p10: h.number(),
    })

    const p1 = Model.validate({
      p1: undefined,
      p2: '',
      p3: 0,
      p4: '0',
      p5: -1,
      p6: -1.0,
      p7: '-1.0',
      p8: 1,
      p9: 1.0,
      p10: '1.0',
    })

    expect(p1.mapped).toEqual({
      p1: undefined,
      p2: undefined,
      p3: 0,
      p4: 0,
      p5: -1,
      p6: -1,
      p7: -1,
      p8: 1,
      p9: 1,
      p10: 1,
    })
  })

  it('必須チェック', () => {
    const Model = DDMV({
      num: h.number({ number: { required: true } }),
    })

    const p1 = Model.validate({ num: undefined })
    const p2 = Model.validate({ num: '' })
    const p3 = Model.validate({ num: -1 })
    const p4 = Model.validate({ num: '-1' })

    expect(p1.errors[0].patternId).toEqual('number.required')
    expect(p2.errors[0].patternId).toEqual('number.required')
    expect(p3.valid).toBeTruthy()
    expect(p4.valid).toBeTruthy()
  })

  it('最大', () => {

  })

  it('最小', () => {

  })
})
