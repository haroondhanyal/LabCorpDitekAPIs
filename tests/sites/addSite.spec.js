const { test, expect } = require('@playwright/test');
const { SitesAPI } = require('../../apis/sites/sites.api');
const TokenManager = require('../../utils/tokenManager');

test.describe('Sites API – Add Site', () => {
  let sitesAPI;

  test.beforeEach(async ({ request }) => {
    sitesAPI = new SitesAPI(
      request,
      process.env.BASE_URL,
      TokenManager.getToken()
    );
  });

  test('TC01: Add new site', async () => {
    const payload = {
      siteName: 'Automation Site',
      siteNumber: 9999,
      siteAddress: 'Test Address',
      siteCity: 'Lahore',
      siteState: 'Punjab',
      siteZipCode: '54000'
    };

    const res = await sitesAPI.addSite(payload);
    expect(res.status()).toBe(201);

    const body = await res.json();
    expect(body.message).toContain('Site created');
    expect(body.data.siteId).toBeTruthy();
  });
});