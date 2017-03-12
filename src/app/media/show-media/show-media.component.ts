import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { CurrentService } from "../../shared/services/current.service";
import { LanguageService } from "../../shared/services/language.service";
import { RootService } from "../../shared/services/root.service";
import {error} from "util";
import {MediaService} from "../../shared/services/media.service";
import {Subscription} from "rxjs";
import {UpdateMedia} from "../../shared/class/update-media";
import {NgForm} from "@angular/forms";
import {Identifier} from "../../shared/class/identifier";
import {AudioService} from "../../shared/services/audio.service";
import {VideoService} from "../../shared/services/video.service";
import {AuthService} from "../../shared/services/auth.service";
import {AudioPersonal} from "../../shared/class/audio-personal";
import {VideoPersonal} from "../../shared/class/video-personal";
import {DeleteImageData} from "../../shared/class/delete-image-data";
import {SetNewFeaturedImageData} from "../../shared/class/set-new-featured-image-data";
import { MediaCategory } from "../../shared/class/media-category";
import { Condition } from "../../shared/class/condition";

@Component({
  selector: 'app-show-media',
  templateUrl: './show-media.component.html',
  styleUrls: ['./show-media.component.css']
})
export class ShowMediaComponent implements OnInit, DoCheck, OnDestroy {

  // Variable for current media type (audio or video)
  public currentMediaType: string;

  // Variable for current purpose (exchange, allowed or personal)
  public currentPurpose: string;

  // Variable for current media (receive current media)
  public currentMedia = [];

  // Variable for current media update date (usage in update part)
  public currentMediaUpdateDate: string = null;

  // Variable for basic root path (usage for show image)
  public basicURL = this.rootService.apiRoute;

  // Variable for deleted images id (usages in update  images part)
  public deletedImagesId = [];

  // Variables for media categories & conditions
  public audioCategories: MediaCategory[];
  public videoCategories: MediaCategory[];
  public conditions: Condition[];

  // Variables for current media category and condition name
  public categoryName: string;
  public conditionName: string;

  // Variables for subscriptions
  private deleteAudioSubscritpion: Subscription = null;
  private deleteVideoSubscription: Subscription = null;
  private audioSubscription: Subscription = null;
  private videoSubscription: Subscription = null;
  private deleteImageSubscription: Subscription = null;
  private setNewFeaturedImageSubscription: Subscription = null;
  private uploadNewImageSubscription: Subscription = null;

  // Variable for current identifiers
  public currentIdentifiers: Identifier[];
  public identifierNameTitle: string;
  public identifierValueTitle: string;
  public identifierAdd: string;
  public fillAllIdentifierField: string;

  // Variable for new featured image id
  public newFeaturedImageId: number = 0;

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
    public changeAllowed: string;
    public changeNotAllowed: string;
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
    public addPhoto: string;
    public addPhotoInfo: string;
    public makeFeatured: string;

  // Variables for hide component
  public imagesHideShow: boolean = true;
  public identiriersHideShow: boolean = true;

  constructor(
      private currentService: CurrentService,
      private languageService: LanguageService,
      private rootService: RootService,
      private mediaService: MediaService,
      private audioService: AudioService,
      private videoService: VideoService,
      private authService: AuthService
  ) { }

