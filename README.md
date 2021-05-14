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
  "id": "1",
  "room": "room1",
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
      "id": "1",
      "room": "room1",
      "booker": "user1",
      "start_time": "2021-05-16:16:00:00",
      "end_time": "date moment object"
    },
    {
      "id": "2",
      "room": "room2",
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
      "booker": "user1",
      "start_time": "2021-05-16:16:00:00",
      "end_time": "date moment object"
    },
    {
      "id": "2",
      "room": "room1",
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
- För att få merga till Dev branch så får filen/filerna/mapparna inte vara tomma.

- Du får **inte** slutföra pull requesten själv.

- Innan något pushas till main så ska alla tester gå igenom.

- När du skapar en pull request så flyttar du respektive kort på Jira till **Git Merge Request** och ber någon kolla igenom pull requesten innan kortet flyttas till **Done**.

- För att få sätta upp en egen branch så ska det finnas ett kort på Jira relaterat till.

- Struktur för hur en ny branch heta och ska heta respektive till vilket kort du gör/gjort. Exempel: **"feat-this-is-my-card"**.

- Dina commits ska ha **__relaterad__** information till ändringar som skett.

