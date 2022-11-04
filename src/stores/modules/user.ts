import { defineStore } from 'pinia'
import { store } from '@/stores'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: undefined,
    tokenTime: undefined,
    refreshToken: undefined,
    userInfo: null as any
  }),
  getters: {
    getToken: (state) => {
      return state.token
    },
    getTokenTime: (state) => {
      return state.tokenTime
    }
  }
})

export function getUserStore() {
  return useUserStore(store)
}