  ngOnInit() {
    // Set values for categories and conditions
    this.audioCategories = this.mediaService.audioCategories;
    this.videoCategories = this.mediaService.videoCategories;
    this.conditions = this.mediaService.conditions;
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
          this.changeAllowed = 'Zum Tausch';
          this.changeNotAllowed = 'Nicht zum austausch';
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
        this.addPhoto = 'Foto hinzufügen';
        this.addPhotoInfo ='Unterschiedliches Foto pro Platz';
        this.makeFeatured = 'Machen vorgestellt';
        // For identifiers
        this.identifierNameTitle = 'Name';
        this.identifierValueTitle = 'Wert';
        this.identifierAdd = 'Hinzufügen';
        this.fillAllIdentifierField = 'Beide Felder erforderlich';
        break;
      case 'hr':
        this.selectMedia = 'Izaberite medij';
        this.mediaCategory = 'Kategorija';
        this.director = 'Redatelj';
        this.name = 'Naziv';
        this.year = 'Godina';
        this.condition = 'Stanje';
        this.changeStatus = 'Za razmjenu';
          this.changeAllowed = 'Za razmjenu';
          this.changeNotAllowed = 'Nije za razmjenu';
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
        this.addPhoto = 'Dodaj sliku';
        this.addPhotoInfo ='Različite slike po mjestu';
        this.makeFeatured = 'Istakni sliku';
        // For identifiers
        this.identifierNameTitle = 'Naziv';
        this.identifierValueTitle = 'Vrijednost';
        this.identifierAdd = 'Dodaj';
        this.fillAllIdentifierField = 'Oba polja su obavezna';
        break;
      default:
        this.selectMedia = 'Select media';
        this.mediaCategory = 'Category';
        this.director = 'Director';
        this.name = 'Name';
        this.year = 'Year';
        this.condition = 'Condition';
        this.changeStatus = 'For exchange';
          this.changeAllowed = 'For exchange';
          this.changeNotAllowed = 'Not for exchange';
        this.description = 'Description';
        this.owner = 'Owner';
        this.sendOffer = 'Send offer';
        this.originalReleaseYear = 'Original release year';
        this.images = 'Images';
        this.label = 'Label';
        this.barcodeNumber = 'Barcode number';
        this.othersIdentifiers = 'Other identifiers';
        this.personalNote = 'Personal note';
          if(this.imagesHideShow){
            this.showHideImages = 'Show images';
          }else {
            this.showHideImages = 'Hide images';
          }
          if(this.identiriersHideShow){
            this.showHideOthersIdentifiers = 'Show other identifiers';
          }else{
            this.showHideOthersIdentifiers = 'Hide Other identifiers';
          }
        this.delete = 'Delete';
        this.update = 'Update';
        this.createdAt = 'Created at:';
        this.updatedAt = 'Updated at:';
        this.addPhoto = 'Add photo';
        this.addPhotoInfo ='Different photo per place';
        this.makeFeatured = 'Make featured';
        // For identifiers
        this.identifierNameTitle = 'Name';
        this.identifierValueTitle = 'Value';
        this.identifierAdd = 'Add';
        this.fillAllIdentifierField = 'Both fields required';

        this.currentMedia = this.currentService.currentMedia;

        // Set current media category and condition name
            if(this.currentMedia.hasOwnProperty('audio_category_id')){
              for(let c of this.audioCategories){
                if(this.currentMedia['audio_category_id'] == c.id){
                  this.categoryName = c.name;
                }
              }
            }else{
              for(let c of this.videoCategories){
                if(this.currentMedia['video_category_id'] == c.id){
                  this.categoryName = c.name;
                }
              }
            }

            for(let co of this.conditions){
              if(this.currentMedia['condition_id'] == co.id){
                this.conditionName = co.name;
              }
            }
    }

    // Set current media type and current purpose
    this.currentMediaType = this.currentService.currentMediaType;
    this.currentPurpose = this.currentService.currentPurpose;

    // Set and retrieve current media & set identifiers
    if(this.currentService.currentPurpose == 'Personal'){
      this.setCurrentMedia();
    }
    this.currentMedia = this.currentService.currentMedia;
    this.currentIdentifiers = this.currentService.currentIdentifiers;

