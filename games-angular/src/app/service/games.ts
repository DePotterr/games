import { HttpParams } from '@angular/common/http';

export class Game {

   public _id: string;

   constructor (
                public name: string,
                public description: string, 
                public price: Number) {}

   getParams() : HttpParams {
      return new HttpParams()
         .set('_id', this._id)
         .set('name', this.name)
         .set('description', this.description)
         .set('price', this.price.toString());
   }

   getParamsWithoutId() : HttpParams {
      return new HttpParams()
      .set('name', this.name)
      .set('description', this.description)
      .set('price', this.price.toString());
   }
}
