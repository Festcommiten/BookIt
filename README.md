# BookIt

- [CRUD](#API-Data-Structure)
    - [New-Booking](#New-Booking)
    - [Read-bookings](#Read-bookings-from-backend)
    - [Update-booking](#Update-a-booking)
    - [Delete-booking](#Delete-booking)
- [Git-Policy](#Git-Policy)
# API-Data-Structure

## **New-Booking**

### Request

HTTP Method: `POST`  
url: `/v1/new_booking`

```json
{
  "room": "room1",
  "week": 19
  "booking-company": "Company1",
  "booker": "user1",
  "start_time": "date string",
  "end_time": "date string"
}
```

### Response

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

## **Read-bookings-from-backend**

### Request

HTTP Method: `GET`  
API url: `/v1/bookings/`

### Response

Success:

```json
{
  "bookings": [
    {
        "_id": "ObjectId_56340AWDFSQ12"
        "room": "ada",
        "week": 20,
        "booking-company": "Company1",
        "booker": "user1",
        "start_time": "2021-05-17:09:00:00",
        "end_time": "2021-05-17:10:00:00"
    },
    {
        "_id": "ObjectId_15215ASFF1245"
        "room": "ada",
        "week": 20,
        "booking-company": "Company 1",
        "booker": "user2",
        "start_time": "2021-05-17:10:00:00",
        "end_time": "2021-05-17:11:00:00"
    },
    {
        "_id": "ObjectId_115570ASFD42"
        "room": "ada",
        "week": 20,
        "booking-company": "Company1",
        "booker": "user3",
        "start_time": "2021-05-17:11:00:00",
        "end_time": "2021-05-17:12:00:00"
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

### Request

HTTP Method: `GET`  
API url: `/v1/bookings/{room1}`

### Response

Success:

```json
{
  "bookings": [
    {
      "id": "1",
      "room": "room1",
      "booking-company": "Company1",
      "booker": "user1",
      "start_time": "2021-05-16:16:00:00",
      "end_time": "date moment object"
    },
    {
      "id": "2",
      "room": "room1",
      "booking-company": "Company1",
      "booker": "user2",
      "start_time": "date moment object",
      "end_time": "date moment object"
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

## **Update-a-booking**

HTTP Method: `PUT`  
API url: `/v1/update_booking`

### Request

```json
{
  "id": "1",
  "room": "room2",
  "booker": "user1",
  "booking-company": "Company1",
  "start_time": "2021-05-16:17:00:00",
  "end_time": "date moment object"
}
```

### Response

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

## **Delete-booking**

### Request

HTTP Method: `DELETE`  
API url: `/v1/delete/{1}`

### Response

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

# Git-Policy
- För att få merga till Dev branch så får filen/filerna/mapparna **inte vara tomma**.

- Du får **inte** slutföra pull requesten själv.

- Innan något pushas till main så ska alla tester gå igenom.

- När du vill commita till AzureDevops så måste du **länka** det till ett kort relaterat till vad du gjort och sedan flytta detta kort från **Git Merge Request** till **Done**

- För att få sätta upp en egen branch så ska det finnas ett kort på AzureDevops relaterat till.

- När du skapar en ny branch så skall den heta respektive till vilket kort du gör/gjort. Exempel: **"feat-this-is-my-card"**.

- Dina commits ska ha **__relaterad__** information till ändringar som skett.