    this.currentMediaUpdateDate = this.currentService.currentMediaUpdateDate;
    this.deletedImagesId = this.currentService.deletedImagesId;
    this.newFeaturedImageId = this.currentService.newFeaturedImageId;
  }

  deleteMedia(){
      let type: string = this.currentMediaType;
      let id: number;

      if(type == 'Audio'){
        id = this.currentService.currentAudioId;
        this.currentService.currentMedia = [];
        this.currentService.currentAudioId = 0;
        this.currentService.deletedAudioId.push(id);
        this.deleteAudioSubscritpion = this.mediaService.deleteAudio(id).subscribe(
            (data: any) => console.log(data),
            error => console.log(error)
        )
      }else{
        id = this.currentService.currentVideoId;
        this.currentService.currentMedia = [];
        this.currentService.currentVideoId = 0;
        this.currentService.deletedVideosId.push(id);
        this.deleteVideoSubscription = this.mediaService.deleteVideo(id).subscribe(
            (data: any) => console.log(data),
            error => console.log(error)
        )
      }
  }

  // PART for update -> Start

  // Push identifier in current identifiers
  onAddIdentifier(inputName: HTMLInputElement, inputValue: HTMLInputElement) {
    if(inputName.value.length != 0 && inputValue.value.length != 0){

      let identifier = new Identifier(0, inputName.value, inputValue.value);
      this.currentService.currentIdentifiers.push(identifier);

      inputName.value = null;
      inputValue.value = null;
    }else{
      alert(this.fillAllIdentifierField);
    }
  }

  // Remove identifier in current identifiers
  onRemoveIdentifier(index: number) {
    this.currentService.currentIdentifiers.splice(index, 1);
  }

  // Function for collect personal media data
  collectPersonalData(){
    if(this.currentMediaType == 'Audio'){
      this.audioSubscription = this.audioService.collectAudioPersonal(this.authService.auth.id).subscribe(
          (data: AudioPersonal[]) => {
            this.currentService.currentAudioPersonal = data,
                console.log(data)
          },
          error => console.log(error)
      )
    }else{
      this.videoSubscription = this.videoService.collectVideoPersonal(this.authService.auth.id).subscribe(
          (data: VideoPersonal[]) => {
            this.currentService.currentVideoPersonal = data,
                console.log(data)
          },
          error => console.log(error)
      )
    }
  }

  updateMedia(form: NgForm){

     let updatedMedia: UpdateMedia = form.value;
     updatedMedia['identifiers'] = this.currentService.currentIdentifiers;

     this.mediaService.updateMedia(updatedMedia).subscribe(
         (data: any) => {
           this.collectPersonalData(),
           this.currentService.currentMediaUpdateDate = data['date']
         },
         error => console.log(error)
     )
  }

  deleteImage(media_id: number, image_id: number){
    let deleteImageData = new DeleteImageData(this.currentMediaType, media_id, image_id);
    this.deleteImageSubscription = this.mediaService.deleteImage(deleteImageData).subscribe(
        (data: any) => {
          this.collectPersonalData(),
              this.currentService.deletedImagesId.push(image_id),
              this.currentService.currentMediaUpdateDate = data['date']
        },
        error => console.log(error)
    );
  }

  // Function for test is image ID in deleted image array
  isInDeletedImageArray(imageId: number) {
    if(this.deletedImagesId.indexOf(imageId) > -1){
      return true;
    }else{
      return false;
    }
  }

  // Function for set new featured image
  setNewFeaturedImage(media_id: number, image_id: number){
    let setNewFeaturedImage = new SetNewFeaturedImageData(this.currentMediaType, media_id, image_id);
    this.setNewFeaturedImageSubscription = this.mediaService.setNewFeaturedImage(setNewFeaturedImage).subscribe(
        (data: any) => {
          console.log(data),
              this.currentService.newFeaturedImageId = image_id,
              this.currentService.currentMediaUpdateDate = data['date']
        },
        error => console.log(error)
    );
  }

  setCurrentMedia(){

    let media = [];

    if(this.currentMediaType == 'Audio'){
      for(let audio of this.currentService.currentAudioPersonal){
        if(audio.id == this.currentService.currentAudioId){
          media['id'] = audio.id;
          media['user_id'] = audio.user_id;
          media['audio_category_id'] = audio.audio_category_id;
          media['condition_id'] = audio.condition_id;
          media['band'] = audio.band;
          media['album'] = audio.album;
          media['year'] = audio.year;
          media['description'] = audio.description;
          media['for_change'] = audio.for_change;
          media['allowed'] = audio.allowed;
          media['first_release_year'] = audio.first_release_year;
          media['personal_note'] = audio.personal_note;
          media['cat'] = audio.cat;
          media['label'] = audio.label;
          media['barcode_numbers'] = audio.barcode_numbers;
          media['created_at'] = audio.created_at;
          media['updated_at'] = audio.updated_at;
          media['images'] = audio.images;
          media['identifiers'] = audio.identifiers;
        }
      }
    }else{
      for(let video of this.currentService.currentVideoPersonal){
        if(video.id == this.currentService.currentVideoId){
          media['id'] = video.id;
          media['user_id'] = video.user_id;
          media['video_category_id'] = video.video_category_id;
          media['condition_id'] = video.condition_id;
          media['name'] = video.name;
          media['director'] = video.director;
          media['year'] = video.year;
          media['description'] = video.description;
          media['for_change'] = video.for_change;
          media['allowed'] = video.allowed;
          media['first_release_year'] = video.first_release_year;
          media['personal_note'] = video.personal_note;
          media['barcode_numbers'] = video.barcode_numbers;
          media['created_at'] = video.created_at;
          media['updated_at'] = video.updated_at;
          media['images'] = video.images;
          media['identifiers'] = video.identifiers;
        }
      }
    }
    this.currentService.currentMedia = media;
  }

  // Function for upload image
  fileUpload(event, media) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {

        let imagesData: FormData = new FormData();

        imagesData.append('newPhoto', fileList[0], fileList[0].name);

      this.uploadNewImageSubscription = this.mediaService.newMediaImages(this.currentMediaType, media.id, imagesData).
      subscribe(
          (data: any) => {
            console.log(data),
                this.collectPersonalData()
          },
          error => console.log(error)
      )
    }
  }

  // PART for update -> End

  ngOnDestroy(){
    if(this.deleteAudioSubscritpion != null){
      this.deleteAudioSubscritpion.unsubscribe();
    }
    if(this.deleteVideoSubscription != null){
      this.deleteVideoSubscription.unsubscribe();
    }
    if(this.audioSubscription != null){
      this.audioSubscription.unsubscribe();
    }
    if(this.videoSubscription != null){
      this.videoSubscription.unsubscribe();
    }
    if(this.deleteImageSubscription != null){
      this.deleteImageSubscription.unsubscribe();
    }
    if(this.setNewFeaturedImageSubscription != null){
      this.setNewFeaturedImageSubscription.unsubscribe();
    }
    if(this.uploadNewImageSubscription != null){
      this.uploadNewImageSubscription.unsubscribe();
    }

    this.currentService.currentMedia = [];
  }
}
