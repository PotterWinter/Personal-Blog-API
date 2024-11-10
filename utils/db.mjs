import * as pg from "pg"
const { Pool } = pg.default

const connectionPool = new Pool({
connectionString:
"postgresql://postgres:kunana1352@localhost:5432/Personal Blog Project"
})

export default connectionPool