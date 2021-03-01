//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import {
  createVisualComponent,
  useRef,
  useUnmountedRef,
  useCallback,
  useDataList,
  PagingAutoLoad,
  usePagingListData,
  useState,
  usePreviousValue,
  useLayoutEffect,
  useEffect
} from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Calls from "../calls";
import Joke from "./joke";
import Uu5Tiles from "uu5tilesg02";
import Config from "../routes/config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "FlexTiles",
  //@@viewOff:statics
};

const WithColumnsContextButton = createVisualComponent({
  render() {
    const { openColumnsManager } = Uu5Tiles.useColumns();
    return <UU5.Bricks.Button onClick={openColumnsManager}><UU5.Bricks.Icon icon="mdi-format-columns" /></UU5.Bricks.Button>;
  }
});

const FlexTiles = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps
  render(props) {
    let pageSize = props.pageSize || 8;
    const dataListResult = useDataList({
      handlerMap: {
        load: props.load,
        createItem: props.createItem,
      },
      itemHandlerMap: {
        load: props.loadItem,
        update: props.updateItem,
        delete: props.deleteItem,
      },
      pageSize
    });
    const {
      state,
      data,
      newData,
      errorData,
      pendingData,
      handlerMap
    } = dataListResult;
    let total = data ? data.length : 0;

    // let [columns, setColumns] = useState(props.columns);
    // useEffect(() => {
    //   const newColumns = [...columns];
    //   newColumns.push({
    //     key: "controls",
    //     cell: () => null,
    //     header: <WithColumnsContextButton />,
    //     label: { en: "Controls", cs: "Ovládací prvky" },
    //     width: 32,
    //     fixed: "right"
    //   })
    //   setColumns(newColumns)
    // },[]);

    //reloading start
    let [tick, setTick] = useState(0);
    let prevTick = usePreviousValue(tick);

    if (props.reload) {
      useEffect(() => {
        const interval = setInterval(() => {
          setTick(tick + 1)
        }, props.reload);
        return () => clearInterval(interval);
      });
    }
    //reloading end

    //Filtering
    let [filtersAndSorters, setFiltersAndSorters] = useState({});
    let prevFiltersAndSorters = usePreviousValue(filtersAndSorters);

    let changeFiltersAndSorters = (data) => {
      console.log(data);
      setFiltersAndSorters(
        {
          filterMap: data.activeFilters.map(
            item => ({key: item.key, value: item.value})),
          sorterMap: data.activeSorters.map(
            item => ({key: item.key, value: item.ascending}))
        })
    }
    //Filtering end

    //Paging start
    let [shownPageIndex, setShownPageIndex] = useState(0);
    let prevShownPageIndex = usePreviousValue(shownPageIndex);

    let onPaginationChange = useCallback((pagination, newIndex) => {
      if (newIndex === "next") {
        setShownPageIndex(prevShownPageIndex + 1);
      } else if (newIndex === "prev") {
        setShownPageIndex(prevShownPageIndex - 1);
      } else {
        setShownPageIndex(newIndex);
      }
    }, []);
    //Paging end

    let dataToRender = data ? data.slice(shownPageIndex * pageSize,
      shownPageIndex * pageSize + pageSize) : [];
    let notLoadedItemsCount = !data ? pageSize : dataToRender.filter(
      it => it == null).length;

    useLayoutEffect(() => {
      if (
        (notLoadedItemsCount > 0 || tick !== prevTick ||
          filtersAndSorters !== prevFiltersAndSorters)
        &&
        (shownPageIndex !== prevShownPageIndex ||
          state === "ready" ||
          (state === "error" && state !== "load"))
      ) {
        handlerMap.load && handlerMap.load(
          {...filtersAndSorters, pageInfo: {pageIndex: shownPageIndex}}, true);
      }
    }, [notLoadedItemsCount, shownPageIndex, prevShownPageIndex, state,
      filtersAndSorters, tick, filtersAndSorters]);

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Tiles.ColumnsProvider initialColumns={props.columns}>
        <Uu5Tiles.ControllerProvider data={data || []} filters={props.filters}
                                     sorters={props.sorters}
                                     onChangeFilters={changeFiltersAndSorters}
                                     onChangeSorters={changeFiltersAndSorters}>
          <Uu5Tiles.FilterBar/>
          <Uu5Tiles.SorterBar initialDisplayed/>
          <Uu5Tiles.InfoBar/>
          <Uu5Tiles.List
            data={dataToRender}
            tile={props.tiles}
            columns={props.columns}
          >
          </Uu5Tiles.List>
          <UU5.Bricks.Pagination
            activeIndex={shownPageIndex}
            items={new Array(Math.ceil(total / pageSize)).fill(null).map(
              (_, i) => i + 1)}
            onChange={onPaginationChange}
          />
        </Uu5Tiles.ControllerProvider>
      </Uu5Tiles.ColumnsProvider>
    );
    //@@viewOff:render
  }
});

export default FlexTiles;
