import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'Work Alert Extension',
  description:
    "Work Alert makes finding Upwork jobs easier. Don't spend hours searching, get notifications when jobs are posted.",
  version: '0.1.0',
  manifest_version: 3,
  icons: {
    '16': 'img/logo-16.png',
    '32': 'img/logo-34.png',
    '48': 'img/logo-48.png',
    '128': 'img/logo-128.png',
  },
  action: {
    default_title: 'Work Alert Extension',
    default_icon: 'img/logo-48.png',
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/content/index.ts'],
    },
  ],
  web_accessible_resources: [],
  permissions: ['tabs', 'storage', 'activeTab', 'alarms', 'notifications'],
})
