# E-commerce Project

The project is a simple e-commerce backend written in typescript and powered by nodejs. Clean Architecture has been used throughout the project. The architecture is fully monolithic but designed in a way which can be easily broken into microservices. This project is structured in 5 major modules including 

 - **Entities**
 - **DataSource**
 - **UseCases**
 - **Controllers**
 - **Routes**

 which will be explained in the following.


# Technologies Used

**Express** is used as the primary framework and **Postgres** as database. Either of them are implemented pretty straightforward and nothing fancy is happening.

# Modules

Project modules are briefly explained here (Refer to **API Reference** section for API specifications):

## Entities

Entities modules contains data **objects** that present project's data structure. They are simple typescript classes containing related properties. Application logic can be defined in getter and setter methods so that when an object is being created all the properties are automatically validated on the go.

## Datasource

Datasource is where we store and access data. The module is loosely coupled with the rest of application using **Repo** interface. **Repo** interface contains a set of CRUD methods and makes the app flexible in terms of Datasource. For now the modules is filled with Postgres queries but can be promptly replaced with any other database.

## Use Cases

Our business logic resides here. There are four major classes including **Admin, User, Store and Order** usecases that define the business logic related to the specified field. **Usecases** are dependent on **Repo** interface for data access.

## Controllers

Controllers parse Response and Request objects comming from the web framework and abstract away the logic implemented in Usecases.
There is a controller method for each route.

## Routes

Express routers are defined in this module. Routes are categorized in distinct routers. A callback function is used to parse Response and Request and link **Express framework**  with our **Controllers**.


# Authentication

We've used **JSON Web Tokens** for authentication which is specified in the **authorization** header.
A compact middleware is implemented for authenticating request.

# API Reference

There are four categories of routes, Each is demonstrated in detail:

## Admin
routes reserved for admins. accessible only by admins.
### /admin/login
**method**: **POST**
**headers**: 

    {
	    content-type: application/json
    }

**body** : 

    {
		  "admin": {
	          "username": "admin",
	          "password": "admin"
		  }
    }
**Response**: 

    {
	    "token" : "token" // jwt token
    }

### /admin/signup
**method**: **POST**
**headers**: 

    {
	    content-type: application/json
    }

**body** : 

    {
		  "admin": {
	          "username": "admin",
	          "password": "admin"
		  }
    }
**Response**: 

    {
	    "token" : "token" // jwt token
    }

### /admin/products
**Purpose**: Adding new products
**Method**: **POST**
**headers**: 

    {
	    content-type: application/json
	    authorization: "token"  // jwt token required
    }

**body** : 

    {
		"product": {
			"name": "Good one",
			"description": "very very good one",
			"category": 1,
			"price": 1000000
		}
	}
**Response**: 

    {
	    "id": "12" //added product id
    }

### /admin/products
**Purpose**: Updating existing products
**Method**: **PUT**
**headers**: 

    {
	    content-type: application/json
	    authorization: "token"  // jwt token required
    }

**body** : 

    {
		"product": {
			"id": 1,                      // updated product id (should be specified)
			"name": "updated Good one",   // include properties you want to change
			"price": 1000000
		}
	}
**Response**: 

    {
	    "id": "1" //updated product id
    }

### /admin/users
**Purpose**: updating existing users
**Method**: **POST**
**headers**: 

    {
	    content-type: application/json
	    authorization: "token"  // jwt token required
    }

**body** : 

    {
		"user": {
			"id": 1,               // updated user id
			"username": "user",    // properties you want to change
			"address": "address"
		}
	}
**Response**: 

    {
	    "id": "1" //updated user id
    }

### /admin/users
**Purpose**: deleting existing users
**Method**: **DELETE**
**headers**: 

    {
	    content-type: application/json
	    authorization: "token"  // jwt token required
    }

**body** : 

    {
		"user": {
			"id": 1,                 // deleted user id
			"username"?: "username"  // username can be used instead of id
		}
	}
