const globalAny: any = globalThis


interface Input {
  Action: 'string'
}

class ApiBase {

  input: any
  required: object
  optional: object
  output: any
  process: any

  public constructor(input: Input, process: any, required: object, optional: object) {
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
    this.check_params()
    this.check_type()
  }

  private check_params() {
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

  public send(outputData: any) {
    this.output.Data = outputData
  }

  public checkOutput() {
    for (let key in this.output) {
      if (!globalAny.OUTPUT_PARAMS.includes(key)) {
        delete this.output[key]
      }
    }
  }


  private check_type() {
    /**
     * 检查参数类型 TODO:
     */
  }
}

export default ApiBase
