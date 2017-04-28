import { ComponentFixture, inject, TestBed, async } from '@angular/core/testing';
import { By }                                from '@angular/platform-browser';
import { DebugElement }                      from '@angular/core';

import { UserService }      from './../../models';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let comp: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let componentUserService: UserService; // the actually injected service
  let userService: UserService; // the TestBed injected service
  let de: DebugElement;  // the DebugElement with the welcome message
  let el: HTMLElement; // the DOM element with the welcome message

  let userServiceStub: {
    isLoggedIn: boolean;
    user: { name: string}
  };

  

  // async beforeEach
  beforeEach(async(() => {
    // stub UserService for test purposes
    userServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User'}
    };

    TestBed.configureTestingModule({
       declarations: [ WelcomeComponent ],
    // providers:    [ UserService ]  // NO! Don't provide the real service!
                                      // Provide a test-double instead
       providers:    [ {provide: UserService, useValue: userServiceStub } ]
    });
    
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ], // declare the test component
    })
    .compileComponents();  // compile les templates et css
    // (!) Faites de compileComposents la dernière étape avant d'appeler TestBed.createComponent pour instancier le composant sous test.
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(WelcomeComponent);
    comp    = fixture.componentInstance;

    // UserService actually injected into the component
    userService = fixture.debugElement.injector.get(UserService);
    componentUserService = userService;
    // UserService from the root injector
    userService = TestBed.get(UserService);

    //  get the "welcome" element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.welcome'));
    el = de.nativeElement;
  });

    it('should welcome the user', () => {
      fixture.detectChanges();
      const content = el.textContent;
      expect(content).toContain('Welcome', '"Welcome ..."');
      expect(content).toContain('Test User', 'expected name');
    });

    it('should welcome "Bubba"', () => {
      userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
      fixture.detectChanges();
      expect(el.textContent).toContain('Bubba');
    });

    it('should request login if not logged in', () => {
      userService.isLoggedIn = false; // welcome message hasn't been shown yet
      fixture.detectChanges();
      const content = el.textContent;
      expect(content).not.toContain('Welcome', 'not welcomed');
      expect(content).toMatch(/log in/i, '"log in"');
    });
});