module.exports = {
  apps: [{
    name: 'portal',
    script: './server.js',
    instances: 4,
    exec_mode: 'cluster',
    max_memory_restart: '250M',
    env: {
      NODE_ENV: 'development',
      API_PORT: 4200
    },
    env_production: {
      NODE_ENV: 'production',
      API_PORT: 80
    },
    time: true
  }, {
    name: 'cron-api',
    script: './jobs/cron-api.js',
    instances: 1,
    cron_restart: '0 */4 * * *',
    autorestart: false
  }]
};
