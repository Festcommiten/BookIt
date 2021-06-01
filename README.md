# BookIt

- [CRUD](#API-Data-Structure)
    - [New-Booking](#New-Booking)
    - [Remove-booking](#Remove-booking)
    - [Read](##Read)
        - [Read all bookings from backend](#Read-all-bookings-from-backend)
        - [Read bookings for specifik week](#Read-bookings-for-week-from-backend)
        - [Read bookings for specifik room](#Read-bookings-for-room-from-backend)
        - [Read bookings for specifik week and room](#Read-bookings-for-room-and-week-from-backend)
        - [Read user data from backend](#Read-user-data-from-backend)
- [Git-Policy](#Git-Policy)
# API-Data-Structure

### **New-Booking**

#### Request

HTTP Method: `PUT`  
url: current_version + `/new_booking/<int:id>`

```json
{
  "room": "room1",
  "week": 19,
  "booking-company": "Company1",
  "booker": "user1",
  "start_time": "date string",
  "end_time": "date string"
}
```

#### Response

Success:

```json
{
  "status": 200,
  "message": "OK"
}
```

Bad request:

```json
{
  "status": 400,
  "message": "Bad Request"
}
```

### **Remove-booking**

#### Request

HTTP Method: `PUT`  
API url: current_version + `/remove/<int:id>`

#### Response

Success:

```json
{
  "status": 200,
  "message": "OK"
}
```

Bad request:

```json
{
  "status": 400,
  "message": "Bad Request"
}
```

##Read
### **Read-all-bookings-from-backend**

#### Request

HTTP Method: `GET`  
API url: current_version + `/bookings/`

#### Response

Success:

```json
{
  "bookings": [
    {
        "_id": 202105170901,
        "room": "Ada",
        "week": 22,
        "booking-company": "Codic Education",
        "booker": "Robin Kamo",
        "start_time": "2021-05-17T09:00:00+02:00",
        "end_time": "2021-05-17T10:00:00+02:00"
    },
    {
        "_id": 202105171002,
        "room": "Rust",
        "week": 23,
        "booking-company": "Codic Education",
        "booker": "Robin Kamo",
        "start_time": "2021-05-17T10:00:00+02:00",
        "end_time": "2021-05-17T11:00:00+02:00"
    },
    {
        "_id": 202105171105,
        "room": "Kakashi",
        "week": 24,
        "booking-company": "Codic Education",
        "booker": "Robin Kamo",
        "start_time": "2021-05-17T11:00:00+02:00",
        "end_time": "2021-05-17T12:00:00+02:00"
    }
  ],
  "status": 200,
  "message": "OK"
}
```

Bad request:

```json
{
  "status": 400,
  "message": "Bad Request"
}
```
### **Read-all-bookings-for-week-from-backend**
#### Request 

HTTP Method: `GET`  
API url: current_version + `/bookings/<int:week>`

#### Response

Success:

```json
{
  "bookings": [
    {
        "_id": 202105170901,
        "room": "Ada",
        "week": 22,
        "booking-company": "Codic Education",
        "booker": "Robin Kamo",
        "start_time": "2021-05-17T09:00:00+02:00",
        "end_time": "2021-05-17T10:00:00+02:00"
    },
    {
        "_id": 202105171002,
        "room": "Rust",
        "week": 22,
        "booking-company": "Codic Education",
        "booker": "Robin Kamo",
        "start_time": "2021-05-17T10:00:00+02:00",
        "end_time": "2021-05-17T11:00:00+02:00"
    },
    {
        "_id": 202105171105,
        "room": "Kakashi",
        "week": 22,
        "booking-company": "Codic Education",
        "booker": "Robin Kamo",
        "start_time": "2021-05-17T11:00:00+02:00",
        "end_time": "2021-05-17T12:00:00+02:00"
    }
  ],
  "status": 200,
  "message": "OK"
}
```

Bad request:

```json
{
  "status": 400,
  "message": "Bad Request"
}
```
### **Read-all-bookings-for-room-from-backend**
#### Request All Bookings for Room

HTTP Method: `GET`  
API url: current_version + `/bookings/<string:room_name>`

#### Response

Success:

```json
{
  "bookings": [
    {
        "_id": 202105170901,
        "room": "Ada",
        "week": 22,
        "booking-company": "Codic Education",
        "booker": "Robin Kamo",
        "start_time": "2021-05-17T09:00:00+02:00",
        "end_time": "2021-05-17T10:00:00+02:00"
    },
    {
        "_id": 202105171002,
        "room": "Ada",
        "week": 23,
        "booking-company": "Codic Education",
        "booker": "Robin Kamo",
        "start_time": "2021-05-17T10:00:00+02:00",
        "end_time": "2021-05-17T11:00:00+02:00"
    },
    {
        "_id": 202105171105,
        "room": "Ada",
        "week": 24,
        "booking-company": "Codic Education",
        "booker": "Robin Kamo",
        "start_time": "2021-05-17T11:00:00+02:00",
        "end_time": "2021-05-17T12:00:00+02:00"
    }
  ],
  "status": 200,
  "message": "OK"
}
```

Bad request:

```json
{
  "status": 400,
  "message": "Bad Request"
}
```
### **Read-all-bookings-for-week-and-room-from-backend**
#### Request

HTTP Method: `GET`  
API url: current_version + `/bookings/<int:week>/<string:room>`

#### Response

Success:

```json
{
  "bookings": [
    {
        "_id": 202106010906,
        "room": "Obito",
        "week": 22,
        "booking-company": "Codic Education",
        "booker": "Robin Kamo",
        "start_time": "2021-06-01:09T00:00+02:00",
        "end_time": "2021-06-01:10T00:00+02:00"
    },
    {
        "_id": 202106021006,
        "room": "Obito",
        "week": 22,
        "booking-company": "Codic Education",
        "booker": "Robin Kamo",
        "start_time": "2021-06-02:10T00:00+02:00",
        "end_time": "2021-06-02:11T00:00+02:00"
    },
    {
        "_id": 202106031106,
        "room": "Obito",
        "week": 22,
        "booking-company": "Codic Education",
        "booker": "Robin Kamo",
        "start_time": "2021-06-03T11:00:00+02:00",
        "end_time": "2021-06-03T12:00:00+02:00"
    }
  ],
  "status": 200,
  "message": "OK"
}
```

Bad request:

```json
{
  "status": 400,
  "message": "Bad Request"
}
```




### **Read-User-info**

#### Request

HTTP Method: `GET`  
API url: current_version + `/users`

#### Response

Success:

```json
{
  "Vipetech": 
            [
                {
                    "_id": 1,
                    "first_name": "Michel",
                    "last_name": "A",
                    "email": "",
                    "phone": ""
                },
                {
                    "_id": 2,
                    "first_name": "Behrouz",
                    "last_name": "K",
                    "email": "",
                    "phone": ""
                }
            ],
  "GOMO GROUP": 
            [
                {
                    "_id": 3,
                    "first_name": "Gabriel",
                    "last_name": "G",
                    "email": "",
                    "phone": ""
                },
                {
                    "_id": 4,
                    "first_name": "Reza",
                    "last_name": "G",
                    "email": "",
                    "phone": ""
                }
            ],
  "CC": 
            [
                {
                    "_id": 5,
                    "first_name": "Andrew",
                    "last_name": "",
                    "email": "",
                    "phone": ""
                },
                {
                    "_id": 6,
                    "first_name": "Malin",
                    "last_name": "",
                    "email": "",
                    "phone": ""
                }
            ],
  "CE": 
            [
                {
                    "_id": 7,
                    "first_name": "Robin",
                    "last_name": "",
                    "email": "",
                    "phone": ""
                },
                {
                    "_id": 8,
                    "first_name": "Maria",
                    "last_name": "",
                    "email": "",
                    "phone": ""
                }
            ],
  "SWS": 
            [
                {
                    "_id": 9,
                    "first_name": "Caroline",
                    "last_name": "A",
                    "email": "",
                    "phone": ""
                },
                {
                    "_id": 10,
                    "first_name": "Rickard",
                    "last_name": "",
                    "email": "",
                    "phone": ""
                }
            ],
  "Lön/Admin": 
            [
                {
                    "_id": 11,
                    "first_name": "Elias",
                    "last_name": "",
                    "email": "",
                    "phone": ""
                },
                {
                    "_id": 12,
                    "first_name": "Jonathan",
                    "last_name": "K",
                    "email": "",
                    "phone": ""
                }
            ],
  "Futureskill": 
            [
                {
                    "_id": 13,
                    "first_name": "Carl",
                    "last_name": "A",
                    "email": "",
                    "phone": ""
                },
                {
                    "_id": 14,
                    "first_name": "Zebastian",
                    "last_name": "",
                    "email": "",
                    "phone": ""
                }
            ],
  "MeAnalytics": 
            [
                {
                    "_id": 15,
                    "first_name": "Patrik",
                    "last_name": "",
                    "email": "",
                    "phone": ""
                },
                {
                    "_id": 16,
                    "first_name": "Martin",
                    "last_name": "",
                    "email": "",
                    "phone": ""
                }
            ],
  "status": 200,
  "message": "OK"
}
```

Bad request:

```json
{
  "status": 400,
  "message": "Bad Request"
}
```

# Git-Policy
- För att få merga till Dev branch så får filen/filerna/mapparna **inte vara tomma**.

- Du får **inte** slutföra pull requesten själv.

- Innan något pushas till main så ska alla tester gå igenom.

- När du vill commita till AzureDevops så måste du **länka** det till ett kort relaterat till vad du gjort och sedan flytta detta kort från **Git Merge Request** till **Done**

- För att få sätta upp en egen branch så ska det finnas ett kort på AzureDevops relaterat till.

- När du skapar en ny branch så skall den heta respektive till vilket kort du gör/gjort. Exempel: **"feat-this-is-my-card"**.

- Dina commits ska ha **__relaterad__** information till ändringar som skett.

