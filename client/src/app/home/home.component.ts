import { Component } from '@angular/core';
import { FEATURES, LABELS } from '../constant'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = FEATURES
  labels = LABELS
  state = 'features'

  clickFeatures() {
    this.state = 'features'
  }

  clickLabels() {
    this.state = 'labels'
  }
}
