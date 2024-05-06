import { expect, expectTypeOf, it } from 'vitest'
import type { ModelRawType } from '~/index'
import { DDMV, h } from '~/index'

/**
 * module output test.
 */
it('basic ModelType Extraction', () => {
  const InputModel = DDMV({
    mail: h.string(),
    password: h.string(),
  })

  type modelType = ModelRawType<typeof InputModel>

  const exceptedRawModel: modelType = {
    mail: 'mail',
    password: 'password',
  }

  expectTypeOf(exceptedRawModel).toMatchTypeOf<modelType>()
})

/**
 * Simple Model Validation test.
 */
it('basic Validation', () => {
  const InputModel = DDMV({
    mail: h.string({
      maxLength: 4,
    }),
    password: h.string({
      label: 'パスワード',
      maxLength: 4,
    }),
    nest: DDMV({
      test: h.string({
        maxLength: 8,
        label: 'ネスト項目',
      }),
    }),
  })

  const res = InputModel.validate({
    mail: 'mail',
    password: 'passw',
    nest: {
      test: 'abcdefgh9',
    },
  })

  expect(res.valid).toBeFalsy()
  expect(res.errors).length(2)
  expect(res.errors[0].prop).eq('password')
  expect(res.errors[0].label).eq('パスワード')
  expect(res.errors[1].prop).eq('nest.test')
  expect(res.errors[1].label).eq('ネスト項目')
})
