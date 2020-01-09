import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'


@Injectable( {
  providedIn: 'root'
} )
export class SearchGuard implements CanActivate {
  private web3var: Web3Model
  constructor ( private web3Service: Web3Service, private route: Router ) { }
  exp = new RegExp( '^0x[a-fA-F0-9]{40}$' )
  async canActivate(): Promise<boolean> {
    if ( this.exp.test( sessionStorage.getItem( 'key' ) ) ) {
      await this.web3Service.web3login()
      this.web3var = await this.web3Service.Web3Details$.value
      try {
        const data = await this.web3var.reshoster
          .Resume( sessionStorage.getItem( 'key' ) )
          .call( { from: this.web3var.account } )
        if ( data ) {
          sessionStorage.setItem( 'data', data )
          return true
        }
        alert( 'No Resume Found!!' )
        this.route.navigateByUrl( '/' )
        return false
      } catch ( error ) {
        // alert( 'No Resume Found!!' )
        // this.route.navigateByUrl( '/' )
      }
    }
    alert( 'Invalid Public Key' )
    this.route.navigateByUrl( '/' )
  }
}
