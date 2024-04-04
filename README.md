
# StudySmart

StudySmart is an innovative academic management platform powered by Node.js, Google Firestore and Firebase. Seamlessly sign in with Google to create a personalized profile and collaborate with friends. Track test scores, manage attendance, and upload study materials for efficient exam preparation, track and manage academic expenses. StudySmart offers a streamlined solution to optimize academic success.

# Terms used:
Authentication token : access token from firebase auth


oauthToken : access token from google oauth2.0


# Example and Usage of all the apis are available at  [POSTMAN]("https://martian-meadow-186816.postman.co/workspace/4dea1a30-fea5-41c0-a613-3167b647aea1/documentation/25945935-82070a9a-4258-4683-a9b7-54affa169e48")

# API endpoints
ATTENDANCE:

    1) addAttendance:
        >Endpoint: 
            'POST protected/attendance/addAttendance'
            This indicates the URL path where the API is accessible and the HTTP method to use for making the request.

        >Headers:
            tokenid: Authentication token
            This specifies the required header for authentication. Clients need to include a valid authentication token in the request header to access the API endpoint.

        >Request Body:
            {
            "date": "yyyy/mm/dd",
            "attendance": [subjects]
            }
            
            example:
            {
            "date": "2025/1/2",
            "attendance": ["physics", "Math"]
            }
            This section describes the data that needs to be included in the request body. It's formatted as JSON and contains two key-value pairs:
                date: The date for which attendance is being recorded.
                attendance: An array of subject names for which attendance is being recorded.

        >Response:
            Status Code: 200 OK
            Body: "done"
            This outlines the expected response after making the API call. A successful request will return a status code of 200 OK along with the text "done" in the response body.

        >Errors:
            401 Unauthorized: Missing or invalid authentication token
            500 Internal Server Error: Unexpected server error
            These indicate possible error scenarios and their corresponding HTTP status codes that can occur when using the API endpoint.

EVENT:

    1)createEvent
        >Endpoint: 
            `POST /protected/event/createEvent`
            Creates a new event with specified details and adds attendees to the event.
        >Headers:
             tokenid: Authentication token
        >Request Body
            JSON format
            Requires {token:oauthToken,EventSchema(event details including summary, location, description, start and end date/time, reminders, and attendees)}.
        >Response
            Status Code: 200 OK
            Body: Event ID
        >Errors
            404 Not Found: Event ID not found
            401 Unauthorized: Missing or invalid authentication token
            500 Internal Server Error: Unexpected server error
        


    2)getEventById:
        >Endpoint:
            `POST /protected/event/getEventById/:id`
            Retrieves event details by ID, ensuring user authorization.
        >Headers:
            tokenid: Authentication token
        >URL Parameter: 
            id: Event ID
        >Response 
            Status Code: 200 OK
            Body: Event details
        >Errors
            404 Not Found: Event ID not found
            401 Unauthorized: Missing or invalid authentication token
            500 Internal Server Error: Unexpected server error

    3)getEvent:
        >Endpoint
            `POST /protected/event/getEvent`
            Retrieves a list of events.
        >Headers: 
            accessToken: Access token (optional)
        >Request Body:
            JSON format
            Requires event details
        >Response:
            Status Code: `200 OK`
            Body: List of events
        >Errors: 
            404 Not Found: Events not found
            500 Internal Server Error: Unexpected server error

    4)uploadFile:
        >Endpoint 
            `POST /protected/event/uploadFile`
            Uploads a file, such as a PDF, to Firebase Storage.
        >Headers:
            tokenid: Authentication token
        >Request Body:
            JSON format
            Requires the file to be uploaded in base64 format
        >Response:
            Status Code: 200 OK           
            Body: URL of the uploaded file
        >Errors:
            500 Internal Server Error: Failed to upload the file

PROFILE:

    1)getProfile:
        >Endpoint:
            'GET /protected/profile/getProfile' 
            This endpoint retrieves the profile data of the authenticated user. It allows the user to access their own profile information stored in the database.

        >Request Headers:
            tokenid: Authentication token for the user.
            This header contains the authentication token for the user, which is used to verify the user's identity and authorization to access their profile data.

        >Response:
            Status Code: 200 OK
            Body: The response body is a JSON object containing various fields of the user's profile data, such as their name, email, and photo URL.

    2)getFriend:
        >Endpoint:
            GET /protected/profile/getFriend
           The purpose of this endpoint is to retrieve the list of friends for the authenticated user. It enables users to view the list of individuals they have added as friends within the application.

        >Request Headers:
            tokenid: Authentication token for the user.
            Similar to the previous endpoint, this header contains the authentication token for the user, ensuring that only authorized users can access their friend list.

        >Response:
            Status Code: 200 OK
            Body: The response body is a JSON array containing the email addresses or identifiers of the user's friends.

    3)addFriend:
        >Endpoint:
            POST /protected/profile/addFriend
            This endpoint allows users to add a new friend to their friend list. Users can specify the email address or identifier of the individual they want to add as a friend.

        >Request Headers:
        tokenid: Authentication token for the user.
        Once again, this header contains the authentication token for the user, ensuring that only authenticated users can perform actions such as adding friends.

        >Request Body:
            Format: JSON
            Fields:
                friendTo: Email or identifier of the friend to be added.

        >Response:
            Status Code: 200 OK
            Body: The response body is a JSON array containing the updated list of friends after adding the new friend. This allows users to verify that the friend addition was successful.

