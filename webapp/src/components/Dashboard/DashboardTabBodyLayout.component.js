import React, { Component } from 'react'
import RGL, { WidthProvider } from "react-grid-layout";
import Widget from './Widgets/Widget.component'

const ReactGridLayout = WidthProvider(RGL);

export default class Layout extends Component {
  static defaultProps = {
    className: "layout",
    items: 20,
    rowHeight: 30,
    onLayoutChange: function () { },
    cols: 12,
    draggableHandle: '.handle',
  };

  constructor(props) {
    super(props);
  }

  generateDOM() {
    return this.props.dashboard.map(el => {
      return (
        <div key={el.i}>
          <div className="handle" style={{ width: "100%", height: "20px" }}></div>
          <div className="widget-body">
            <Widget i={el.i} />
          </div>
        </div>
      );
    })
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.props.dashboard}
        onLayoutChange={this.props.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}
