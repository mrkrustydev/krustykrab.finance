import styled from "styled-components";
import Button from "../../components/Button/Button";

const MenuButton = styled(Button)`
  color: #ffffff!important;
  padding: 0 8px;
  border-radius: 8px;
  background-color:rgba(0,0,0,0)!important;
`;
MenuButton.defaultProps = {
  variant: "text",
  size: "sm",
};

export default MenuButton;
