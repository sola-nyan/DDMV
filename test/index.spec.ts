import { expectTypeOf, it } from 'vitest'
import type { ModelRawType } from '~/index'
import { Model, h } from '~/index'

/**
 * module output test.
 */
it('basic ModelType Extraction', () => {
  const InputModel = Model.create({
    mail: h.string(),
    password: h.string(),
  })

    type modelType = ModelRawType<typeof InputModel>

    const exceptedRawModel = {
      mail: 'mail',
      password: 'password',
    }

    expectTypeOf(exceptedRawModel).toMatchTypeOf<modelType>()
})

/**
 * Simple Model Validation test.
 */
it('basic Validation', () => {
  const InputModel = Model.create({
    mail: h.string({
      maxLength: 4,
    }),
    password: h.string({
      maxLength: 4,
    }),
  })

  InputModel.validate({
    mail: 'mail',
    password: 'passw',
  })
})
