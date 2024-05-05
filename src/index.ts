import { output } from "./TypeDesc";
import { TypeDescObject } from "./TypeDesc/object/TypeDescObject";
import { TypeMetaString, TypeDescString } from "./TypeDesc/string/TypeDescString";

export const h = {
    string : (meta?: TypeMetaString) => TypeDescString.create(meta)
}

export { TypeDescObject as Model }
export type { output as ModelRawType }