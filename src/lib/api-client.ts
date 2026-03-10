import {
  AvailabilityApi,
  BookingsApi,
  CategoriesApi,
  createConfiguration,
  HttpMethod,
  IsomorphicFetchHttpLibrary,
  RequestContext,
  ResponseContext,
  ServicesApi,
  TenantsApi,
  UsersApi,
  ServerConfiguration,
} from '@/shared/sdk/chronos'

// Get tenant ID from environment or cookie
export const getTenantId = (): string => {
  return process.env.NEXT_PUBLIC_TENANT_ID || '1'
}

// Get base URL from environment
export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
}

// Create the configuration with middleware
const createApiConfiguration = (tenantId?: string, customBasePath?: string) => {
  const baseUrl = customBasePath || getBaseUrl()
  const tid = tenantId || getTenantId()

  // Create the base server configuration
  const baseServer = {
    makeRequestContext: (endpoint: string, httpMethod: HttpMethod) => {
      const url = `${baseUrl}${endpoint}`
      const requestContext = new RequestContext(url, httpMethod)

      // Set headers directly on the request context
      requestContext.setHeaderParam('x-tenant-id', tid)
      requestContext.setHeaderParam('Content-Type', 'application/json')

      return requestContext
    },
  }

  return createConfiguration({
    baseServer,
    httpApi: new IsomorphicFetchHttpLibrary(),
    promiseMiddleware: [
      {
        pre(request: RequestContext): Promise<RequestContext> {
          // This is just for logging now, headers already set
          console.log(
            `🚀 API Request: ${request.getHttpMethod()} ${request.getUrl()}`,
          )
          console.log(`🔧 Headers:`, request.getHeaders())
          return Promise.resolve(request)
        },
        post(response: ResponseContext): Promise<ResponseContext> {
          console.log(`✅ API Response: ${response.httpStatusCode}`)
          return Promise.resolve(response)
        },
      },
    ],
  })
}

// Create a singleton configuration
const defaultConfig = createApiConfiguration()

// Export configured API instances
export const api = {
  categories: new CategoriesApi(defaultConfig),
  bookings: new BookingsApi(defaultConfig),
  availability: new AvailabilityApi(defaultConfig),
  services: new ServicesApi(defaultConfig),
  users: new UsersApi(defaultConfig),
  tenants: new TenantsApi(defaultConfig),
}

// For creating APIs with custom tenant ID
export const createTenantApi = (tenantId: string, customBasePath?: string) => {
  const config = createApiConfiguration(tenantId, customBasePath)
  return {
    categories: new CategoriesApi(config),
    bookings: new BookingsApi(config),
    availability: new AvailabilityApi(config),
    services: new ServicesApi(config),
    users: new UsersApi(config),
    tenants: new TenantsApi(config),
  }
}

// For server-side usage
export const createServerApi = (tenantId: string, basePath?: string) => {
  const baseUrl = basePath || getBaseUrl()

  const baseServer = {
    makeRequestContext: (endpoint: string, httpMethod: HttpMethod) => {
      const url = `${baseUrl}${endpoint}`
      const requestContext = new RequestContext(url, httpMethod)

      // Set headers directly
      requestContext.setHeaderParam('x-tenant-id', tenantId)
      requestContext.setHeaderParam('Content-Type', 'application/json')

      return requestContext
    },
  }

  const config = createConfiguration({
    baseServer,
    httpApi: new IsomorphicFetchHttpLibrary(),
    promiseMiddleware: [],
  })

  return {
    categories: new CategoriesApi(config),
    bookings: new BookingsApi(config),
    availability: new AvailabilityApi(config),
    services: new ServicesApi(config),
    users: new UsersApi(config),
    tenants: new TenantsApi(config),
  }
}
