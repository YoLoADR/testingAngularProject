import { ComponentFixture, fakeAsync, inject, TestBed, async, tick } from '@angular/core/testing';
import { By }                                from '@angular/platform-browser';
import { DebugElement }                      from '@angular/core';

import { CitationsService }      from './../../service/citations.service';

import { CitationsComponent } from './citations.component';

describe('CitationsComponent', () => {
  let component: CitationsComponent;
  let fixture: ComponentFixture<CitationsComponent>;
  let spy: jasmine.Spy;
  let componentCitationsService: CitationsService; // the actually injected service
  let citationsService: CitationsService; // the TestBed injected service
  let de: DebugElement;  // the DebugElement with the welcome message
  let el: HTMLElement; // the DOM element with the welcome message

  const testCitation = 'Test Citation'; // #1 Une data Fake parce que SPY contourne la méthode getData réelle et ne contacte donc pas le serveur.
  let citationsServiceStub :[string];

  beforeEach(async(() => {

    citationsServiceStub = ['Test Citation']; // fake resultat d'une promesse

    TestBed.configureTestingModule({
       declarations: [ CitationsComponent ], // Déclaration du component 
       providers:    [ CitationsService ] // Déclaration du service qu'on contournera plus tard grace à un espion
    }).compileComponents();

    fixture = TestBed.createComponent(CitationsComponent);
    component = fixture.componentInstance;

    // CitationsService actually injected into the component
    citationsService = fixture.debugElement.injector.get(CitationsService);

    // Setup spy on the `getData` method 
    // Install un espion sur la méthode 'getData'
    spy = spyOn(citationsService, 'getData')
          .and.returnValue(Promise.resolve(testCitation));// Une data (testCitation) Fake parce que SPY contourne la méthode getData réelle et ne contacte donc pas le serveur.

    //  get the "welcome" element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.citation'));
    el = de.nativeElement;
  }));

  it('Le component en question est bien créé', () => {
    expect(component).toBeTruthy();
  });

  it('Ne devrait pas montrer de data avant OnInit', () => {
    expect(el.textContent).toBe('', 'nothing displayed');
    expect(spy.calls.any()).toBe(false, 'getData not yet called');
  });

  it('Ne doit toujours pas afficher de data après la mise en service du composant', () => {
    fixture.detectChanges();
    // getData service est async => N'a toujours pas retourner de data
     expect(el.textContent).toBe('...', 'pas encore de data recuperer, donc citation est toujours égale à ...');
     expect(spy.calls.any()).toBe(true, 'getData called');
  });

  it('Devrait montrer une data après la promesse getData (async)', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => { // attend async getData - Pour reprendre les tests après avoir terminé une activité asynchrone ou une détection de changement asynchrone
      fixture.detectChanges();        // mise à jour de la vue avec les données
      expect(el.textContent).toBe(testCitation);
    });
  }));

  it('Devrait montrer une data après la promesse de getData (fakeAsync & tick)', fakeAsync(() => { 
    // La fonction fakeAsync est un autre outil de test Angular.
    // Comme Async, il prend une fonction sans paramètre et renvoie une fonction qui devient l'argument de l'appel Jasmine it. Le principal avantage de fakeAsync sur async est que le test semble être synchrone. Il n'a pas de then(...) qui perturbe le flux.

    fixture.detectChanges();
    tick();                  // wait for async getData -  Remplace fixture.whenStable().then() - Simule le passage du temps jusqu'à fin de toutes les activités asynchrones en cours, y compris la résolution de la promesse getData dans ce cas de test. Il ne renvoie rien. Il n'y a aucune promesse d'attendre.

    fixture.detectChanges(); // update view with quote
    expect(el.textContent).toBe(testCitation);
  }));

  it('should show quote after getData promise (done)', (done: any) => {
    fixture.detectChanges();

    // get the spy promise and wait for it to resolve
    // récupère la promesse de spy (fake) et attend qu'elle soit résolue
    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges(); // mis à jour de la vue avec une data
      expect(el.textContent).toBe(testCitation);
      done();
    });
  });
});
