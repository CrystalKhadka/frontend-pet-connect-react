// import { render, screen, waitFor } from "@testing-library/react";
// import '@testing-library/jest-dom/extend-expect'; // Ensure this import is present
// import { MemoryRouter } from "react-router-dom";
// import Homepage from "./Homepage";

// describe("Homepage Component", () => {
//   beforeEach(() => {
//     // Mock localStorage
//     Storage.prototype.getItem = jest.fn((key) => {
//       if (key === "user") {
//         return JSON.stringify({ role: "user" });
//       }
//       return null;
//     });
//   });

//   it("renders contact section correctly after a delay", async () => {
//     render(
//       <MemoryRouter>
//         <Homepage />
//       </MemoryRouter>
//     );

//     // Debug to inspect the DOM before the assertion
//     screen.debug();

//     await waitFor(() => {
//       // Ensure the 'Contact Us' text is in the document
//       const contactUsElement = screen.queryByText(/Contact Us/i);
//       expect(contactUsElement).toBeInTheDocument();
//     }, { timeout: 2000 });  // Extended timeout

//     // Debug to inspect the DOM after the waitFor
//     screen.debug();

//     // Check for form elements
//     expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Your Message/i)).toBeInTheDocument();
//   });
// });
