import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { LanguageService } from "../shared/services/language.service";
import { MediaService } from "../shared/services/media.service";
import { AuthService } from "../shared/services/auth.service";
import { Subscription } from "rxjs";
import { NewMedia } from "../shared/class/new-media";
import { CanLeave } from "../shared/guardiens/canLeave.guard";

@Component({
  selector: 'app-new-media',
  templateUrl: 'new-media.component.html',
  styleUrls: ['new-media.component.css']
})
export class NewMediaComponent implements OnInit, DoCheck, OnDestroy, CanLeave {

  // Variables for subscriptions
  private newMediaSubscription: Subscription = null;
  private imagesForNewMediaSubsription: Subscription = null;

  // Variable for media type
  public mediaType: string = "Audio";

  // Variables for new media form titles
  public category: string;
  public condition: string;
  public bandDirector: string;
  public albumName: string;
  public year: string;
  public firstReleaseYear: string;
  public description: string;
  public personalNote: string;
  public label: string;
  public barcodeNumber: string;
  public cat: string;
  public change: string;
  public create: string;
  public otherIdentifiers: string;
  public identifierNameTitle: string;
  public identifierValueTitle: string;
  public identifierAdd: string;

  // Variable for identifiers form array
  public identifiers: FormArray = new FormArray([]);

  // Push identifier in form
  onAddIdentifier(identifierName: string, identifierValue: string,
                  inputName: HTMLInputElement, inputValue: HTMLInputElement) {
    if(inputName.value.length != 0 && inputValue.value.length != 0){
      (<FormArray>this.identifiers).push(
          new FormGroup({
            name: new FormControl({value: identifierName, disabled: true}, Validators.required),
            identifierValue: new FormControl({value: identifierValue, disabled: true}, Validators.required)
          })
      );
      inputName.value = null;
      inputValue.value = null;
    }else{
      alert(this.fillAllIdentifierField);
    }
  }

  // Remove identifier from form
  onRemoveIdentifier(index: number) {
    (<FormArray>this.newMediaForm.controls['identifiers']).removeAt(index);
  }

  // Default values for form (data driven approach)
  public newMediaForm: FormGroup = this.formBuilder.group({
    'category': [1, Validators.required],
    'condition': [1, Validators.required],
    'bandDirector': ['', Validators.required],
    'albumName': ['', Validators.required],
    'year': [],
    'firstReleaseYear': [],
    'description': [],
    'personalNote': [],
    'label': [],
    'barcodeNumber': [],
    'cat': [],
    'change': [0, Validators.required],
    'identifiers': this.identifiers
  })


  // Default value for images files
  public imagesFiles = new FormData();

  // Variables for info and error
  public uploadError: string;
  public selectImages: string;
  public fillAllIdentifierField: string;
  public canLeaveError: string;

  constructor(
      private formBuilder: FormBuilder,
      private languageService: LanguageService,
      private mediaService: MediaService,
      private authService: AuthService
  ) { }

  ngOnInit() {
  }

