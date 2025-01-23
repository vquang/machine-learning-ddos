import { Component, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { COLUMNS_PREDICT, FEATURES, LABELS } from '../constant'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit{
  features = FEATURES
  labels = LABELS
  columns = COLUMNS_PREDICT

  page = 1
  limit = 10
  featureName = ''
  featureValue = ''
  label = ''
  totalItems = 0
  totalPages = 0

  data = []

  constructor(private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getResult();
  }

  search(): void {
    this.getResult();
    console.log(this.page);
    console.log(this.limit);
    console.log(this.featureName);
    console.log(this.featureValue);
    console.log(this.label);
    console.log(this.totalItems);
    console.log(this.totalPages);
  }

  chooseFeature(value:string): void {
    this.featureName = value;
  }

  chooseLabel(value:string): void {
    this.label = value;
  }

  next(): void {
    if(this.page + 1 < this.totalPages) {
      this.page = this.page + 1;
      this.getResult();
    }
  }

  prev(): void {
    if(this.page - 1 > 1) {
      this.page = this.page - 1;
      this.getResult();
    }
  }

  lastPage(): void {
    this.page = this.totalPages;
    if(this.page === 0) this.page = 1;
    this.getResult();
  }

  firstPage(): void {
    this.page = 1;
    this.getResult();
  }

  getResult(): void {
    const request = {
      "filepath":localStorage.getItem('mainFile'),
      "page":this.page,
      "limit":this.limit,
      "featureName":this.featureName,
      "featureValue":this.featureValue,
      "label":this.label
    }

    this.apiService.getResult(request).subscribe(
      response => {
        this.data = response['data']
        this.totalItems = response['totalItems']
        this.totalPages = response['totalPages']
        console.log('API Response:', response);
        // this.toastr.success('Thành Công', 'Kết Quả');
      },
      error => {
        console.error('API Error:', error);
        this.toastr.error('Thất Bại', 'Kết Quả');
      }
    );
  }
}
