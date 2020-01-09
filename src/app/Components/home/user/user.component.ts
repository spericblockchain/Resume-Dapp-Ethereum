import { async } from '@angular/core/testing'
import { Web3Service } from './../../../Services/Web3/web3.service'
import { ResumeModel, Skill } from './../../../Models/resume.model'
import { Component, OnInit, ViewChild } from '@angular/core'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms'
import { MatChipInputEvent } from '@angular/material'
import { Web3Model } from 'src/app/Models/web3.model'
import { Router } from '@angular/router'

@Component( {
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.scss' ]
} )
export class UserComponent implements OnInit {
  constructor ( private fb: FormBuilder, private web3service: Web3Service, private route: Router ) { }
  skills: Skill[] = []
  res: any
  account: any
  @ViewChild( 'autosize', { static: false } ) autosize: CdkTextareaAutosize
  visible = true
  selectable = true
  removable = true
  addOnBlur = true
  readonly separatorKeysCodes: number[] = [ ENTER, COMMA ]
  resumeForm: FormGroup
  get educationForm(): FormArray {
    return this.resumeForm.get( 'education' ) as FormArray
  }
  get projectForm() {
    return this.resumeForm.get( 'projects' ) as FormArray
  }
  get experienceForm() {
    return this.resumeForm.get( 'experience' ) as FormArray
  }
  get certificationForm() {
    return this.resumeForm.get( 'certification' ) as FormArray
  }
  basicVal = [ null, Validators.required, ]
  ngOnInit() {
    this.web3service.Web3Details$.subscribe( ( data: Web3Model ) => {
      this.account = data.account
      this.res = data.reshoster
    } )
    this.resumeForm = this.fb.group( {
      name: this.basicVal,
      objective: this.basicVal,
      dob: this.basicVal,
      address: this.basicVal,
      tel: this.basicVal,
      email: [ '', [
        Validators.required,
        Validators.email
      ] ],
      skill: '',
      education: this.fb.array( [ new FormGroup( {
        edu1: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
        edu2: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
        edu3: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
      } ) ] ),
      certification: this.fb.array( [ new FormGroup( {
        cert1: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
        cert2: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
      } ) ] ),
      experience: this.fb.array( [ new FormGroup( {
        exp1: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
        exp2: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
        exp3: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
      } ) ] ),
      projects: this.fb.array( [ new FormGroup( {
        pro1: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
        pro2: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
        pro3: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
      } ) ] )
    } )
  }
  emailin() {
    console.log( 'uibhii' )

    alert( 'invalid Email' )
  }
  addExp = () => {
    this.experienceForm.push( new FormGroup( {
      exp1: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
      exp2: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
      exp3: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
    } ) )
  }
  addPro = () => {
    this.projectForm.push( new FormGroup( {
      pro1: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
      pro2: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
      pro3: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
    } ) )
  }
  addEdu = () => {
    this.educationForm.push( new FormGroup( {
      edu1: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
      edu2: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
      edu3: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
    } ) )
  }
  addCert = () => {
    this.certificationForm.push( new FormGroup( {
      cert1: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
      cert2: new FormControl( this.basicVal[ 0 ], this.basicVal[ 1 ] ),
    } ) )
  }

  deleteEducation( i ) {
    this.educationForm.removeAt( i )
  }
  deleteProject( i ) {
    this.projectForm.removeAt( i )
  }
  deleteExperience( i ) {
    this.experienceForm.removeAt( i )
  }
  deleteCertification( i ) {
    this.certificationForm.removeAt( i )
  }
  add( event: MatChipInputEvent ): void {
    const input = event.input
    const value = event.value
    if ( ( value || '' ).trim() ) {
      this.skills.push( { name: value.trim() } )
    }
    if ( input ) {
      input.value = ''
    }
  }
  remove( skill: any ): void {
    const index = this.skills.indexOf( skill )
    if ( index >= 0 ) {
      this.skills.splice( index, 1 )
    }
  }

  submitResume = async () => {
    const data: any = this.resumeForm.value
    data.dob = this.resumeForm.value.dob.toLocaleDateString( 'en-US' )
    data.skill = this.skills
    console.log( 'Log: UserComponent -> submitResume -> data', JSON.stringify( data ) )
    const response = await this.res.addResume( JSON.stringify( data ) ).send( {
      from: this.account,
      gas: 5000000
    } )
    console.log( 'Log: UserComponent -> submitResume -> response', response )
    if ( response.status ) {
      alert( 'Resume Added SuccessFully' )
      alert( response.transactionHash )
      sessionStorage.setItem( 'key', this.account )
      this.route.navigateByUrl( '/view' )
    } else {
      alert( 'something happend' )
      this.resumeForm.reset()
      this.skills = null
      this.resumeForm.markAsUntouched()
    }
  }
}
