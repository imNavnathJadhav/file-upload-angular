import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import {
  IFileInfo
} from "../model/IFileInfo.model";

@Component({
  selector: 'file',
  templateUrl: 'file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent {
  @Input() file!: IFileInfo;

  @Output() downloadFile = new EventEmitter < IFileInfo > ();

  download(file: IFileInfo): void {
    this.downloadFile.emit(file);
  }
}
