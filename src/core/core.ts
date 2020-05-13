import * as _ from 'underscore'

const globalAny: GlobalAny = globalThis

interface Input {
  Action: string
  [key: string] : any
}

interface Output extends Input {
  RetCode: number
  Data?: [] | object
}

class ApiBase {

  input: Input
  required: object
  optional: object
  output: Output
  process: () => void

  public constructor(input: Input, process: () => void, required: object, optional: object) {
    this.input = input
    this.process = process
    this.required = required
    this.optional = optional

    this.output = {
      Action: `${input.Action}Response`,
      RetCode: 0
    }

  }

  public init() {
    this.checkParams()
    this.checkType()
  }

  private checkParams() {
    if (this.required) {

      const missParams: string[] = []

      Object.keys(this.required).map(k => {
        if (this.input[k] === undefined) {
          missParams.push(k)
        }
      })

      if (missParams.length > 0) {
        throw globalAny.MY_ERROR.PARAMS_ERROR(missParams.join(','))
      }
    }
  }

  public send(outputData: [] | object) {
    this.output.Data = outputData
  }

  public checkOutput() {
    for (let key in this.output) {
      if (!globalAny.OUTPUT_PARAMS.includes(key)) {
        delete this.output[key]
      }
    }
  }

  private checkTypeUtil(key: string, val: any) {
    let self = this
    /**
     * enum
     */
    if (_.isArray(val)) {
      if (_.isArray(self.input[key])) {
        if (_.difference(self.input[key], val).length) {
          throw globalAny.MY_ERROR.ENUM_ERROR(key, val)
        }
      } else {
        if (!val.includes(self.input[key])) {
          throw globalAny.MY_ERROR.ENUM_ERROR(key, val)
        }
      }
      return
    }

    /**
     * range
     */

    if (_.isObject(val)) {
      if (!_.isNumber(self.input[key])) {
        throw globalAny.MY_ERROR.TYPE_ERROR(key, 'number')
      }
      if ((self.input[key] < val.start || self.input[key] > val.end)) {
        throw globalAny.MY_ERROR.RANGE_ERROR(key, val)
      }
      return
    }

    switch (val.toLowerCase()) {
      case 'all':
        break
      case 'array':
      case 'number':
      case 'object':
      case 'boolean':
      case 'string':
        this.throwTypeError(key, val)
        break

      default:
        throw globalAny.MY_ERROR.TYPE_ERROR(key, val)
    }
  }

  private throwTypeError(key: string, val: any) {
    const checkKey = 'is' + val.substr(0, 1).toUpperCase() + val.substr(1)
    if (!(_ as any)[checkKey](this.input[key])) {
      throw globalAny.MY_ERROR.TYPE_ERROR(key, val)
    }
  }

  private checkType() {

    Object.entries(this.required).forEach(([key, val]) => {
      this.checkTypeUtil(key, val)
    })

    Object.entries(this.optional).forEach(([key, val]) => {
      if (this.input[key] !== undefined) {
        this.checkTypeUtil(key, val)
      }
    })
  }
}

export default ApiBase
