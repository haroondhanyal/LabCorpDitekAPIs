// tests/sites/getSites.spec.js
const { test, expect } = require('@playwright/test');
const { SitesAPI } = require('../../apis/sites/sites.api');
const TokenManager = require('../../utils/tokenManager');

test.describe('Sites API – Get Sites', () => {
  let sitesAPI;

  test.beforeEach(async ({ request }) => {
    const token = TokenManager.getToken();
    expect(token, 'Bearer token should exist').toBeTruthy();

    sitesAPI = new SitesAPI(request, process.env.BASE_URL);
  });

  test('TC01: Get all sites - 200 OK', async () => {
    const res = await sitesAPI.getSites();
    expect(res.status()).toBe(200);
  });

  test('TC02: Get sites without token - 401', async ({ request }) => {
    const res = await request.get(`${process.env.BASE_URL}/sites`);
    expect(res.status()).toBe(401);
  });
});