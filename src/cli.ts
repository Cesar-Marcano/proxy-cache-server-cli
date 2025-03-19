import { Command } from 'commander'
import { getOptions } from './getOptions'

const program = new Command()

program.option('-r, --redis <url>', 'Redis URL', 'redis://localhost:6379')
program.option('-p, --port <port>', 'Port', '3000')
program.option('-o, --origin <origin url>', 'Origin url to forward requests')

program.parse(process.argv)

export const options = getOptions(program.opts())
