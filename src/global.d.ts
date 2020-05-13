interface MyGlobal {
  MY_ERROR?: any
  OUTPUT_PARAMS?: string[] 
  PATH?: string
}

type GlobalAny = typeof globalThis & MyGlobal