TEST SCORES

    1)addSubject:
        >Endpoint: 
            POST /protected/subject/addSubject
            This endpoint allows users to add a new subject to their list of subjects for which they want to record scores and attendance. Users can specify details such as the subject name, semester, attendance percentage, last attendance recorded, and an initial score structure.

        >Request Headers:
            tokenid: Authentication token for the user.

        >Request Body:

            {
                "subject": {
                "name": "physics",
                "sem": "2",
                "attendence": "100",
                "lastattendence": "24",
                "score": {
                    "1": ["internal", "10", "20"],
                    "2": ["10", "20"],
                    "3": ["10", "20"]
                }}
            }

            Format: JSON
            Fields:
                subject: Object containing details of the subject to be added.
                name: Name of the subject (e.g., "Physics").
                sem: Semester or academic term of the subject.
                attendence: Current attendance percentage for the subject.
                lastattendence: Last recorded attendance percentage.
                score: Object representing the score structure for the subject. It contains keys for each test or assessment and an array containing details such as type of test, marks obtained, and total marks.

        >Response:
            Status Code: 200 OK
            Body: JSON object containing the details of the subject that was added.

    2)getAllSubjects
        >Endpoint: 
            POST /protected/subject/getAllSubject
            This endpoint retrieves all subjects associated with the authenticated user. It allows users to view the list of subjects they have added along with their respective details.

        >Request Headers:
            tokenid: Authentication token for the user.

        >Response:
            Status Code: 200 OK
            Body: JSON object containing details of all subjects associated with the user.

    3)addScore:
        >Endpoint: 
            POST /protected/subject/addScore
            This endpoint enables users to add scores for a specific subject. Users can update the scores for different assessments or tests within the subject.

        >Request Headers:
            tokenid: Authentication token for the user.

        >Request Body:
            {
                "subject": "physics",
                "score": {
                    "1": ["internal", "10", "20"],
                    "2": ["10", "20"],
                    "3": ["10", "20"]
                }
            }

            Format: JSON
            Fields:
                subject: Name of the subject for which scores are being added.
                score: Object containing the updated score structure for the subject.

            Response:
                Status Code: 200 OK
                Body: JSON object containing the updated score structure for the subject.

EXPENSES

    1)newExpense
        >Endpoint: 
            POST /protected/expense/newExpense
            This endpoint allows users to create a new expense entry.

        >Request Headers: 
            tokenid: Authentication token for the user.

        >Request Body:
            {
                "expense": {
                "name": "sunil"
                }
            }
            expense: Object containing details of the new expense.
            name: Name or description of the expense.

        >Response:
            Status Code: 200 OK
            Body: ID of the newly created expense.

    2)shareExpense:
        >Endpoint: 
            POST /protected/expense/shareExpense
            This endpoint allows users to share their expenses with others by making them public and generating a shareable link.

        >Request Headers: 
            tokenid: Authentication token for the user.
        >Request Body:  
            {
                "id": "Mv4ntzmYxMh7o1Z2yhPB"
            }
            id: ID of the expense to be shared.

        >Response:
            Status Code: 302 Found (Redirect)
            Body: Redirects to the generated public link for the shared expense.

    3)addExpense
        >Endpoint: 
            POST /protected/expense/addExpense
            This endpoint allows users to add details to an existing expense entry.

        >Request Headers: tokenid: Authentication token for the user.

        >Request Body:
            {
                "id": "Mv4ntzmYxMh7o1Z2yhPB",
                "expense": {
                    "name": "exam fee 1",
                    "amount": "2000",
                    "date": "date"
                }
            }

            id: ID of the expense to which details are to be added.
            expense: Object containing additional details of the expense.
            name: Name or description of the additional expense.
            amount: Amount of the additional expense.
            date: Date of the additional expense.

        >Response:
            Status Code: 200 OK
            Body: ID of the expense to which details were added.

    4)Get Expense
        >Endpoint: 
            GET /protected/expense/getExpense/:id
            This endpoint allows users to retrieve details of a specific expense.

        >Request Parameters: 
            id: ID of the expense to be retrieved.

        >Response:
            Status Code: 200 OK
            Body: Details of the requested expense.

## ARCHITECHTURE
## SCHEMA
## GOOGLE PRODUCTS