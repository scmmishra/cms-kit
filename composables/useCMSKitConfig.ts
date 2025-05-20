import config from '~/cms-kit.config'

// Export the types for collections and pages keys
export type CollectionKey = keyof typeof config.collections
export type PageKey = keyof typeof config.pages

export const useCMSKitConfig = () => {
  return {
    appName: config.appName || 'CMS Kit',
    ...config,
  }
}
