import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest
} from "@angular/common/http";
import {
  Injectable
} from "@angular/core";
import {
  Observable,
  of
} from "rxjs";
import {
  IFileInfo
} from "../model/IFileInfo.model";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = "http://localhost:8080/file";
  constructor(private http: HttpClient) {}

  public save(requestPayload: any): Observable < any > {
    return this.http.post(this.baseUrl, requestPayload);
  }

  public getAll(): Observable < IFileInfo[] > {
    return this.http.get < IFileInfo[] > (this.baseUrl);
  }

  getFileById(id: string): Observable<Blob> {
    return this.http.get(this.baseUrl + '/' + id, {
      responseType: 'blob'
    })
  }
}
