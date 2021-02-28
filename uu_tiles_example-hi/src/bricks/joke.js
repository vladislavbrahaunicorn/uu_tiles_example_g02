//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Joke",
  //@@viewOff:statics
};

export const Joke = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);

    const { onUpdate, onDelete, data, processingItem = {} } = props;
    return (
      <UU5.BlockLayout.Tile {...attrs} colorSchema={processingItem.errorData ? "danger" : undefined}>
        <UU5.BlockLayout.Block
        >
          <UU5.BlockLayout.Row weight="primary" ellipses>
            {data.name}
          </UU5.BlockLayout.Row>
          <UU5.BlockLayout.Row>
            {data.text}
          </UU5.BlockLayout.Row>
        </UU5.BlockLayout.Block>
      </UU5.BlockLayout.Tile>)
    //@@viewOff:render
  },
});

export default Joke;
