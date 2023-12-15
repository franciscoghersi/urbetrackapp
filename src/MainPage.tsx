import { useMemo } from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import LeftNav from './LeftNav';
import Box from './Box';
import { ResponseAPI } from './Entities/ResponseAPI';
import { useInfiniteQuery } from 'react-query';
import { Loading } from './Loading';

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  scroll:{
    display:'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '16px'

  }
});

function MainPage() {
  const classes = useStyles();
  const fetcher = (page: number): Promise<ResponseAPI> => fetch(`https://rickandmortyapi.com/api/character/?page=${page}`).then(res => res.json());

  const { data, error, fetchNextPage, status, hasNextPage } = useInfiniteQuery(
    ['images'],

    ({ pageParam = 1 }) => fetcher(pageParam),

    {
        getNextPageParam: (lastPage: ResponseAPI) => {

            const previousPage = lastPage.info.prev ? +lastPage.info.prev.split('=')[1] : 0
            const currentPage = previousPage + 1;

            if (currentPage === lastPage.info.pages) return false;
            return currentPage + 1;
        }
    }
)

  const images = useMemo(() => data?.pages.reduce((prev, page) => {
    return {
        info: page.info,
        results: [...prev.results, ...page.results]
    }
  }), [data]);

  if (status === 'loading') return <Loading />

  if (status === 'error') return <h4>Ups!, {`${error}` as string}</h4>

  return (
    <Container className={classes.container}>
        <LeftNav/>
      <Typography variant="h4">Lista de Imágenes</Typography>
      <InfiniteScroll
        dataLength={images ? images.results.length : 0}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<Loading />}
      >
      <div className={classes.scroll}>
        { 
            images && images.results.map(image => (
            <Box image={image}/>
        ))
        }
      </div>
      </InfiniteScroll>
    </Container>
  );
}

export default MainPage;