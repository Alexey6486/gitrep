import React, {useState} from "react";
import s from './Pagination.module.css'

type PropsType = {
    currentPage: number
    totalItems: number
    portionSize: number
    pageSize: number
    onPageChange: (page: number) => void
}

export const Pagination = (props: PropsType) => {

    const {currentPage, totalItems, portionSize, pageSize, onPageChange} = props;

    const totalPages = Math.ceil(totalItems / pageSize);
    const totalPortions = Math.ceil(totalPages / portionSize);

    const pages = [];
    for (let i = 0; i < totalPages; i++) {
        pages.push(i)
    }

    const [portionCount, setPortionCount] = useState(1);
    const nextPortion = () => {
        setPortionCount(portionCount + 1)
    };
    const prevPortion = () => {
        setPortionCount(portionCount - 1)
    };
    const firstElInPortion = (portionCount - 1) * portionSize + 1;
    const lastElInPortion = portionCount * portionSize;

    const onPageChangeHandler = (page: number) => {
        onPageChange(page);
    };

    const pagesMap = pages
        .filter(item => item >= firstElInPortion && item <= lastElInPortion)
        .map(page => <button className={page === currentPage ? `${s.pageBtn} ${s.active}` : `${s.pageBtn}`} onClick={() => onPageChangeHandler(page)}>{page}</button>);

    return (
        <div className={s.paginationBlock}>
            {portionCount > 1 && <button className={s.portionBtn} onClick={prevPortion}>PREV</button>}
            {pagesMap}
            {portionCount < totalPortions && <button className={s.portionBtn} onClick={nextPortion}>NEXT</button>}
        </div>
    );
};