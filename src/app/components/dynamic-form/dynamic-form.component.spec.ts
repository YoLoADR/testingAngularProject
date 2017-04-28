import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async(() => {
    // configureTestingModule : Test les classes du module formulaire, les méthodes et les attributs de ReactiveFormsModule , nous l'importons dans la configuration de notre module de test.
    TestBed.configureTestingModule({
      declarations: [ DynamicFormComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // createComponent : Test la création du component
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // "it" prend deux paramètre : 
  // - Le premier est une description de ce qu'on va tester - dans ce cas, nous avons un composant défini. 
  // - Le second est une fonction qui exécute le test.
  
  /* -------------------------
   it('should create', () => {
    expect(component).toBeTruthy();
  });

  // DynamicFormComponent.formGroup est bien une instance de FormGroup
  it('should create a `FormGroup` comprised of `FormControl`s', () => {
        
        component.ngOnInit();
        expect(component.formGroup instanceof FormGroup).toBe(true);
    });

    it('should create a `FormControl` for each question', () => {
        component.questions = [
            {
                controlType: 'text',
                id: 'first',
                label: 'My First',
                required: false
            },
            {
                controlType: 'text',
                id: 'second',
                label: 'Second!',
                required: true
            }
        ];
        component.ngOnInit();

        expect(Object.keys(component.formGroup.controls)).toEqual([
            'first', 'second'
        ]);
    });

    ----------- */
});
