import * as express from 'express'

const globalAny : any = globalThis

export default (req: express.Request, res: express.Response, next: express.NextFunction) : void => {

  const params = Object.assign({}, req.query, req.body)
  
  try {
    
    if (!params.Action) {
      throw globalAny.MY_ERROR.PARAMS_ERROR('Action')
    }

    next()

  } catch (error) {
    throw globalAny.MY_ERROR.UNKNOWN_ERROR(error)
  }
}
