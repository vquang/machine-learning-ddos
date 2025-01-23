import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrl: './predict.component.css'
})
export class PredictComponent {
  files = []

  selectedFile: string = ''

  constructor(private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  selectFile(file: string = '') {
    this.selectedFile = file
  }

  predict():void {
    this.apiService.predict(this.selectedFile).subscribe(
      response => {
        console.log('Prediction response:', response);
        this.toastr.success('Thành Công', 'Kết Quả');
        localStorage.setItem('mainFile', this.selectedFile)
      },
      error => {
        console.error('Error calling API:', error);
        this.toastr.error('Thất Bại', 'Kết Quả');
      }
    );
  }

  loadFiles():void {
    localStorage.removeItem('mainFile');
    this.apiService.getFiles().subscribe(
      (response) => {
        this.files = response.files;
        console.log('API Response:', response);
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }


}
