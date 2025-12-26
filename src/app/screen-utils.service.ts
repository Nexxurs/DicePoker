import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenUtilsService {

  constructor() {
    this.calculateSmallScreen();
  }

  isSmallScreen: boolean = false

  onResize() {
    this.calculateSmallScreen()
  }

  private calculateSmallScreen() {
    this.isSmallScreen = window.innerWidth < 650
  }
}
