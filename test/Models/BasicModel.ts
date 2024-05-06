import { Model, h } from '~/index'

export const BasicModel = Model({
    /**
     * 文字.
     */
    text: h.string({
        label: '文字',
        string: {
            maxLength: 4,
        },
    }),
    /**
     * パスワード.
     */
    numeric: h.number({
        label: '数字',
        number: {
            maxRange: 4,
        },
    }),
    /**
     * 配列要素(文字).
     */
    list: h.arrayString({
        array: {
            maxLength: 3,
        },
        string: {
            maxLength: 3,
        },
    }),
    /**
     * ネスト要素.
     */
    nest: Model({
        test: h.string({
            label: 'ネスト項目',
            string: {
                maxLength: 8,
            },
        }),
    }),
})
