import BaseConfig from './base'
import DevelopmentConfig from './development'
import ProductionConfig from './production'

let EnvConfig

if (__PRODUCTION__) EnvConfig = ProductionConfig
if (__DEVELOPMENT__) EnvConfig = DevelopmentConfig

export default Object.assign({}, BaseConfig, EnvConfig)
