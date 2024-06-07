import { UsuarioService } from './../../services/usuario.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const google:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {

 @ViewChild('googleBtn') googleBtn!: ElementRef;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}
  ngAfterViewInit(): void {
    this.googleInit();
  }
  ngOnInit(): void {
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "608547883073-m9dqdfphiblfgb06bkng7t97mhkhkc7c.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  };

  handleCredentialResponse( response: any){{
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential ).subscribe({
      next: resp =>{
        // console.log({login: resp});
        this.router.navigateByUrl('/');
      }
    })
  }

  }

  public formSubmitted = false;

  public loginForm: FormGroup = this.fb.group({
    email: [ localStorage.getItem('email') ||'', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  login() {
    console.log('login');

    this.usuarioService.login(this.loginForm.value).subscribe({
      next: (resp) => {
        console.log(resp);

        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        // Navegar al Dashhboard
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });

    // console.log(this.loginForm.value);

    // this.router.navigateByUrl('/dashboard');
  }
}
