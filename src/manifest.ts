import { defineManifest } from '@crxjs/vite-plugin'
import { config } from './util/config'

export default defineManifest({
  name: 'Work Alert Extension',
  description:
    "Work Alert makes finding Upwork jobs easier. Don't spend hours searching, get notifications when jobs are posted.",
  version: '0.1.0',
  manifest_version: 3,
  icons: {
    '16': 'img/enacton.png',
    '32': 'img/enacton.png',
    '48': 'img/enacton.png',
    '128': 'img/enacton.png',
  },
  action: {
    default_title: 'Work Alert Extension',
    default_icon: 'img/enacton.png',
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/index.ts"]
    }
  ],
  web_accessible_resources: [
    {
      resources: ['src/styles/output.css'],
      matches: ['https://www.upwork.com/*'],
      use_dynamic_url: true,
    },
  ],
  permissions: ['tabs', 'storage', 'activeTab', 'alarms', 'notifications', 'identity'],
  host_permissions: ['https://*.upwork.com/*', 'https://*.openai.com/'],
  oauth2: {
    scopes: ['openid', 'email', 'profile'],
    client_id: config.OAuth2Token,
  },
})
