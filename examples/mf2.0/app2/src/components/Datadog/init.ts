import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';
import pkg from '../../../package.json';

if (process.env.NODE_ENV === 'production') {
  datadogRum.init({
    clientToken: process.env.PUBLIC_DD_RUM_CLIENT_TOKEN || '',
    site: 'datadoghq.com',
    service: pkg.name,
    env: process.env.NODE_ENV === 'production' ? 'prod' : process.env.NODE_ENV,
    applicationId: process.env.PUBLIC_DD_RUM_APP_ID || '',
    traceSampleRate: 100,
    sessionSampleRate: 100,
    telemetrySampleRate: 100,
    sessionReplaySampleRate: 100,
    telemetryUsageSampleRate: 100,
    defaultPrivacyLevel: 'mask-user-input',
    allowedTracingUrls: [/https:\/\/.*\.kw\.com/],
    trackResources: true,
    trackLongTasks: true,
    trackUserInteractions: true,
    silentMultipleInit: true,
    compressIntakeRequests: true,
    storeContextsAcrossPages: true,
    useSecureSessionCookie: true,
    enableExperimentalFeatures: [],
    usePartitionedCrossSiteSessionCookie: true,
    trackSessionAcrossSubdomains: true,
  });
  datadogRum.setGlobalContext({
    business_unit: 'command',
    product: pkg.name,
  });
  datadogRum.startSessionReplayRecording();
  datadogLogs.init({
    clientToken: process.env.PUBLIC_DD_RUM_CLIENT_TOKEN || '',
    site: 'datadoghq.com',
    service: pkg.name,
    env: process.env.NODE_ENV === 'production' ? 'prod' : process.env.NODE_ENV,
    forwardErrorsToLogs: true,
    sessionSampleRate: 100,
    telemetrySampleRate: 100,
    telemetryUsageSampleRate: 100,
    telemetryConfigurationSampleRate: 100,
    useSecureSessionCookie: true,
    usePartitionedCrossSiteSessionCookie: true,
    trackSessionAcrossSubdomains: true,
  });
  datadogLogs.setGlobalContext({
    business_unit: 'command',
    product: pkg.name,
  });
}

const { logger } = datadogLogs;
export { datadogRum, logger };