  ngDoCheck(){
    // Values for form label, info and errors
    switch (this.languageService.getLanguage()){
      case 'de':
        this.category = 'Kategorie'
        this.condition = 'Bedingung';
          if(this.mediaType == 'Audio'){
            this.bandDirector = 'Band';
            this.albumName = 'Album';
          }else{
            this.bandDirector = 'Regie';
            this.albumName = 'Name';
          }
        this.year = 'Jahr';
        this.firstReleaseYear = 'Original-Erscheinungsjahr';
        this.description = 'Beschreibung';
        this.personalNote = 'Persönliche Anmerkung';
        this.label = 'Verlag';
        this.barcodeNumber = 'Barcode nummer';
        this.cat = 'CAT';
        this.change = 'Für den Austausch';
        this.create = 'Erstellen';
        this.otherIdentifiers = 'Anderer Bezeichner';
        this.identifierNameTitle = 'Name';
        this.identifierValueTitle = 'Wert';
        this.identifierAdd = 'Hinzufügen';
        // Info and errors
          this.uploadError = 'Max. 3. Abbildungen';
          this.selectImages = 'Wählen Sie Bilder';
          this.fillAllIdentifierField = 'Beide Felder erforderlich';
          this.canLeaveError = 'Änderungen werden nicht gespeichert, willst du gehen?';
        break;
      case 'hr':
        this.category = 'Kategorija'
        this.condition = 'Stanje';
          if(this.mediaType == 'Audio'){
            this.bandDirector = 'Band';
            this.albumName = 'Album';
          }else{
            this.bandDirector = 'Redatelj';
            this.albumName = 'Naziv';
          }
        this.year = 'Godina';
        this.firstReleaseYear = 'Godina prvog izdanja';
        this.description = 'Opis';
        this.personalNote = 'Osobna bilješka';
        this.label = 'Izdavač';
        this.barcodeNumber = 'Bar kod broj';
        this.cat = 'CAT';
        this.change = 'Za razmjenu';
        this.create = 'Unesi';
        this.otherIdentifiers = 'Ostali identifikatori';
        this.identifierNameTitle = 'Naziv';
        this.identifierValueTitle = 'Vrijednost';
        this.identifierAdd = 'Dodaj';
        // Info and errors
          this.uploadError = 'Max. 3. slike';
          this.selectImages = 'Odaberite slike';
          this.fillAllIdentifierField = 'Oba polja su obavezna';
          this.canLeaveError = 'Promjene nisu spremljene, želite li otići?';
        break;
      default:
        this.category = 'Category'
        this.condition = 'Condition';
          if(this.mediaType == 'Audio'){
            this.bandDirector = 'Band';
            this.albumName = 'Album';
          }else{
            this.bandDirector = 'Director';
            this.albumName = 'Name';
          }
        this.year = 'Year';
        this.firstReleaseYear = 'First release year';
        this.description = 'Description';
        this.personalNote = 'Personal note';
        this.label = 'Label';
        this.barcodeNumber = 'Barcode number';
        this.cat = 'CAT';
        this.change = 'For change';
        this.create = 'Create';
        this.otherIdentifiers = 'Other identifiers';
        this.identifierNameTitle = 'Name';
        this.identifierValueTitle = 'Value';
        this.identifierAdd = 'Add';
        // Info and errors
          this.uploadError = 'Max. 3. images';
          this.selectImages = 'Select images';
          this.fillAllIdentifierField = 'Both fields required';
          this.canLeaveError = 'Changes are not saved, do you want to leave?';
    }
  }

  // Change media type
  changeMediaType(){
    if(this.mediaType == 'Audio'){
      this.mediaType = 'Video';
    }else{
      this.mediaType = 'Audio';
    }
  }

  // Function for upload image
  fileUpload(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      if(fileList.length > 3){
        this.imagesFiles = null;
        alert(this.uploadError);
      }else{
      let imagesData: FormData = new FormData();
      imagesData.append('photoFeatured', fileList[0], fileList[0].name);
          if(fileList[1] != null){
            imagesData.append('photoNotFeatured1', fileList[1], fileList[1].name);
          }
          if(fileList[2] != null){
            imagesData.append('photoNotFeatured2', fileList[2], fileList[2].name);
          }
          this.imagesFiles = imagesData;
        }
    }
  }

  // On submit form
  onSubmit(){

    // Retrieve form data
    let formValue = this.newMediaForm.value;
    formValue['type'] = this.mediaType;
    formValue['user_id'] = this.authService.auth.id;
      // Identifiers form array is in new form group (for catching by ID), so we need special adding for them
    formValue['identifiers']  = this.newMediaForm.controls['identifiers'].value;
    let sendData: NewMedia = formValue;

    // Retrieve images files
    let imagesFiles = this.imagesFiles;

    // Variable for media id
    let mediaId: number;

    // Send basic data, and retrieve media id
    this.newMediaSubscription = this.mediaService.newMedia(sendData).subscribe(
        (data: number) => {
            this.imagesForNewMediaSubsription = this.mediaService.newMediaImages(this.mediaType, data, imagesFiles).subscribe(
                (data: any) => {
                  this.identifiers = new FormArray([]),
                  this.newMediaForm.controls['identifiers'] = this.identifiers,
                  this.imagesFiles = new FormData(),
                      this.newMediaForm = this.formBuilder.group({
                        'category': [1, Validators.required],
                        'condition': [1, Validators.required],
                        'bandDirector': ['', Validators.required],
                        'albumName': ['', Validators.required],
                        'year': [],
                        'firstReleaseYear': [],
                        'description': [],
                        'personalNote': [],
                        'label': [],
                        'barcodeNumber': [],
                        'cat': [],
                        'change': [0, Validators.required],
                        'identifiers': this.identifiers
                  })
                },
                error => console.log(error)
            )
        },
        error => console.log(error)
    )
  }

  // Implements of self-write "CanLeave" interfaces
  canLeave(){
    if(this.newMediaForm.dirty){
      return confirm(this.canLeaveError);
    }else {
      return true;
    }
  }

  // Remove subscriptions
  ngOnDestroy(){
    if(this.newMediaSubscription != null){
      this.newMediaSubscription.unsubscribe();
    }
    if(this.imagesForNewMediaSubsription != null){
      this.imagesForNewMediaSubsription.unsubscribe();
    }
  }
}
