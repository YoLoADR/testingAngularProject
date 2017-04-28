import { TestingAngularComponentsPage } from './app.po';

describe('testing-angular-components App', () => {
  let page: TestingAngularComponentsPage;

  beforeEach(() => {
    page = new TestingAngularComponentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
