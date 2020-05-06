import * as express from 'express'
import ApiBase from './core'

const globalAny : any = globalThis

export default async (params: any, res: express.Response) => {
    try {

        const apiParams = require(`${globalAny.PATH}/api/${params.Action}`).default

        const { process, required = {}, optional = {} } = apiParams

        const api = new ApiBase(params, process, required, optional)

        await api.init()
        await api.process()
        await api.checkOutput()

        res.json(api.output)

    } catch (error) {
        res.json(globalAny.MY_ERROR.UNKNOWN_ERROR(error))
    }
}
