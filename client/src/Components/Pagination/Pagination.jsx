import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px auto;
`;

const Page = styled.div`
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Num = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 0;
  background: ${(props) => props.theme.Colors.LoadBg};
  color: ${(props) => props.theme.Colors.PageNum};
  font-weight: bold;
  font-size: 12px;
  /* margin-top: ${(props) => (props.arrow ? "5px" : null)}; */
  @media ${(props) => props.theme.MediaQueries.m.query} {
    /* width: 40px; */
    /* width: 40px;
    height: 40px;
    font-size: 15px; */
  }

  &.active {
    background-color: ${(props) => props.theme.Colors.ActivePage};
    color: ${(props) => props.theme.Colors.White};
  }

  &:hover {
    background-color: ${(props) => props.theme.Colors.ActivePage};
    cursor: pointer;
  }

  &.disabled {
    /* cursor: not-allowed; */
    display: none;
    &:hover {
      background: ${(props) => props.theme.Colors.LoadBg};
    }
  }

  & box-icon {
    margin-top: 2.5px;
    width: 17px !important;
    height: 17px !important;
    fill: ${(props) => props.theme.Colors.PageNum};
    @media ${(props) => props.theme.MediaQueries.m.query} {
      /* padding-bottom: 10px; */
      /* margin: 0; */
      /* width: 30px !important;
      height: 30px !important; */
    }
  }
  &:hover box-icon {
    fill: ${(props) => props.theme.Colors.White};
  }
`;

const Pagination = ({ pageChange, page, totalPages }) => {
  const pageDecrement = () => {
    if (page > 1) {
      pageChange(page - 1);
    }
    if ((page - 1) % 3 == 0) {
      setMaxPageLimit(maxPageLimit - 3);
      setMinPageLimit(minPageLimit - 3);
    }
  };

  const pageIncrement = () => {
    if (page < totalPages) {
      pageChange(page + 1);
    }
    if (page + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + 3);
      setMinPageLimit(minPageLimit + 3);
    }
  };

  const [maxPageLimit, setMaxPageLimit] = useState(3);
  const [minPageLimit, setMinPageLimit] = useState(0);

  let pagination;
  if (totalPages > 1) {
    pagination = (
      <Wrapper>
        <Page>
          <Num
            arrow
            onClick={() => (page !== 1 ? pageDecrement() : null)}
            className={page === 1 ? "disabled" : ""}
          >
            <box-icon name="chevron-left"></box-icon>
          </Num>
        </Page>
        {new Array(totalPages).fill("").map((el, index) => {
          if (index < maxPageLimit && index >= minPageLimit) {
            return (
              <Page key={index}>
                <Num
                  onClick={() => {
                    pageChange(index + 1);
                  }}
                  className={page === index + 1 ? "active" : null}
                >
                  {index + 1}
                </Num>
              </Page>
            );
          }
        })}
        <Page>
          <Num
            arrow
            onClick={() => (page !== totalPages ? pageIncrement() : null)}
            className={page === totalPages ? "disabled" : ""}
          >
            <box-icon name="chevron-right"></box-icon>
          </Num>
        </Page>
      </Wrapper>
    );
  }

  return <>{pagination}</>;
};

export default Pagination;
