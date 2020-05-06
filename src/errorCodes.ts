interface MyError {
  RetCode: number
  stack: string
  Message: 'string'
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
      ErrorStack: error.stack || '',
    }
  }
}