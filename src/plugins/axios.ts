import { getCurrentInstance } from 'vue';

export function useAxios() {
    const app = getCurrentInstance()?.appContext.app
  
    if (app) {
      return app.config.globalProperties.axios
    } else {
      throw new Error('Could not get app instance')
    }
}

export default { useAxios };