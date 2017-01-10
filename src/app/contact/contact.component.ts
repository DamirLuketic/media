import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { LanguageService } from "../shared/services/language.service";
import { ContactService } from "../shared/services/contact.service";
import { Contact } from "../shared/class/contact";
import { Router } from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})
export class ContactComponent implements OnInit, DoCheck, OnDestroy {

  // Subscription
  private subscription: Subscription = null;

  // Default value for contact
  public contactMe: string;
  public name: string;
  public email: string;
  public emailText: string;
  public send: string;

  // Default value for contact form
  public nameForForm: string;
  public emailForForm: string;

  emailForm: FormGroup;

  constructor(
      private languageService: LanguageService,
      private formBuilder: FormBuilder,
      private contactService: ContactService,
      private router: Router,
      private authService: AuthService
  ) { }

  ngOnInit() {

    if(this.authService.auth != null){
      this.nameForForm = this.authService.auth.name;
      this.emailForForm = this.authService.auth.email;
    };

    this.emailForm = this.formBuilder.group({
      'name': [this.nameForForm, Validators.required],
      'formEmail': [this.emailForForm, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      'formText': ['', Validators.required]
    });
  }

  ngDoCheck(){

    switch(this.languageService.getLanguage()) {
      case 'de':
        this.contactMe = 'Kontaktiere mich';
        this.name = 'Name';
        this.email = 'Email eingeben';
        this.emailText = 'Nachricht';
        this.send = 'Senden';
        break;
      case 'en':
        this.contactMe = 'Contact Me';
        this.name = 'Name';
        this.email = 'Enter email';
        this.emailText = 'Message';
        this.send = 'Send';
        break;
      case 'hr':
        this.contactMe = 'Kontaktirajte me';
        this.name = 'Ime';
        this.email = 'Unsesite email';
        this.emailText = 'Poruka';
        this.send = 'Pošalji';
        break;
      default:
        this.contactMe = 'Contact Me';
        this.name = 'Name';
        this.email = 'Enter email';
        this.emailText = 'Message';
        this.send = 'Send';
    }
  }

  submitEmail(){
    const contact: Contact = this.emailForm.value;
    this.subscription = this.contactService.contactSend(contact).subscribe(
        (data: string) => console.log(data),
        (error: any) => console.log(error)
    );

    // return to "home" route
    this.router.navigate(['/home']);
  }

  // Remove subscription
  ngOnDestroy(){
    if(this.subscription != null){
      this.subscription.unsubscribe();
    }
  }
}
