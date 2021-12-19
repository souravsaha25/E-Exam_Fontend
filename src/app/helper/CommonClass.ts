import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class CommonClass {

  public loaderStart(text:string) {
    Swal.fire({
      title: 'Please Wait...',
      text: text,
      didOpen: () => {
        Swal.showLoading();
      },
    })
  }

  public loaderStop(){
    Swal.close();
  }
}
