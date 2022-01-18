import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import {  Card, Container } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
const fetchPhotos = async (page) => {
    const res = await fetch(`/v2/list?page=${page}&limit=5`)
    const results = await res.json();
    return {
        results,
        nextPage: page + 1,
        totalPages: 10
    }
}

const Photos = () => {
    const [page, setPage] = useState(0)
    const {
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        data,
        isLoading,
        isFetching
    } = useInfiniteQuery('photos', ({ pageParam = page }) => fetchPhotos(pageParam), {
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.nextPage < lastPage.totalPages) {
                return lastPage.nextPage
            } else {
                return undefined
            }
        }
    })
    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            <h1>Picasa</h1>

            <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
                {data.pages.map((page) =>
                    page.results.map((post) => <>
                        <Card style={{  margin : '0 auto' }}>
                            <Card.Body>
                                <Card.Title as = 'h4'>{post.author}</Card.Title>
                            </Card.Body>
                            <Card.Img variant="top" src={post.download_url} style={ {width : 400 , height : 400}} />
                        </Card>
                    </>))}
            </InfiniteScroll>
                        {isFetching && <Spinner animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>}
        </div>
    )
}

export default Photos
