import { MediaPage } from './app.po';

describe('media App', function() {
  let page: MediaPage;

  beforeEach(() => {
    page = new MediaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
