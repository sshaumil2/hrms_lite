module.exports = {
  apps: [
    {
      name: "hrms-backend",
      script: "/var/www/html/hrms_lite/venv/bin/gunicorn",
      args: "hrms_backend.wsgi:application --bind 0.0.0.0:3002 --workers 3",
      cwd: "/var/www/html/hrms_lite/hrms_backend",
      interpreter: "none",
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        DJANGO_SETTINGS_MODULE: "hrms_backend.settings",
        PYTHONUNBUFFERED: "1"
      }
    }
  ]
}
