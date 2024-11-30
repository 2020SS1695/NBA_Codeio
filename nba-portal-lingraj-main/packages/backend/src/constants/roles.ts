import { createReverseMap } from "#src/services/utilities.service.js"

const RoleToCode = {
    admin: 4326,
    college: 5897,
    evaluator: 1242,
}

type Roles = keyof typeof RoleToCode

const CodeToRole = createReverseMap(RoleToCode)

export { RoleToCode, CodeToRole }
export type { Roles }