**Response**: 

    {
	    "id": "1" //deleted user id
    }

### /admin/products
**Purpose**: deleting existing products
**Method**: **DELETE**
**headers**: 

    {
	    content-type: application/json
	    authorization: "token"  // jwt token required
    }

**body** : 

    {
		"product": {
			"id": 92   // deleted product id
		}
	}
**Response**: 

    {
	    "id": "1" //deleted product id
    }
## User
user related routes.
### /user/signup
**method**: **POST**
**headers**: 

    {
	    content-type: application/json
    }

**body** : 

    {
		  "user": {
	          "username": "admin",
	          "password": "admin",
	          "address": "address"
		  }
    }
**Response**: 

    {
	    "token" : "token" // jwt token
    }

### /user/login
**method**: **POST**
**headers**: 

    {
	    content-type: application/json
    }

**body** : 

    {
		  "user": {
	          "username": "admin",
	          "password": "admin"
		  }
    }
**Response**: 

    {
	    "token" : "token" // jwt token
    }

### /user
**method**: **GET**
**headers**: 

    {
	    content-type: application/json,
	    authorization: "token"
    }

**body** : 
	No input is required. User info is retrieved based on the authentication token provided.
	
**Response**: 

    {
	    "user": {
		    "username": "username"
		    "address": "address"
	    }
    }

### /user
**Purpose**: deletes the authorized user.
**method**: **DELETE**
**headers**: 

    {
	    content-type: application/json,
	    authorization: "token"
    }

**body** : 
No input is required. the authenticated user will be deleted.

**Response**: 

    {
	    "id" : "1" // deleted user id
    }
## Shop
public routes for retrieving products information.
### /shop
**Purpose**: retrieves all products in the database.
**method**: **GET**
**headers**: 

    {
	    content-type: application/json
    }

**body** :
No body required.

**Response**: 

    {
	    "products": [
			  {
				  "id": 1,
				  "name": "product1",
				  "description": "good product",
				  "category": "general",
				  "addedBy": {
					  "id": 1,
					  "username": "admin"
				  },
				  "price": 1000000
			  },
			  {
				  "id": 2,
				  "name": "product2",
				  "description": "bad product",
				  "category": "general",
				  "addedBy": {
					  "id": 2,
					  "username": "admin"
				  },
				  "price": 2000000
			  }
	    ]
    }

### /shop/:product_id
**Purpose**: retrieves one product from the database.
**method**: **GET**
**headers**: 

    {
	    content-type: application/json
    }

**body** :
No body required.

**Response**: 

    {
	    "product": {
			"id": 1,
			"name": "product1",
			"description": "good product",
			"category": "general",
			"addedBy": {
			"id": 1,
			"username": "admin"
			},
			"price": 1000000
		}
    }
## Order 
Order related routes.

### /order
**Purpose**: Retrieves list of user's orders.
**method**: **GET**
**headers** :

    {
    
    }

**body**:
No body required.

**Response**:

    [
	    {
	        "order": {
	            "id": "108",
	            "user": {
	                "id": "204",
	                "username": "username",
	                "address": "address"
	            },
	            "total": "60000",
	            "paymentId": "394580987"
	        },
	        "orderItems": [
	            {
	                "id": "5",
	                "order": {
	                    "id": "108"
	                },
	                "product": {
	                    "id": "5",
	                    "name": "name",
	                    "description": "desc",
	                    "category": "general",
	                    "addedBy": "1",       // admin id
	                    "price": "20000"
	                },
	                "amount": 2
	            },
	            {
	                "id": "4",
	                "order": {
	                    "id": "108"
	                },
	                "product": {
	                    "id": "4",
	                    "name": "Updated dick",
	                    "description": "test",
	                    "category": "1",
	                    "addedBy": "1",  // admin id
	                    "price": "20000"
	                },
	                "amount": 1
	            }
	        ]
	    }
	]

# Notes
Project's code could be cleaned and optimized further more. Data Flow in particular.

