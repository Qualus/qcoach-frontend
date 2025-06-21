/** @type {import('next').nextconfig} */
const nextconfig = {
  async rewrites() {
    if (process.env.node_env === 'development') {
      return [
        {
          source: '/backend/api/:path*',
          destination: 'http://localhost:8080/api/:path*',
        },
      ]
    }
    return []
  },

  async headers() {
    return [
      {
        source: '/backend/api/:path*',
        headers: [
          { key: 'access-control-allow-credentials', value: 'true' },
          { key: 'access-control-allow-origin', value: '*' },
          { key: 'access-control-allow-methods', value: 'get,options,patch,delete,post,put' },
          { key: 'access-control-allow-headers', value: 'x-csrf-token, x-requested-with, accept, accept-version, content-length, content-md5, content-type, date, x-api-version, authorization' },
        ],
      },
    ]
  },

  images: {
    domains: ['localhost', 'qcoach.it'],
  },
}

module.exports = nextconfig

