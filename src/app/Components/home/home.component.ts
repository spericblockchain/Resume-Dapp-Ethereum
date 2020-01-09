import { async } from '@angular/core/testing'
/** @format */

import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent {
  publicKey: string
  // exp = new RegExp( '^0x[a-fA-F0-9]{40}$' )
  constructor ( private web3: Web3Service, private route: Router ) {
    localStorage.clear()
  }
  search = async () => {
    // if ( this.exp.test( this.publicKey ) ) {
    sessionStorage.setItem( 'key', this.publicKey )
    this.route.navigateByUrl( '/view' )
    // } else {
    // alert( 'Invalid Public Key' )
    // }
  }
}
