export const environment = {
    name: 'dev',
    appInsights: {
        instrumentationKey: '<dev-guid-here>'
     },
    logging: {
        console: true,
        appInsights: false
    },
    connection: {
        requireAuth: true,
        tenant: '<dev-guid-here>',
        clientId: '<dev-guid-here>'
    },
    apiServer: {
        metadata: 'https://metadata.demo.com/api/v1.0/',
        rules: 'https://rules.demo.com/api/v1.0/',
        authAPI: 'http://localhost:3000'
    },
    debug: true
};
