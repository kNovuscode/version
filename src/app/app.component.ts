import { Component } from '@angular/core';
import { version } from "../environments/version";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'version';
  appVersion = version;
}
