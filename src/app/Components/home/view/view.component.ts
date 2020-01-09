import { Component, OnInit } from '@angular/core'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'
import { Router } from '@angular/router'

@Component( {
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: [ './view.component.scss' ]
} )
export class ViewComponent implements OnInit {

  data: any
  account: any
  res: any
  constructor ( private web3service: Web3Service, private route: Router ) { }

  ngOnInit() {
    this.web3service.Web3Details$.subscribe( async ( data: Web3Model ) => {
      this.account = data.account
      this.res = data.reshoster
      await this.loadData()
    } )

  }
  // load resume
  loadData = async () => {
    try {
      this.data = JSON.parse( await this.res.
        Resume( sessionStorage.getItem( 'key' ) ).
        call( { from: this.account } )
      )
    } catch ( error ) {
      alert( 'No Resume Found!!' )
      this.route.navigateByUrl( '/' )
    }
  }

}
