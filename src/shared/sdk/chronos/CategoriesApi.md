# .CategoriesApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCategory**](CategoriesApi.md#createCategory) | **POST** /categories | Create a new service category
[**getAllCategories**](CategoriesApi.md#getAllCategories) | **GET** /categories | Get all categories
[**getCategoriesWithServices**](CategoriesApi.md#getCategoriesWithServices) | **GET** /categories/with-services | Get all categories with their services
[**getUncategorizedServices**](CategoriesApi.md#getUncategorizedServices) | **GET** /categories/uncategorized | Get services without a category


# **createCategory**
> Category createCategory(newCategory)


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';
import type { CategoriesApiCreateCategoryRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request: CategoriesApiCreateCategoryRequest = {
  
  newCategory: {
    color: "color_example",
    description: "description_example",
    displayOrder: 1,
    isActive: true,
    name: "name_example",
    tenantId: 1,
  },
};

const data = await apiInstance.createCategory(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newCategory** | **NewCategory**|  |


### Return type

**Category**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Category created |  -  |
**409** | Category name already exists |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllCategories**
> Array<Category> getAllCategories()


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request = {};

const data = await apiInstance.getAllCategories(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<Category>**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Categories found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getCategoriesWithServices**
> Array<CategoryWithServices> getCategoriesWithServices()


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request = {};

const data = await apiInstance.getCategoriesWithServices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<CategoryWithServices>**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Categories with services found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUncategorizedServices**
> Array<Service> getUncategorizedServices()


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request = {};

const data = await apiInstance.getUncategorizedServices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<Service>**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Uncategorized services found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


