import { Injectable } from '@angular/core';
import * as contentstack from '@contentstack/delivery-sdk';
import { Region, QueryOperation } from "@contentstack/delivery-sdk"
import { Observable, from } from 'rxjs';
import type { Page } from '../../../types'
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { environment } from '../../environments/environment';
import { IStackSdk } from '@contentstack/live-preview-utils';

type Stack = ReturnType<typeof contentstack.default.stack>;

@Injectable({
  providedIn: 'root'
})

export class ContentstackService {
  private stack: Stack;

  constructor() {
    const { contentstack: config } = environment;

    this.stack = contentstack.default.stack({
      apiKey: config.apiKey,
      deliveryToken: config.deliveryToken,
      environment: config.environment,
      region: config.region === 'EU' ? Region.EU : Region.US,
      live_preview: {
        enable: true,
        preview_token: config.previewToken,
        host: config.region === 'EU' ? 'eu-rest-preview.contentstack.com' : 'rest-preview.contentstack.com',
      }
    })

    if (config.preview) {
      ContentstackLivePreview.init({
        ssr: false,
        enable: true,
        mode: "builder",
        stackSdk: (this.stack as Stack).config as IStackSdk,
        stackDetails: {
          apiKey: config.apiKey,
          environment: config.environment,
          branch: 'main'
        },
        clientUrlParams: {
          host: config.region === "EU" ? "eu-app.contentstack.com" : "app.contentstack.com",
        },
        editButton: {
          enable: true,
        }
      });
    }
  }

  getEntryByUrl(contentType: string, url: string): Observable<any> {
    const { contentstack: config } = environment;

    return from(
      this.stack
        .contentType(contentType)
        .entry()
        .query()
        .where("url", QueryOperation.EQUALS, url)
        .find<Page>()
        .then((result: any) => {
          if (config.preview) {
            contentstack.default.Utils.addEditableTags(result.entries[0], contentType, true);
          }

          return result.entries[0]
        })
    );
  }
}