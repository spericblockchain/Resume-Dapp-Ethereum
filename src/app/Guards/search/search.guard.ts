import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'


@Injectable( {
  providedIn: 'root'
} )
export class SearchGuard implements CanActivate {
  constructor ( private web3Service: Web3Service, private route: Router ) { }
  exp = new RegExp( '^0x[a-fA-F0-9]{40}$' )
  async canActivate(): Promise<boolean> {
    if ( this.exp.test( sessionStorage.getItem( 'key' ) ) ) {
      await this.web3Service.web3login()
      return true
    }
    alert( 'Invalid Public Key' )
    this.route.navigateByUrl( '/' )
  }
}
