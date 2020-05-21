import React, {useMemo} from "react";
import styled from "styled-components/macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PaginationWrapper = styled.div<{textAlign: string}>`
  margin: 10px 0;
  text-align: ${props => props.textAlign};
  user-select: none;
`;

const PageWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  font-size: 18px;
  font-weight: bold;
  margin: 0 2px;
`;

const Page = styled.div<{current: boolean, disabled?: boolean}>`
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
  cursor: ${props => props.disabled? 'inherit' : 'pointer'};
  &:hover, &:focus, &:active {
    background-color: ${props => props.disabled? 'inherit' : '#32cdff'};
    border-color: ${props => props.disabled? 'inherit' : '#32cdff'};
    color: ${props => props.disabled? 'inherit' : 'white'};
  }
`;

type PropsType = {
    totalCount: number,
    onPageCount: number,
    currentPage: number,
    textAlign: string,
    changePage: (page: number) => void
}

const Pagination = ({totalCount, onPageCount, currentPage, textAlign, changePage}: PropsType) => {

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
        <PaginationWrapper textAlign={textAlign}>
            <PageWrapper onClick={previousPageClick}>
                <Page current={false} disabled={currentPage === 1}><FontAwesomeIcon icon='angle-up' rotation={270}/></Page>
            </PageWrapper>
            {pages.map(page =>
                <PageWrapper key={page} onClick={() => changePage(page)}>
                    <Page current={page === currentPage}>
                        {page}
                    </Page>
                </PageWrapper>)}
            <PageWrapper onClick={nextPageClick}>
                <Page current={false} disabled={currentPage === pages[pages.length - 1]}>
                    <FontAwesomeIcon icon='angle-up' rotation={90}/>
                </Page>
            </PageWrapper>
        </PaginationWrapper>

    )
};

export default Pagination