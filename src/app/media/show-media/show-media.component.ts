import { Component, OnInit, DoCheck } from '@angular/core';
import { CurrentService } from "../../shared/services/current.service";
import { LanguageService } from "../../shared/services/language.service";

@Component({
  selector: 'app-show-media',
  templateUrl: './show-media.component.html',
  styleUrls: ['./show-media.component.css']
})
export class ShowMediaComponent implements OnInit, DoCheck {

  // Variable for current media type (audio or video)
  public currentMediaType: string;

  // Variable for current purpose (exchange, allowed or personal)
  public currentPurpose: string;

  // Variable for current media (receive current media)
  public currentMedia = [];

  // Default value for language
  public selectMedia: string;
  public mediaCategory: string;
    // For dual value
    public band: string = 'Band';
    public director: string;
    public album: string = 'Album';
    public name: string;
  public year: string;
  public condition: string;
  public changeStatus: string;
  public description: string;
  public owner: string;
  public sendOffer: string;
  public originalReleaseYear: string;
  public images: string;
  public label: string;
  public barcodeNumber: string;
  public othersIdentifiers: string;
  public showHideImages: string;
  public showHideOthersIdentifiers: string;
    // For personal form
    public personalNote: string;
    public delete: string;
    public update: string;
    public createdAt: string;
    public updatedAt: string;

  // Variables for hide component
  public imagesHideShow: boolean = true;
  public identiriersHideShow: boolean = true;

  constructor(
      private currentService: CurrentService,
      private languageService: LanguageService
  ) { }

  ngOnInit() {
  }

  changeHideShowImages(){
    if(this.imagesHideShow){
      this.imagesHideShow = false;
    }else {
      this.imagesHideShow = true;
    }
  }

  changeHideShowIdentifiers(){
    if(this.identiriersHideShow){
      this.identiriersHideShow = false;
    }else {
      this.identiriersHideShow = true;
    }
  }

  ngDoCheck(){
    // Part for translate
    switch (this.languageService.getLanguage()){
      case 'de':
        this.selectMedia = 'Wählen Sie das Medium aus';
        this.mediaCategory = 'Kategorie';
        this.director = 'Regie';
        this.name = 'Name';
        this.year = 'Jahr';
        this.condition = 'Bedingung';
        this.changeStatus = 'Für den Austausch';
        this.description = 'Beschreibung';
        this.owner = 'Eigentümer';
        this.sendOffer = 'Angebot senden';
        this.originalReleaseYear = 'Original-Erscheinungsjahr';
        this.images = 'Bilder';
        this.label = 'Verlag';
        this.barcodeNumber = 'Barcode nummer';
        this.othersIdentifiers = 'Andere Kennungen';
        this.personalNote = 'Persönliche Anmerkung';
          if(this.imagesHideShow){
            this.showHideImages = 'Bilder anzeigen';
          }else {
            this.showHideImages = 'Bilder ausblenden';
          }
          if(this.identiriersHideShow){
            this.showHideOthersIdentifiers = 'Andere Identifikatoren anzeigen';
          }else{
            this.showHideOthersIdentifiers = 'Andere Identifikatoren ausblenden';
          }
        this.delete = 'Löschen';
        this.update = 'Aktualisieren';
        this.createdAt = 'Hergestellt am:';
        this.updatedAt = 'Aktualisiert am:';
        break;
      case 'hr':
        this.selectMedia = 'Izaberite medij';
        this.mediaCategory = 'Kategorija';
        this.director = 'Redatelj';
        this.name = 'Naziv';
        this.year = 'Godina';
        this.condition = 'Stanje';
        this.changeStatus = 'Za razmjenu';
        this.description = 'Opis';
        this.owner = 'Vlasnik';
        this.sendOffer = 'Pošaljite ponudu';
        this.originalReleaseYear = 'Godina prvog izdanja';
        this.images = 'Slike';
        this.label = 'Izdavač';
        this.barcodeNumber = 'Bar kod broj';
        this.othersIdentifiers = 'Ostali identifikatori';
        this.personalNote = 'Osobna bilješka';
          if(this.imagesHideShow){
            this.showHideImages = 'Prikaži slike';
          }else {
            this.showHideImages = 'Sakrij slike';
          }
          if(this.identiriersHideShow){
            this.showHideOthersIdentifiers = 'Prikaži druge identifikatore';
          }else{
            this.showHideOthersIdentifiers = 'Sakrij druge identifikatore';
          }
        this.delete = 'Obriši';
        this.update = 'Ažuriraj';
        this.createdAt = 'Izrađeno u:';
        this.updatedAt = 'Obnovljeno u:';
        break;
      default:
        this.selectMedia = 'Select media';
        this.mediaCategory = 'Category';
        this.director = 'Director';
        this.name = 'Name';
        this.year = 'Year';
        this.condition = 'Condition';
        this.changeStatus = 'For change';
        this.description = 'Description';
        this.owner = 'Owner';
        this.sendOffer = 'Send offer';
        this.originalReleaseYear = 'Original release year';
        this.images = 'Images';
        this.label = 'Label';
        this.barcodeNumber = 'Barcode number';
        this.othersIdentifiers = 'Others identifiers';
        this.personalNote = 'Personal note';
          if(this.imagesHideShow){
            this.showHideImages = 'Show images';
          }else {
            this.showHideImages = 'Hide images';
          }
          if(this.identiriersHideShow){
            this.showHideOthersIdentifiers = 'Show others identifiers';
          }else{
            this.showHideOthersIdentifiers = 'Hide Others identifiers';
          }
        this.delete = 'Delete';
        this.update = 'Update';
        this.createdAt = 'Created at:';
        this.updatedAt = 'Updated at:';
        this
    }

    // Set current media type and current purpose
    this.currentMediaType = this.currentService.currentMediaType;
    this.currentPurpose = this.currentService.currentPurpose;

    // Retrieve current media
    this.currentMedia = this.currentService.currentMedia;
  }
}
