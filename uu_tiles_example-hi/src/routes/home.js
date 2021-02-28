//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import {createVisualComponent} from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "./config/config.js";
import FlexTiles from "../bricks/flexTiles";
import Joke from "../bricks/joke";
import Calls from "../calls";
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
          filters={[{
            key: "categoryIdList", label: {en: "Category Id"}, component:
              <UU5.Forms.Text tooltip="Insert category ids separated by a semilocon. E.g. 'id1,
id2, id3'."/>
          }]}
          sorters={[{key: "name", label: {en: "Name"}}, {
            key: "rating", label: {
              en:
                "Rating"
            }
          }]}
          columns={[
            {
              cell: ({data}) => data.data.name,
              header: {en: "Name", cs: "Název"}
            },
            {
              cell: ({data}) => data.data.text,
              header: {en: "Text", cs: "Text"}
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
