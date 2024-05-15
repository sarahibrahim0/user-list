import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Cache } from '../interfaces/cache';
import { CacheEntry, MAX_CACHE_AGE } from '../interfaces/cache-entry';

@Injectable({
  providedIn: 'root'
})
export class CacheMapService implements Cache {

  cacheMap = new Map<string, CacheEntry>();
  get(req: HttpRequest<any>): HttpResponse<any> | null {
//     if(!req)
//  {
//   return null;
//     }
console.log(req + 'get ')
    const entry = this.cacheMap.get(req.urlWithParams);
    if (!entry) {
        return null;
    }
    console.log(entry + 'get ')

    const isExpired = (Date.now() - entry.entryTime) > MAX_CACHE_AGE;
    return isExpired ? null : entry.response;
  }
  put(req: HttpRequest<any>, res: HttpResponse<any>): void {
      // if(!req){
      //   return null
      // }
      console.log(req)
        const entry: CacheEntry = { url: req.urlWithParams, response: res, entryTime: Date.now() };

        console.log(entry + 'entry')
        console.log(req.urlWithParams + 'req.urlWithParams ')

        this.cacheMap.set(req.urlWithParams, entry);
      this.deleteExpiredCache();
      console.log(this.cacheMap + 'cacheMap')

  }
  private deleteExpiredCache() {
      this.cacheMap.forEach(entry => {
          if ((Date.now() - entry.entryTime) > MAX_CACHE_AGE) {
              this.cacheMap.delete(entry.url);
          }
      })
  }}
