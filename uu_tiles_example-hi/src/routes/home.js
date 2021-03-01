//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import {createVisualComponent} from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "./config/config.js";
import FlexTiles from "../bricks/flexTiles";
import Joke from "../bricks/joke";
import Calls from "../calls";
import Uu5Tiles from "uu5tilesg02";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  welcomeRow: () => Config.Css.css`
    padding: 56px 0 20px;
    max-width: 624px;
    margin: 0 auto;
    text-align: center;

    ${UU5.Utils.ScreenSize.getMinMediaQueries("s", `text-align: left;`)}

    .uu5-bricks-header {
      margin-top: 8px;
    }

    .plus4u5-bricks-user-photo {
      margin: 0 auto;
    }
  `,
};
const WithColumnsContextButton = createVisualComponent({
  render() {
    const {openColumnsManager} = Uu5Tiles.useColumns();
    return <UU5.Bricks.Button onClick={openColumnsManager}><UU5.Bricks.Icon
      icon="mdi-format-columns"/></UU5.Bricks.Button>;
  }
});

export const Home = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <FlexTiles
          bulk={[
              "showSelection",
              {
                content: {
                  en: "Scratch",
                  cs: "Podrbat"
                },
                onClick: (data) => console.log("Scratch", data),
                active: true
              },
              {
                content: {
                  en: "Feed",
                  cs: "Nakrmit"
                },
                onClick: (data) => console.log("Feed", data),
                active: true
              },
              "resetSelection"
            ]
          }
          filters={[{
            key: "categoryIdList", label: {en: "Category Id"},
            component:
              <UU5.Forms.Text/>
          }]}
          sorters={[{key: "name", label: {en: "Name"}}, {
            key: "rating", label: {
              en:
                "Rating"
            }
          }]}
          columns={[
            {
              key: "selected",
              cell: (data) => {
                console.log(data);
                return <UU5.Forms.Checkbox inputWidth="30px" value={data.selected} onChange={data.toggleSelected} />
              },
              alwaysVisible: true,
              label:{en: "Selected", cs: "Vyber"},
            },
            {
              key: "name",
              cell: ({data}) => data.data.name,
              header: {en: "Name", cs: "Název"},
              label: {en: "Name", cs: "Název"},
              sorterKey: "name"
              // alwaysVisible: true,
              // visible: false,
              // fixed: "left"
            },
            {
              key: "text",
              cell: ({data}) => data.data.text,
              header: {en: "Text", cs: "Text"},
              label: {en: "Text", cs: "Text"}
            },
            {
              key: "controls",
              cell: () => null,
              header: <WithColumnsContextButton/>,
              label: {en: "Controls", cs: "Ovládací prvky"},
              width: 32,
              fixed: "right"
            }
          ]}
          tiles={Joke}
          load={Calls.load}
          reload={10000}
        />
      </div>
    );
    //@@viewOff:render
  }
});

export default Home;
