import { Context, Schema, Quester, omit } from 'koishi'

interface Config extends Quester.Config { }

export const name = 'pointfree'

export const Config = Schema.object({
  endpoint: Schema.string().default('http://pointfree.io'),
  ...omit(Quester.Config.dict, ['endpoint']),
})

export function apply(ctx: Context, config: Config) {
  const http = ctx.http.extend(config)
  ctx.command('pointfree [code:rawtext]', '转换 haskell 代码为 pointfree style。')
    .alias('pf')
    .action(async (_, code) => {
      const res = await http.get('/snippet', {
        params: { code }
      })
      return res.code
    })
}