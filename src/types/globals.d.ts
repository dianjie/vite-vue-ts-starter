// 通用声明

// Vue
declare module '*.vue' {
  import { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

declare type Recordable<T = any> = Record<string, T>

declare type StrOrNum = number | string

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type TargetContext = '_self' | '_blank'

declare type Nullable<T> = T | undefined | null

declare type ObjectType = {
  [key: string]: any
}
