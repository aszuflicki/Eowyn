import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";


const ReactGridLayout = WidthProvider(RGL);

export class DashboardTabBody extends Component {
  // static defaultProps = {
  //   className: "layout",
  //   items: 6,
  //   rowHeight: 30,
  //   cols: 18,
  //   isAddMode: false,
  //   
  // };

  // render() {
  //   const { tabActive, layout } = this.props
  //   const layoutId = Object.keys(layout)[tabActive]
  //   const dashboard = layout[layoutId].layout
  //   console.log(dashboard)
  //   return (
  //     <div key={'DashboardMainTabBody-' + tabActive}>
  //       <ReactGridLayout
  //         layout={[{ h: 4, i: "5", w: 1, x: 0, y: 0 }]}
  //         onLayoutChange={(args) => {
  //           console.log(args)
  //           // this.props.updateLayout(args)
  //         }}
  //         {...this.props}>
  //         {dashboard.map(el => (
  //           <div key={el.i}>
  //             <div className="handle" style={{ width: "100%" }}>
  //               <span className="text" >{el.i} </span>
  //             </div>
  //             <div className="widget-body">

  //             </div>
  //           </div>
  //         ))}

  //       </ReactGridLayout>
  //     </div>
  //   )
  // }


  render() {
    return (
      <Fragment>
        <BasicLayout />
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  console.log(state.dashboard)
  return {
    ...state.dashboard,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // updateLayout: (layout, no) => dispatch(updateLayout(layout, no)),
    // updateSettings: (settings, no) => dispatch(updateSettings(settings, no)),
    // getLayout: () => dispatch(getLayout()),
    // getSettings: () => dispatch(getSettings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTabBody)




class BasicLayout extends Component {
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

    const layout = this.generateLayout();
    this.state = { layout };
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function (i) {
      return (
        <div key={i}>
          <div className="handle" style={{width: "100%", height: "30px"}}></div>
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function (item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}
// export default BasicLayout;
// class MainTabsBody extends Component {

//     render() {
//       let dashboard = this.props.dashboard[this.props.tabActive]
//       dashboard.id = this.props.tabActive;

//       return (
//         <Fragment>

//           <div
//             key={"mainTab-" + dashboard.id}>
//             <GridLayout
//               dashboard={dashboard}
//               settings={this.props.settings}
//               tabActive={this.props.tabActive}
//               updateLayout={(layout) => { this.props.updateLayout(layout) }}
//               isEditMode={this.props.isEditMode}
//               setEditWidget={(editedWidget) => this.props.setEditWidget(editedWidget)}
//               onDelete={id => this.props.onDelete(id)}
//             />
//           </div>
//         </Fragment>
//       )
//     }
//   }

//   class GridLayout extends Component {



//     generateDOM() {
//       return this.props.dashboard.layout.map(el => {
//         return (
//           <div key={el.i}>
//             <div className="handle" style={{ width: "100%" }}>
//               <span className="text" >{el.i} </span>
//             </div>
//             <div className="widget-body">
//               <Widget
//                 widget={el}
//                 type={this.props.settings[el.i].type}
//                 settings={this.props.settings[el.i].settings}
//                 isEditMode={this.props.isEditMode}
//                 layout={this.props.layout}
//                 // updateLayout={this.props.updateLayout}
//                 // getLayout={this.props.getLayout}
//                 updateState={(editedWidget, isEditModeModal) => {
//                   editedWidget.id = el.i
//                   this.props.setEditWidget(editedWidget)
//                 }}
//                 onDelete={() => this.props.onDelete(el.i)}

//               />
//             </div>
//           </div>
//         );
//       });
//     }