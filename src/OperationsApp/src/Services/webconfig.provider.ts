import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WebConfig {
    private settings: any;
    constructor(private http: HttpClient) { }
    public getSettings(): any {
        return this.settings;
    }
    public get(nameKey: string): any {
        let objKey: any;
        if (this.settings.hasOwnProperty(nameKey)) {
            objKey = this.settings[nameKey];
        }
        return objKey;
    }
    load() {
        const jsonFile = `./webConfig.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: any) => {
                this.settings = response as any;
                resolve();
            }).catch((response: any) => {
                reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
