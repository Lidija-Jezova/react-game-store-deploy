import React from 'react';
import qs from 'qs'
import styles from './Games.module.scss'
import Card from '../../componenets/card'
import Dropdown from "../../componenets/UI/dropdown";
import CardSkeleton from "../../componenets/cardSkeleton";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {gamesSelector} from "../../store/games/selectors";
import {genresSelector} from "../../store/genres/selectors";
import {selectionsSelector} from "../../store/selections/selectors";
import {fetchTotalCount} from "../../store/selections/asyncActions";
import {fetchGames} from "../../store/games/asyncActions";
import {fetchGenres} from "../../store/genres/asyncActions";
import {setCurrentPage, setFilterQuery, setSelections, setSort} from "../../store/selections/slice";
import {TSort} from "../../store/selections/types";

const Index: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {games, status} = useSelector(gamesSelector)
    const genresStatus = useAppSelector(state => state.genres.status)
    const {genres} = useSelector(genresSelector)
    const {
        searchQuery,
        filterQuery,
        sort,
        sortOptions,
        pages,
        currentPage,
        limit
    } = useSelector(selectionsSelector)
    const displayedGenre = (filterQuery === '' ? 'All genres' : filterQuery)

    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const getGames = () => {
        dispatch(fetchTotalCount({searchQuery, filterQuery}))
        dispatch(fetchGames({searchQuery, filterQuery, sort, currentPage, limit}))
    }

    const getGenres = () => {
        dispatch(fetchGenres())
    }

    React.useEffect(() => {
        if (filterQuery === '' && sort === sortOptions[0]) {
            isMounted.current = true
        }
    }, [])

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            if (params.genres_like && params._sort && params._order) {
                dispatch(setSelections({
                    filterQuery: params.genres_like.toString(),
                    sort: {by: params._sort.toString(), order: params._order.toString()}
                }))
            }

            isSearch.current = true;
        }
    }, [])

    React.useEffect(() => {
        getGenres()
    }, [])

    React.useEffect(() => {
        if (isSearch.current === false) {
            getGames()
        }
        isSearch.current = false
    }, [searchQuery, filterQuery, sort.by, sort.order, currentPage])

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                    genres_like: filterQuery,
                    _sort: sort.by,
                    _order: sort.order
                },
                {addQueryPrefix: true})
            navigate(queryString)
        }
        isMounted.current = true
    }, [filterQuery, sort.by, sort.order])

    const handleSetFilterQuery = React.useCallback((query: string) => dispatch(setFilterQuery(query)), [])
    const handleSetSort = React.useCallback((sort: TSort) => dispatch(setSort(sort)), [])
    console.log("??", sortOptions)
    return (
        <div className={styles.page}>
            {status === 'success' && genresStatus === 'success' &&
                <div className={styles.actions}>
                  <Dropdown options={genres} displayedValue={displayedGenre}
                            handleClick={handleSetFilterQuery}
                            hideFirstOption initialValue={genres[0]} currentValue={filterQuery}/>
                  <Dropdown options={sortOptions}
                            displayedValue={sort.name}
                            handleClick={handleSetSort} sort initialValue={sortOptions[0].name}
                            currentValue={sort.name}/>
                </div>
            }
            <div className={styles.games}>
                <div className={styles.list}>
                    {status === 'loading' &&
                        [...Array(10)].map((item, index) =>
                            <CardSkeleton key={index}/>
                        )
                    }
                    {status === 'success' &&
                        games.map(game =>
                            <Card key={game.name} game={game}/>
                        )
                    }
                </div>
                {status === 'failed' &&
                    <div className={styles.error}><span>😥</span> Something went wrong... </div>
                }
            </div>
            <div className={styles.pagination}>
                {status === "success" &&
                    [...Array(pages).keys()].map(page =>
                        <span key={page}
                              className={`${styles.pageBtn} ${page + 1 === currentPage ? styles.selected : ''}`}
                              onClick={() => dispatch(setCurrentPage(page + 1))}>{page + 1}</span>
                    )
                }
            </div>
        </div>
    );
};

export default Index;