import { DeviceDistributionClientPage } from './app.po';

describe('device-distribution-client App', () => {
  let page: DeviceDistributionClientPage;

  beforeEach(() => {
    page = new DeviceDistributionClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
