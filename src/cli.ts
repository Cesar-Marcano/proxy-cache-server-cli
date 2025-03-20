import { Command } from 'commander'
import { getOptions } from './utils/getOptions'

const program = new Command()

program.option('-r, --redisUrl <url>', 'Redis URL', 'redis://localhost:6379')
program.option('-p, --port <port>', 'Port', '3000')
program.option('-o, --origin <origin url>', 'Origin url to forward requests')
program.option('--clear-cache', 'Clears cache')
program.option('-t, --ttl <time in seconds>', 'Time to live for cache', '3600')

program.parse(process.argv)

export const options = getOptions(program.opts())
