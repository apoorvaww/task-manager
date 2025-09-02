const actionCodeSettings = {
    url: 'http://localhost:3000/verify-email',
    handleCodeInApp: true,
    iOS: {
        bundleId: 'com.example.ios'
    },
    android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
    },
    linkDomain: 'custom-domain.com'
};