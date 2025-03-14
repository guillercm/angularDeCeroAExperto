import { HttpStatusCode } from "@angular/common/http";

export interface DataHttpContext {
  id?: string;
  showGlobalLoader?: boolean;
  showGlobalModalTimeout?: boolean;
  skipApiKey?: boolean;
  enableGlobalErrorModal?: boolean | {
    onlyForStatusCodes?: HttpStatusCode[],
    excludeStatusCodes?: HttpStatusCode[]
  };
}
