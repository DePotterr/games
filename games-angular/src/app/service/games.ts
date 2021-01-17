import { HttpParams } from '@angular/common/http';

export class Game {

   public _id: string;
   private _rev: string;
   constructor (
                public name: string,
                public description: string, 
                public price: Number,
                _id?: string,
                _rev?: string) {
                   this._id = _id
                   this._rev = _rev
                }

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

   getParamsCouchDB() : HttpParams {
      return new HttpParams()
         .set('_id', this._id)
         .set('_rev', this._rev)
         .set('name', this.name)
         .set('description', this.description)
         .set('price', this.price.toString())
   }

   get_rev(){
      return this._rev;
   }

   set_rev(_rev){
      this._rev = _rev;
   }
}
