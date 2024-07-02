// Import necessary libraries
import styled from 'styled-components';
import { useButton } from 'reakit/Button';

// Define the styled button using styled-components
const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3700b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(98, 0, 234, 0.5);
  }

  &:active {
    background-color: #3700b3;
  }

  &:disabled {
    background-color: #b0b0b0;
    cursor: not-allowed;
  }
`;

// Create a custom button component using Reakit's useButton hook
const CustomButton = React.forwardRef((props, ref) => {
  const button = useButton({ ...props, ref });

  return <StyledButton {...button} />;
});

// Export the custom button component
export default CustomButton;
