import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component( {
  selector: 'example-app',
  template: `
  Value: {{ form.value | json }}
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div formArrayName="cities">
        <div *ngFor="let citys of cities.controls; index as i" [formGroupName]="i">
          <input formControlName="city" placeholder="City">
          <input formControlName="tele" placeholder="tele">
        </div>
      </div>
      <button>Submit</button>
    </form>
    
    <button (click)="addCity()">Add City</button>
    <button (click)="setPreset()">Set preset</button>
  `,
} )
export class SampleComponent {
  form = new FormGroup( {
    cities: new FormArray( [ new FormGroup( {
      city: new FormControl( 'SF' ),
      tele: new FormControl(),
    } ) ] )
  } );

  get cities(): FormArray { return this.form.get( 'cities' ) as FormArray; }

  addCity() {
    this.cities.push( new FormGroup( {
      city: new FormControl( 'SF' ),
      tele: new FormControl(),
    } ) );
  }

  onSubmit() {
    console.log( this.cities.value );  // ['SF', 'NY']
    console.log( this.form.value );    // { cities: ['SF', 'NY'] }
  }

  setPreset() { this.cities.patchValue( [ 'LA', 'MTV' ] ); }
}