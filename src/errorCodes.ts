
export default {
  PARAMS_ERROR: (params: string) => {
    return {
      RetCode: -400,
      Message: `Missing Required Params ${params} !`  
    }
  },
  UNKNOWN_ERROR: (error: UnknownError) => {
    return {
      RetCode: error.RetCode || -1,
      Message: error.Message || 'Exception Error !',
      ErrorStack: error.stack,
    }
  },
  ENUM_ERROR: (key: string, val: string []) => {
    return {
      RetCode: -400,
      Message: `Required Param ${key} Type Error, Must Be In ${val.join(',')} !`,
    }
  },
  RANGE_ERROR: (key: string, val: ValRange) => {
    return {
      RetCode: -400,
      Message: `Required Param ${key} Type Error, Must Between ${val.start} And ${val.end} !`
    }
  },
  TYPE_ERROR: (key: string, type: string) => {
    return {
      RetCode: -400,
      Message: `Required Param ${key} Type Error, Must Be ${type} !`
    }
  },
  DEFAULT_ERROR: (message: string) => {
    return {
      RetCode: -500,
      Message: message
    }
  }
}