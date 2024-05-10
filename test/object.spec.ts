import { expect, expectTypeOf, it } from 'vitest'
import { BasicModel } from './Models/BasicModel'
import type { InferInType } from '~/index'

/**
 * module output test.
 */
it('type inference', () => {
  type modelType = InferInType<typeof BasicModel>
  const expectEmptyModel = {
    text: '',
    numeric: '0',
    list: [''],
    nest: {
      test: '',
    },
  }
  expectTypeOf(expectEmptyModel).toMatchTypeOf<modelType>()
})

/**
 * Simple Model Validation test.
 */
it('basic Validation', () => {
  const res = BasicModel.validate({
    text: 'mail',
    numeric: '3',
    list: ['aa', 'bba'],
    nest: {
      test: 'abcdefgh9',
    },
  })

  expect(res.valid).toBeFalsy()
  expect(res.errors).length(1)
  expect(res.errors[0].prop).eq('nest.test')
  expect(res.errors[0].label).eq('ネスト項目')
})
