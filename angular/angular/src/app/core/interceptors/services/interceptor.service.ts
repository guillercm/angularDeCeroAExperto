import { ErrorInterceptorData } from '../interfaces/error-interceptor-data.interface';
import { Injectable, computed, inject, signal } from '@angular/core';
import { JsonHandlerService } from '@core/services/json-handler/json-handler.service';
import { LoaderInterceptorData } from '../interfaces/loader-interceptor-data.interface';
import { TimeoutInterceptorData } from '../interfaces/timeout-interceptor-data.interface';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  private readonly _jsonHandler = inject(JsonHandlerService);

  public httpErrorData = signal<ErrorInterceptorData|null>(null);

  public timeoutErrorData = signal<TimeoutInterceptorData|null>(null);

  private _loaderData = signal<LoaderInterceptorData[]>([]);

  public readonly loaderData = this._loaderData.asReadonly();

  public readonly isLoadingSomeHttpRequest = computed( () => this.loaderData().length > 0 )


  public addRequestLoader(loaderInterceptorData: LoaderInterceptorData) {
    this._loaderData.update((value: LoaderInterceptorData[]) => {
      return [...value, loaderInterceptorData];
    })
  }

  public removeRequestLoader(loaderInterceptorData: LoaderInterceptorData) {
    this._loaderData.set(this._loaderData().filter(item => !this.loaderDataEquals(item, loaderInterceptorData)));
  }

  private loaderDataEquals(loaderInterceptorData1: LoaderInterceptorData, loaderInterceptorData2: LoaderInterceptorData): boolean {
    return this.Equals(loaderInterceptorData1, loaderInterceptorData2);
  }

  private Equals(data: LoaderInterceptorData, data2: LoaderInterceptorData): boolean {
    const { req: req1 } = data;
    const { req: req2 } = data2;
    const isEqual = this.isEqual;
    return isEqual(req1.url, req2.url) &&
           isEqual(req1.method, req2.method) &&
           isEqual(req1.headers, req2.headers) &&
           isEqual(req1.body, req2.body) &&
           isEqual(req1.params, req2.params) &&
           isEqual(req1.responseType, req2.responseType) &&
           isEqual(req1.withCredentials, req2.withCredentials);
  }

  private isEqual(obj: any, obj2: any) {
    return obj === obj2;
  }

}
