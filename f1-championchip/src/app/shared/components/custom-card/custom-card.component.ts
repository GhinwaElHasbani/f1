import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { WikiService } from '../../services/wiki.service';
import { CustomCardModel } from './custom-card.model';

@Component({
  selector: 'f1-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.sass']
})
export class CustomCardComponent implements OnInit, OnChanges {
  @Input() cardData: CustomCardModel;
  @Output() titleClicked: EventEmitter<any> = new EventEmitter();
  @Output() imageClicked: EventEmitter<any> = new EventEmitter();
  @Output() cardClicked: EventEmitter<any> = new EventEmitter();

  constructor(private _wikiService: WikiService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cardData']) {
      if (this.cardData && !this.cardData.imageUrl && this.cardData.wikiImageName) {
        this.getImage(this.cardData);
      }
    }
  }

  /**
   * 
   * @param card 
   */
  getImage(card) {
    this._wikiService.getImageFromWiki(card, 'wikiImageName').subscribe(im => {
      this.cardData.imageUrl = im;
    });
  }

  /**
   * 
   * @param ev 
   */
  clickOnTitle(ev) {
    this.titleClicked.emit(ev);
  }

  /**
   * 
   * @param ev 
   */
  clickOnImage(ev) {
    this.imageClicked.emit(ev);
  }

  /**
   * 
   * @param ev 
   */
  clickOnCard(ev) {
    this.cardClicked.emit(ev);
  }

}
