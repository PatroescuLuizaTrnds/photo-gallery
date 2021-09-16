import { Component } from '@angular/core';
import { Photo, PhotoService } from '../services/photo.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public photoBuletin: PhotoService,
    public photoSelfie: PhotoService,
    public actionSheetController: ActionSheetController) {}

  async ngOnInit() {
    await this.photoBuletin.loadSaved(0);
    await this.photoSelfie.loadSaved(1);
  }
  addPhotoBToGallery() {
    this.photoBuletin.index = 0;
    this.photoBuletin.addNewToGallery();

  }
  addPhotoSToGallery() {
    this.photoSelfie.index = 1;
    this.photoSelfie.addNewToGallery();

  }

  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoBuletin.deletePicture(photo, position);
          this.photoSelfie.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }
}