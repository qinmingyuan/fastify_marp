import Fastify from 'fastify'
import { Marp } from '@marp-team/marp-core'


const fastify = Fastify({
  logger: true
})
const marp = new Marp({
  markdown: {
    html: true,
    breaks: true
  }
})


// 声明路由
fastify.post('/marp', (request, reply) => {
  const body = request.body
  const { html, css, comments } = marp.render(body.markdown, { htmlAsArray: true })

  reply.send({ html: html, css: css, comments: comments })
})

// 启动服务！
fastify.listen(4000, '0.0.0.0', (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
