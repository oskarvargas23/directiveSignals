import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color( value:string ) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors( value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    // console.log(el);
    this.htmlElement = el;
  }

  ngOnInit(): void {
    // console.log('Directiva - NgOnInit')
    this.setStyle();
  }

  setStyle():void {
    if( !this.htmlElement ) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage():void {
    if(!this.htmlElement ) return;
    if(!this._errors ) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);

    let errorMessage:string = '';

    if ( errors.includes('required') ){
      errorMessage += 'El campo es requerido';
    }

    if ( errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      errorMessage += `Mínimo: ${current}/${min} caracteres, `;;
    }

    if ( errors.includes('email')) {
      errorMessage += 'el campo debe ser un correo válido';
    }

    this.htmlElement.nativeElement.innerText = errorMessage.trim();

    // if ( errors.includes('required') ){
    //   this.htmlElement.nativeElement.innerText = 'El campo es requerido';
    //   return;
    // }

    // if ( errors.includes('minlength')) {
    //   const min = this._errors!['minlength']['requiredLength'];
    //   const current = this._errors!['minlength']['actualLength'];

    //   this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${min} caracteres`;
    //   return;
    // }

    // if ( errors.includes('email')) {
    //   this.htmlElement.nativeElement.innerText = 'El campo debe ser un correo válido';
    //   return;
    // }


  }

}
