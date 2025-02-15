import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: [ './loader-spinner.component.scss' ]
})

export class LoaderSpinnerComponent {
  @Input() size= 100;
  @Input() borderWidth = 3;
  @Input() color: 'black' | 'white' = 'black';
}
