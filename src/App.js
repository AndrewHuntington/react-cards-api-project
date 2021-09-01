import CardDisplay from "./CardDisplay";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    margin: 0;
    min-height: 100vh;
    padding: 5rem 0;
    background-color: #064919;
    font-family: "Roboto", sans-serif;
    text-align: center;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <CardDisplay></CardDisplay>
    </>
  );
}

export default App;
