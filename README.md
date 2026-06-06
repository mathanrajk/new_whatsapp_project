# WhatsApp Song Generator (React + Vite Frontend)

This is the frontend component of a WhatsApp Song Generator application, built with React and Vite. It allows users to upload a text file containing song lyrics or messages, associate them with a person's name or number, and then send this data to a backend service for further processing (e.g., sending via WhatsApp).

## Features

-   **Person Name/Number Input:** Specify the recipient for the song/message.
-   **Song File Upload:** Upload a `.txt` file where each line is treated as a separate part of the song/message.
-   **Backend Integration:** Communicates with a FastAPI backend (expected at `http://localhost:8000/send`) to process and potentially send the generated content.

## Technologies Used

-   **React 19:** For building the user interface.
-   **Vite:** As a fast build tool and development server.
-   **ESLint:** For code linting.

## Setup and Running the Frontend

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the project directory**:
    ```bash
    cd whatsupsong
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    This will start the Vite development server, usually accessible at `http://localhost:5173`.

## How to Use

1.  **Ensure Backend is Running:** This frontend expects a FastAPI backend to be running on `http://localhost:8000`. Make sure your backend service is active and accessible.
2.  **Enter Person's Name or Number:** In the input field, type the name or number of the person you intend to send the song to.
3.  **Upload Song File:** Click the "Whatsapp song file upload" input and select a `.txt` file from your local system. Each line in this file will be sent as a separate content item.
4.  **Generate Song:** Click the "Generate Song" button. The application will send the person's name/number and the parsed song content to the backend.
5.  **View Results:** Check the browser console for responses from the backend, and an alert will indicate success or any errors.
