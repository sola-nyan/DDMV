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
