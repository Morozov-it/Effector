//хук для получения данных store
import { useStore } from "effector-react"
//импорт самого store
import $store from '../store'

export const useStoreHook = () => useStore($store)