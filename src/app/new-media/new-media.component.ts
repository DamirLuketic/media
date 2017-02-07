import { Component, OnInit, DoCheck } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {LanguageService} from "../shared/services/language.service";
import {MediaService} from "../shared/services/media.service";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-new-media',
  templateUrl: 'new-media.component.html',
  styleUrls: ['new-media.component.css']
})
export class NewMediaComponent implements OnInit, DoCheck {

  // Variable for media type ("0" -> Audio, "1" -> Video)
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
    'change': [0]
  })

  // Default value for images files
  public imagesFiles = new FormData();

  // Variables for info and error
  public uploadError: string;
  public selectImages: string;

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
        // Info and errors
          this.uploadError = 'Max. 3. Abbildungen';
          this.selectImages = 'Wählen Sie Bilder';
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
        // Info and errors
          this.uploadError = 'Max. 3. slike';
          this.selectImages = 'Odaberite slike';
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
        // Info and errors
          this.uploadError = 'Max. 3. images';
          this.selectImages = 'Select images';
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

    // Retrieve images files
    let imagesFiles = this.imagesFiles;

    // Variable for media id
    let mediaId: number;

    // Send basic data, and retrieve media id
    this.mediaService.newMedia(formValue).subscribe(
        (data: number) => {
            this.mediaService.newMediaImages(this.mediaType, data, imagesFiles).subscribe(
                (data: any) => this.imagesFiles = null,
                error => console.log(error)
            )
        },
        error => console.log(error)
    )
  }
}
