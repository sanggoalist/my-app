import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Person } from './models/person';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const persons =[
      { age: 11, name: 'Dr Nice' },
      { age: 12, name: 'Narco' },
      { age: 13, name: 'Bombasto' },
      { age: 14, name: 'Celeritas' },
      { age: 15, name: 'Magneta' },
      { age: 16, name: 'RubberMan' },
      { age: 17, name: 'Dynama' },
      { age: 18, name: 'Dr IQ' },
      { age: 19, name: 'Magma' },
      { age: 20, name: 'Tornado' }
    ];
    return {persons};
  }
}
