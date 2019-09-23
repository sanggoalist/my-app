import { Injectable, Inject } from '@angular/core';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  STORAGE_KEY = 'sang-app-chat';
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  setItem(key: string, value: any): void{
    this.storage.set(key, value);
  }
  getItem(key: string): any{
    return this.storage.get(key);
  }
  removeItem(key: string): any{
    return this.storage.remove(key);
  }
  clear(){
    this.storage.clear();
  }
}
