interface UnknownError {
  RetCode: number
  stack: string
  Message: 'string'
}

interface ValRange {
  start: number
  end: number
}

interface MyError {
  PARAMS_ERROR: (params: string) => void
  UNKNOWN_ERROR: (error: UnknownError) => void
  ENUM_ERROR: (key: string, val: string []) => void
  RANGE_ERROR: (key: string, val: ValRange) => void
  TYPE_ERROR: (key: string, type: string) => void
  DEFAULT_ERROR: (message: string) => void
}

interface MyGlobal {
  MY_ERROR?: MyError
  OUTPUT_PARAMS?: string[] 
  PATH?: string
}

type GlobalAny = typeof globalThis & MyGlobal
