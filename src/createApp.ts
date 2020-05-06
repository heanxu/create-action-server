import * as express from 'express'
import * as  bodyParser from 'body-parser'
import init from './init'
import auth from './core/auth'
import loader from './core/loader'

const DEFAULT_PATH = process.cwd() + '/lib'

export default (path : string = DEFAULT_PATH) => {
  try {
     /**
     *  初始化
     */
    
    init(path)

    const app = express()

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded())
    app.use(auth)

    app.get('*', (req, res) => {
      loader(req.query, res)
    })

    app.post('*', (req, res) => {
      loader(req.body, res)
    })

    return app

  } catch (error) {
    console.error('error: ', error)
    process.exit(1)
  }
}

