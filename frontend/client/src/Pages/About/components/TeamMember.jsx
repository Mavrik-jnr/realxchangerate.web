import React from "react";
import styled from "styled-components";
import {useTheme} from "@mui/material"

const TeamMember = (props) => {
  const theme = useTheme()

  const textColor = theme.palette.mode === 'dark' ? "#fff": "#000"
  return (
    <>
      <StyledTeam>
        <img src={props.image} alt="" />
        <h2 style={{ color: textColor }}>{props.name}</h2>
        <span style={{ color: "#64748B" }}>{props.designation}</span>
      </StyledTeam>
    </>
  );
};

export default TeamMember;

const StyledTeam = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 225px;
  align-items: center;
  gap: 15px;
`;
