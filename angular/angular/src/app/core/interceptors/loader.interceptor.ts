import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { InterceptorService } from "./services/interceptor.service";


export function loaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const interceptorService = inject(InterceptorService);
  const context = interceptorService.getContextFromRequest(req);
  interceptorService.addOrUdpateHttpRequest(
    {
      state: 'loading', req, context,
    }
  )
  return next(req).pipe(finalize(() => interceptorService.addOrUdpateHttpRequest(
    {
      state: 'complete', req, context,
    }
  ))
  );
}
