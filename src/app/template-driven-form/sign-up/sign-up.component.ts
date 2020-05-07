import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  pageTitle: string = 'Sign Up!';
  user = new User();

  constructor() {}

  ngOnInit(): void {}

  save(userForm: NgForm) {
    console.log(userForm.form);
    console.log('Saved: ' + JSON.stringify(userForm.value));
  }
}
