import axios from 'axios'

export default class API {
   static get(module, params) {
      if (module === 'null' || module === 'null/null') return
      try {
         const opts = this._opts(module, params, 'get')
         return axios(opts)
      } catch (err) {
         return err
      }
   }

   static _opts(module, params, method) {
      const opts = {
         method: method,
         url: `${this.apiUrl()}/${module}`,
         params: {
            ...params,
            api_key: '5fc8fb4fe77ae40e0147a80610031b87',
         },
      }

      return opts
   }

   static apiUrl() {
      return 'https://api.themoviedb.org/3'
   }
}
