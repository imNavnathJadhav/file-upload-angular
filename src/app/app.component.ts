import {
  Component
} from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import {
  IFileInfo
} from './model/IFileInfo.model';
import {
  FileService
} from './service/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-application';
  selectedFile!: File;
  fileList$: Observable < IFileInfo[] > = of ([]);

  constructor(private fileService: FileService) {
    this.fileList$ = fileService.getAll();
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target && event.target.files.length ? event.target.files[0] : null;
  }

  changeFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  uploadFile(): void {
    let formData = new FormData();
    formData.append('file', this.selectedFile);
    this.fileService.save(formData).subscribe(r => {
      this.fileList$ = this.fileService.getAll();
    });
  }

  download(file: IFileInfo){
    this.fileService.getFileById(file.id).subscribe(blob => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = file.fileName;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
