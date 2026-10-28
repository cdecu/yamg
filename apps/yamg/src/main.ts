import '@angular/material/prebuilt-themes/azure-blue.css';
import 'prismjs/themes/prism-okaidia.css';
import './styles.scss';

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
