import React, {useMemo} from "react";
import styled from "styled-components/macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PaginationWrapper = styled.div`
  margin: 10px 0;
  text-align: center;
  user-select: none;
`;

const PageWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  font-size: 18px;
  font-weight: bold;
  margin: 0 2px;
  cursor: pointer;
`;

const Page = styled.div<{current: boolean}>`
  position: relative;
  border-radius: 4px;
  display: block;
  text-align: center;
  width: 42px;
  height: 42px;
  line-height: 42px;
  margin-left: -1px;
  color: ${props => props.current? 'white' : 'black'};
  transition: .3s;
  background-color: ${props => props.current? '#32cdff' : 'inherit'};
  border-color: ${props => props.current? '#32cdff' : 'inherit'};
  &:hover, &:focus, &:active {
    background-color: #32cdff;
    border-color: #32cdff;
    color: #fff;
  }
`;

type PropsType = {
    totalCount: number,
    onPageCount: number,
    currentPage: number,
    changePage: (page: number) => void
}

const Pagination = ({totalCount, onPageCount, currentPage, changePage}: PropsType) => {

    const pages = useMemo(() => {
        let pages = [];
        let pageCount = Math.ceil(totalCount / onPageCount);
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i)
        }
        return pages
    },[totalCount, onPageCount]);

    const previousPageClick = () => {
        if (currentPage !== 1) changePage(currentPage-1)
    }
    const nextPageClick = () => {
        if (currentPage !== pages[pages.length - 1]) changePage(currentPage+1)
    }

    return (
        <PaginationWrapper>
            <PageWrapper onClick={previousPageClick}>
                <Page current={false}><FontAwesomeIcon icon='angle-up' rotation={270}/></Page>
            </PageWrapper>
            {pages.map(page =>
                <PageWrapper key={page} onClick={() => changePage(page)}>
                    <Page current={page === currentPage}>
                        {page}
                    </Page>
                </PageWrapper>)}
            <PageWrapper onClick={nextPageClick}>
                <Page current={false}><FontAwesomeIcon icon='angle-up' rotation={90}/></Page>
            </PageWrapper>
        </PaginationWrapper>

    )
};

export default Pagination