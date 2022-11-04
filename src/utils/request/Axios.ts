import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import type { CreateAxiosOptions } from './AxiosTransform'
import type {
  AxiosRequestConfigRetry,
  RequestOptions,
  Result,
  UploadFileParams
} from '@/types/axios'
import axios from 'axios'
import { stringify } from 'qs'
import { isFunction, cloneDeep } from 'lodash-es'
import { AxiosCanceler } from './AxiosCancel'

// Axios模块
export class VAxios {
  // axios句柄
  private instance: AxiosInstance

  // axios选项
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.instance = axios.create(options)
    this.setupInterceptors()
  }

  // 创建axios句柄
  private createAxios(config: CreateAxiosOptions): void {
    this.instance = axios.create(config)
  }

  // 获取数据处理
  private getTransform() {
    const { transform } = this.options
    return transform
  }

  // 获取句柄
  getAxios(): AxiosInstance {
    return this.instance
  }

  // 配置 axios
  configAxios(config: CreateAxiosOptions) {
    if (!this.instance) {
      return
    }
    this.createAxios(config)
  }

  // 设置通用头信息
  setHeader(headers: Record<string, string>): void {
    if (!this.instance) {
      return
    }
    Object.assign(this.instance.defaults.headers, headers)
  }

  // 设置拦截器
  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform) {
      return
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform
    const axiosCanceler = new AxiosCanceler()

    // 请求配置处理
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const {
        // @ts-ignore
        headers: { ignoreRepeatRequest }
      } = config
      const ignoreRepeat = ignoreRepeatRequest ?? this.options.requestOptions?.ignoreRepeatRequest
      if (!ignoreRepeat) axiosCanceler.addPending(config)

      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options)
      }
      return config
    }, undefined)

    // 请求错误处理
    if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
      this.instance.interceptors.request.use(undefined, requestInterceptorsCatch)
    }

    // 响应结果处理
    this.instance.interceptors.response.use((res: AxiosResponse) => {
      if (res) axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    // 响应错误处理
    if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
      this.instance.interceptors.response.use(undefined, responseInterceptorsCatch)
    }
  }

  /**
   * @description:  File Upload
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData()
    const customFilename = params.name || 'file'

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename)
    } else {
      formData.append(customFilename, params.file)
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, params.data![key])
      })
    }

    return this.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': 'multipart/form-data;charset=UTF-8',
        // @ts-ignore
        ignoreCancelToken: true
      }
    })
  }

  // 支持Form Data
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== 'application/x-www-form-urlencoded;charset=UTF-8' ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === 'GET'
    ) {
      return config
    }

    return {
      ...config,
      data: stringify(config.data, { arrayFormat: 'brackets' })
    }
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  patch<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PATCH' }, options)
  }

  // 请求
  async request<T = any>(config: AxiosRequestConfigRetry, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config)
    const transform = this.getTransform()

    const { requestOptions } = this.options

    const opt: RequestOptions = { ...requestOptions, ...options }

    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt

    conf = this.supportFormData(conf)

    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<Result>>(!config.retryCount ? conf : config)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('请求错误!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            // 在这里重写Axios的错误信息
          }
          reject(e)
        })
    })
  }
}
