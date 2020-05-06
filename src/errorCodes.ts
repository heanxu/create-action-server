interface MyError {
  RetCode: number
  stack: string
  Message: 'string'
}

interface ValRange {
  start: number
  end: number
}

export default {
  PARAMS_ERROR: (params: string) => {
    return {
      RetCode: -400,
      Message: `Missing Required Params ${params} !`  
    }
  },
  UNKNOWN_ERROR: (error: MyError) => {
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
  }
}