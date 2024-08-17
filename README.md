# Pet Adoption Platform

A React-based frontend for the Pet Adoption website, providing separate interfaces for adopters and pet owners to manage pets, handle adoption processes, and facilitate communication.

(https://www.youtube.com/watch?v=NJnRQQBSY44).

## Features

### Adopter Role

- **Get All Pets**: View all available pets for adoption.
- **Search Pets**: Filter and search for pets based on various criteria such as breed, age, and size.
- **Adopted Pets**: Track pets that have been adopted and view their adoption status.
- **Donation**: Make donations to support the care and sheltering of pets.
- **Chat**: Communicate with pet owners directly through a built-in chat feature.

### Owner Role

- **Add Pet**: Add new pets to the platform for potential adopters to view.
- **Delete Pet**: Remove pets from the platform that are no longer available for adoption.
- **Update Pet**: Update pet information, including pictures and descriptions.
- **Check Adoption Forms**: Review adoption applications submitted by potential adopters.
- **Approve or Reject Adoption Requests**: Approve or reject adoption requests based on the information provided in the adoption form.
- **Check Adopted Pets**: Monitor which pets have been adopted and their current status.
- **Login with Google**: Secure login using Google accounts for both adopters and owners.
- **Chat**: Communicate with potential adopters through a chat interface.

### UI/UX Design

- **Figma**: Used for wireframing and designing the UI components to ensure a consistent and intuitive user experience.
- **Material Design**: Implemented Material Design principles to provide a clean, modern, and user-friendly interface.
- **Responsive Design**: Tailored the interface for multiple device types, ensuring an optimal user experience on desktops, tablets, and mobile devices.
- **User-Centered Design**: Focused on creating a seamless experience by understanding the needs of adopters and owners, ensuring that all features are easily accessible and intuitive to use.

### Technology Stack

- **React.js**: Core frontend library used to build dynamic user interfaces.
- **Redux**: State management tool used to manage and centralize the application state.
- **Tailwind CSS**: A utility-first CSS framework used to style the application, providing flexibility and consistency across components.
- **Node.js**: Backend runtime environment used to run server-side applications and handle API requests.
- **Express.js**: A web application framework for Node.js used to build the RESTful API for the platform.
- **MongoDB**: NoSQL database used to store pet listings, user information, and adoption records.
- **Socket.io**: Used to implement real-time chat functionality between adopters and pet owners.
- **Google Firebase**: Utilized for authentication services, particularly Google login for both adopters and owners.

### API Integration

The frontend interacts with the backend through a RESTful API, managing operations such as pet listing, adoption request handling, user authentication, and chat functionality.

### Future Works

- **Mobile App Development**: Expand the platform by developing a mobile app for both Android and iOS to make the adoption process more accessible.
- **Advanced Pet Matching**: Introduce an AI-based pet matching feature that suggests pets to adopters based on their preferences and lifestyle.
- **Social Media Sharing**: Allow users to share pets on social media platforms to increase the chances of adoption.
- **Virtual Meet & Greet**: Implement a feature allowing potential adopters to have a virtual meeting with the pets before deciding on adoption.
- **Location-Based Filtering**: Implement a location-based filtering system that allows adopters to find pets available for adoption near their geographic location.
- **Recommendation System**: Develop a recommendation system that suggests pets to users based on their browsing history, past adoptions, and user preferences.

### Challenges

- **State Management**: Managing complex state across various components, particularly with features like chat, user authentication, and pet listings, was challenging but effectively handled using Redux.
- **Chat Integration**: Implementing real-time chat functionality required ensuring reliable message delivery and managing various chat states.
- **Responsive Design**: Ensuring that the user interface remained consistent and functional across a wide range of devices and screen sizes was challenging, but Tailwind CSS provided the flexibility needed to create a responsive design.
- **API Integration**: Handling API requests for real-time pet updates, user authentication, and chat services while maintaining smooth and secure communication was crucial and required thorough testing.

### Environment Variables

- `REACT_APP_API_URL`: The base URL for the backend API.
- `REACT_APP_GOOGLE_CLIENT_ID`: Your Google Client ID for authentication.
- `REACT_APP_CHAT_SERVICE_URL`: The URL for the chat service used to facilitate communication between adopters and owners.
- `REACT_APP_PET_MATCHING_SERVICE_URL`: The URL for the AI-based pet matching service.
- `REACT_APP_LOCATION_SERVICE_URL`: The URL for the service used to provide location-based filtering of pets.
