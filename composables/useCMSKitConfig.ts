import config from '~/cms-kit.config'

export const useCMSKitConfig = () => {
  return {
    appName: config.appName || 'CMS Kit',
    ...config,
  }
}
