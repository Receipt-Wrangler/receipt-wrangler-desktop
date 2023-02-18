import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeatureConfigService {
  constructor(private httpClient: HttpClient) {}

  public GetFeatureConfig(): Observable<any> {
    return this.httpClient.get<any>('/api/featureConfig');
  }
}