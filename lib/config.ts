import db from "./db";

class Config {
    values: Map<string, string>
    lastRefresh: Date

    async get(key: string): Promise<string|false> {
        await this.refresh()
        if (this.values.has(key)) {
            return this.values.get(key)
        }
        return false
    }

    async refresh(): Promise<void> {
        if(this.values == null) {
            this.values = new Map()
        }

        if(this.lastRefresh == null || Date.now() - this.lastRefresh.getTime() > 30 * 1000) {
            this.lastRefresh = new Date()
            const rows = await db("config").select("*")
            return rows.map(row => this.values.set(row.name, row.value))
        }
    }
}

const config = new Config()
export default config