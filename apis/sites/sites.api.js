const TokenManager = require('../../utils/tokenManager');

class SitesAPI {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
  }

  headers() {
    const token = TokenManager.getToken();

    if (!token) {
      throw new Error('❌ Token not found. Login first.');
    }

    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  addSite(payload) {
    return this.request.post(`${this.baseURL}/sites`, {
      headers: this.headers(),
      data: payload
    });
  }

  updateSite(siteId, payload) {
    return this.request.put(`${this.baseURL}/sites/${siteId}`, {
      headers: this.headers(),
      data: payload
    });
  }

  getSites() {
    return this.request.get(`${this.baseURL}/sites`, {
      headers: this.headers()
    });
  }

  getSiteById(siteId) {
    return this.request.get(`${this.baseURL}/sites/${siteId}`, {
      headers: this.headers()
    });
  }
}

module.exports = { SitesAPI };