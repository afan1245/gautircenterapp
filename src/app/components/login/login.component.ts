import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onLoginClick() {
      this._router.navigate(['/dashboard'])
  }
}
