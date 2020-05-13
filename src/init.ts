
import errorCodes from './errorCodes'

interface MyConfig {
  ErrorCodes?: number,
  OutputParams?: string []
}

const init = (path : string) => {

  let config : MyConfig = {}

  try {
    config = require(`${path}/config.json`)
  } catch (e) {
    config = {}
  }

  const OUTPUT_PARAMS : string [] = ['Action', 'RetCode', 'Message', 'Data', 'TrackSn']

  const appendGlobalData: MyGlobal = {
    MY_ERROR: Object.assign(errorCodes, config.ErrorCodes || {}),
    OUTPUT_PARAMS: config.OutputParams || OUTPUT_PARAMS,
    PATH: path
  }

  Object.assign(globalThis, appendGlobalData)
}

export default init
