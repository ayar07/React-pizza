import React from 'react';
import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';
import { selectFilters } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { selectPizzaData } from '../redux/pizza/selectors';
import { Status } from 'ahooks/lib/useExternal';
import { fetchPizzas } from '../redux/pizza/slice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilters);
 
  const onCkickCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onChangePage = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  // Если изменили параметры и был первый рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     };

  //     const queryString = qs.stringify(params, { skipNulls: true });

  //     navigate(`?${queryString}`);
  //   }
  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  // }, [categoryId, sort, searchValue, currentPage]);

  //Если был первый рендер, то проверим URL- параметры и сохраняем в редаксе
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       }),
  //     );
  //   }
  //   isMounted.current = true;
  // }, []);

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    // await axios
    //   .get(
    //     `https://658bd4c5859b3491d3f4d809.mock i.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
    //   )
    //   .then((res) => {
    //     setItem(res.data);
    //     setIsLoading(false);
    //   });

    dispatch(
      // @ts-ignore
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  //Если был первый, то запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const Skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onCkickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {(status as Status) === 'error' ? (
        <div className="content__error-info">
          <h2>{'Произошла ошибка :('}</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? Skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
