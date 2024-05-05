import { expectTypeOf, it } from 'vitest'
import { h, Model, ModelRawType } from '~/index'


/**
 * module output test.
 */
it('Basic ModelType Extraction', () => {
    
    const InputModel = Model.create({
        mail: h.string(),
        password: h.string()    
    })

    type modelType = ModelRawType<typeof InputModel>

    const exceptedRawModel = {
        mail: 'mail',
        password: 'password'
    }

    expectTypeOf(exceptedRawModel).toMatchTypeOf<modelType>()

})
