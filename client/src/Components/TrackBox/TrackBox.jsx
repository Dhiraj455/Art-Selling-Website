import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TrackCard from "../Cards/TrackCard";

const ProgessBar = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  height: 6px;
  width: 90%;
  position: relative;
`;

const BaseBox = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 3px;
  transition: width 1s ease-in-out;
`;

const Background = styled(BaseBox)`
  background: #e2e6f9;
  width: 100%;
`;

const Progress = styled(BaseBox)`
  background: #00c013;
  width: ${({ percent }) => percent}%;
`;

function TrackBox(props) {
  const [percent, setPercent] = useState(20);
  useEffect(() => {
    let count = 0;
    let p = 0;
    for (var i = 0; i < props.postsDetails.length; i++) {
      if (props.postsDetails[i].isDelivered) {
        count = count + 1;
      } else {
        console.log("Not delivered");
      }
    }
    if (props.postsDetails.length <= count) {
      setPercent(100);
    } else {
      p = p + Math.ceil((count / props.postsDetails.length) * 100);
      setPercent(p);
    }
  }, []);
  
  return (
    <>
      <ProgessBar>
        <Background />
        <Progress percent={percent} />
      </ProgessBar>
      <br />
      {props.products.map((product, key) => (
        <TrackCard
          key={key}
          product={product}
          userId={props.userId}
          id={props.id}
          isdelivered={props.delivery}
        />
      ))}
    </>
  );
}

export default TrackBox;
